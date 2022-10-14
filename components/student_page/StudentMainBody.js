import styles from "../../styles/StudentMainBody.module.css";
import StudentStatus from "../student_page/student_stats/StudentStatus.js";
import NavBar from "../main_page/NavBar.js";
import { loggedIn } from '../state'
import { currentStudentState,notesState,studentIdState} from "../state";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useState } from "react";

const StudentMainBody = () => {
  // current student is the current information for one person 
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [notes, setNotes] = useRecoilState(notesState);
  const [currNotes, setCurrNotes] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [noteId, setNoteId] = useState(null)
  const [updatedNotes, setUpdatedNOtes] = useState(''); 
  const [loggedInStatus, setLoggedInStatus] = useRecoilState(loggedIn)
  const [addNote, setAddNote] = useState(false); 
  const [newNote, setNewNote] = useState(''); 


  let userNotes = notes.filter(note => note.student_id == studentId); 
  // converting ETs date into MM DAY YYYY
  let date = new Date(currentStudent.ets_date); 
  let etsDate = date.toDateString()

  const editNote = (e) => {
    setNoteId(e.target.id)
    setIsEditing(true);
  }

 
  const addUpdate = (note) => {
    setIsEditing(false)
    axios.patch(`/api/notes/${note.note_id}`,
    {"notes": `${updatedNotes}`, 
    "name": `${note.name}`
  }
    ).then((res) => {
    
    console.log(res.data)

    const indexOfNotes = notes.findIndex((note) => note.note_id === res.data.note_id);
    const updateNotes = [...notes];
    updateNotes[indexOfNotes] = res.data;
    setNotes(updateNotes);  
  
    })}
  
  const addNewNote = () => {
    axios.post('/api/notes', {
      "student_id": Number(studentId),
      "notes": newNote, 
      "name": null, 
      "note_date": new Date()
    }).then((res) => console.log(res.data) ).then (() => {
      axios.get("/api/notes").then((res) => {
          setNotes(res.data);
          console.log(notes, 'notes');
        })
    }
    )

  }

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <img
            className={styles.picture}
            alt="student pic"
            src="/pic1.jpg"
            width={80}
            height={80}
          />
          <div className={styles.title}>
            <div
              className={styles.studentName}
            >{currentStudent.name}</div>
            <div className={styles.gitTransCon}>
              <p className={styles.etsDate}>{`ETS DATE: ${etsDate} `}</p>
              <p className={styles.gitHub}>{`GitHub Username: ${currentStudent.github}`}</p>
            </div>
          </div>
        </div>
        <StudentStatus currentStudent={currentStudent}/>
        <div className={styles.notesContainer}>
          <div className={styles.notes}>
            <div className={styles.notesTitle}>
              Notes
            <span  onClick={() => setAddNote(!addNote)}>&#10133;</span>
            </div>
            <div>
              {
                addNote ? (
                  <>
                  <textarea onChange={(e) => setNewNote(e.target.value)}/>
                  <button onClick={addNewNote}>&#10004;</button>
                  <button onClick={() => setAddNote(false)}>X</button>
                  </>
                ): null
              }

              <ul>
                {userNotes.map((note) => (
                  <div key={note.note_id}>
                    {
                      isEditing && note.note_id == noteId ? 
                      <>
                       <textarea className={styles.editNote} type="text" defaultValue={note.notes} onChange={(e) => setUpdatedNOtes(e.target.value)} />
                        <button onClick={() => addUpdate(note) } >&#10004;</button>
                        <button onClick={() => setIsEditing(false)}>X</button>
                      </> 
                    :
                      <li id={note.note_id}
                       onDoubleClick={(e) => editNote(e)}>
                       {note.notes}
                      </li>
                    }
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentMainBody;
