import studentStyle from "../../../styles/StudentSummary.module.css";
import commentStyle from "../../../styles/CommentModal.module.css";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import GitHubModal from "./GitHubModal";
import CommentModal from "./CommentModal";
import { studentsState, notesState,studentIdState, cohortsState, currentCohortState, checkedPeopleState } from "../../state";
import axios from "axios";
import Link from 'next/link'

const StudentSummary = () => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showCommentModal, setShowCommenttModal] = useState(false);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [notes, setNotes] = useRecoilState(notesState);
  const [noteStudent, setNoteStudent] = useState(" ")
  const [order, setOrder] = useState("ASC")
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [checkPeople, setCheckPeople] = useRecoilState(checkedPeopleState);
  
  // Allows the cohorts to be filter 
  let course = students.filter(classRoom => classRoom.cohort == currentCohort) 
  // console.log(course)

console.log(studentId)

let colPercent = (num) => {
  if (num === 1) {
    return "25%"
  }
  if (num === 2) {
    return "50%";
  }
  if (num === 3) {
    return "75%";
  }
  if (num === 4) {
    return "100%"
  }
 }

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempStudent = course.map((student) => {
        return { ...student, isChecked: checked };
      });
      setStudents(tempStudent);
      setCheckPeople(tempStudent)
      console.log(checkPeople)
    } else {
      let tempStudent = course.map((student) => 
      student.name === name ? { ...student, isChecked: checked } : student 
      );
      setStudents(tempStudent);
    }
  }

  const sorting= (col) => {
    console.log(col)
    if(order === "ASC") {
      const sorted = [...students].sort((a,b) =>
        a[col] < b[col] ? 1 : -1
      );
      setStudents(sorted);
      setOrder("ASC")
    }
    if(order === "DSC") {
      const sorted = [...students].sort((a,b) =>
        a[col] < b[col] ? 1 : -1
      );
      setStudents(sorted);
      setOrder("DSC")
    }
  }

  const openGitHubModal = () => {
    setShowGitHubModal((prev) => !prev);
  };

  const openCommentModel = (student) => {
    setShowCommenttModal((prev) => !prev);
    setNoteStudent(student)
  };

  useEffect(() => {
    setStudents(students);
  }, []);

  const handleDeleteClick = (studentId) => {
    const newStudent = [...students] //Create New Array based on current students
    console.log(studentId)
    const index = students.findIndex((student) => student.student_id === studentId)
    newStudent.splice(index, 1);
    axios.delete(`/api/students/${studentId}`).then(() => {
      setStudents(newStudent)
    });
  }


  return (
    <div>
      <GitHubModal showGitHubModal={showGitHubModal} setShowGitHubModal={setShowGitHubModal} onClose={() => {setShowGitHubModal(false);}}/>
      <CommentModal showCommentModal={showCommentModal} setShowCommenttModal={setShowCommenttModal} onClose={() => {setShowCommenttModal(false)}} noteStudent = {noteStudent}/>
      <div className={studentStyle.container}>
        <div className={studentStyle.topBorder}>
          <div className={studentStyle.selectRow}>
            <div className={studentStyle.selectAllBox}>
              <input className={studentStyle.checkBox} type="checkbox" name="allSelect" checked={!students.some((student) => student?.isChecked !== true)} onChange={handleChange}/>
              <label htmlFor="selectMe"> Select/Deselect All</label>
            </div>
            <div className={studentStyle.addGit}>
              <a className={studentStyle.gitBtn}>
                <span onClick={openGitHubModal} className={` ${studentStyle.gitBtn_medium} ${studentStyle.span}`}>Github Accounts</span>
              </a>
            </div>
          </div>
        </div>
        <div className={studentStyle.middleBorder}>
          <div>
            <table className= {studentStyle.table} border = "1">
              <thead className= {studentStyle.thead}>
                <tr className= {studentStyle.headerRow}>
                  <th className= {studentStyle.smallHeader}></th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("Name")}>Name</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("learn_Avg")}>Learn Avg</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("teamwork_avg")}>Teamwork Avg</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("tech_avg")}>Tech Avg</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("Client-Side")}>Client-Side</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("Server-Side")}>Server-Side</th>
                  {/* <th className= {studentStyle.header} scope="col" onClick={() => sorting("Tech_Skills")}>Tech Skills</th> */}
                  <th className= {studentStyle.header} scope="col">Notes</th>
                  <th className= {studentStyle.smallHeader} scope="col"></th>
                </tr>
              </thead>
              <tbody className= {studentStyle.tbody}>
              {/* Iterate through the students data, ties in with the variable course */}
              {course.map((student) => (
                <tr className= {studentStyle.tbodyRow} id= {student.student_id} key={student.student_id}>
                  <td className= {studentStyle.smallContent}>
                    <input type="checkbox" name={student.name} checked={student?.isChecked || false} onChange={handleChange} ></input>
                  </td>
                  <td  className= {studentStyle.nameContent}>
                    <Link className= {studentStyle.nameSpace} key={student.student_id} as={`/student/${student.student_id}`} href={`/student/[${student.student_id}]`}>{student.name}</Link>
                  </td>
                  <td className= {studentStyle.content}>{student.learn_avg}%</td>
                  <td className= {studentStyle.content}>{colPercent(student.teamwork_avg)}</td>
                  <td className= {studentStyle.content}>{colPercent(student.tech_avg)}</td>
                  <td className= {studentStyle.content}>{student.client_side_test}</td>
                  <td className= {studentStyle.content}>{student.server_side_test}</td>
                  {/* <td className= {studentStyle.content}>{student.teamwork}</td> */}
                  {/* <td className= {studentStyle.content}>
                    <div className={studentStyle.color3}>At Risk</div>
                  </td> */}
                  <td className= {studentStyle.content} onClick={() => openCommentModel(student)}>
                    <svg className={studentStyle.noteIcon} viewBox="0 0 22 22">
                      <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271
                       19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,
                       21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763
                      13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 
                      L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 
                      17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 
                      L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 
                      17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 
                      17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 
                      13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 
                      C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 
                      C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>
                    </svg>
                  </td>
                  <td className= {studentStyle.smallContent}>
                    <svg className={studentStyle.trash} viewBox="0 0 12 12" onClick={()=> handleDeleteClick(student.student_id)}>
                      <path d="M6.5 17q-.625 0-1.062-.438Q5 16.125 5 15.5v-10H4V4h4V3h4v1h4v1.5h-1v10q0 .625-.438 1.062Q14.125 17 13.5 17Zm7-11.5h-7v10h7ZM8 14h1.5V7H8Zm2.5 0H12V7h-1.5Zm-4-8.5v10Z"></path>
                    </svg>{" "}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSummary;
