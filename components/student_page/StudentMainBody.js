import styles from "../../styles/StudentMainBody.module.css";
import StudentStatus from "../student_page/student_stats/StudentStatus.js";
import NavBar from "../main_page/NavBar.js";
import { currentStudentState,notesState,studentIdState} from "../state";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentMainBody = () => {
  // current student is the current information for one person 
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [notes, setNotes] = useRecoilState(notesState);
  const [currNotes, setCurrNotes] = useState([]); 

  let userNotes = notes.filter(note => note.student_id == studentId); 
  console.log(userNotes, 'here'); 


  // converting ETs date into MM DAY YYYY
  let date = new Date(currentStudent.ets_date); 
  let etsDate = date.toDateString()


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
            >{`${currentStudent.name_first} ${currentStudent.name_last}`}</div>
            <div className={styles.gitTransCon}>
              <p className={styles.etsDate}>{`ETS DATE: ${etsDate} `}</p>
              <p className={styles.gitHub}>{`GitHub Username: ${currentStudent.github}`}</p>
            </div>
          </div>
        </div>
        <StudentStatus />
        <div className={styles.notesContainer}>
          <div className={styles.notes}>
            <div className={styles.notesTitle}>Notes</div>
            <div>
              <ul>
                {userNotes.map((note) => (
                  <li key={note.student_id}>{note.instructor_notes}</li>
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
