import studentStyle from "../../../styles/StudentSummary.module.css";
import commentStyle from "../../../styles/CommentModal.module.css";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import GitHubModal from "./GitHubModal";
import CommentModal from "./CommentModal";
import GraphModal from "./GraphModal";
import { studentsState, currentStudentState ,studentIdState, cohortsState, currentCohortState, selectedStudentsState, usersState, currentCourseState } from "../../state";
import axios from "axios";
import Link from 'next/link'
import GroupMaker from "./GroupMaker";


const StudentSummary = () => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showCommentModal, setShowCommenttModal] = useState(false);
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [studentNote, setStudentNote] = useState(" ");
  const [studentGraph, setStudentGraph] = useState(" ");
  const [order, setOrder] = useState("ASC");
  const [currentCourse, setCurrentCourse] = useRecoilState(currentCourseState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [selectedStudents, setSelectStudents] = useRecoilState(selectedStudentsState);
  const [user, setUser] = useRecoilState(usersState);

  // Allows the studentsState to be filter based on current cohort selected on table
  useEffect(() => {
    if(students) {
      setCurrentCourse(students.filter(studentCohort => studentCohort.cohort == currentCohort))
    }
    setSelectStudents([])
  }, [currentCohort, students])

  // [Delete] Resets the studentState after one is deleted
  useEffect(() => {
    setStudents(students);
  }, []);

 
  console.log(selectedStudents)
  // [Progress Conversion] Determines Progress row words
  let progress = (num) => {
    if (num === 1) {
      return (
        <div className={studentStyle.color}>At Risk</div>
      )
    }
    if (num === 2) {
      return (
        <div className={studentStyle.color3}>Below Avg</div>
      )
    }
    if (num === 3) {
      return (
        <div className={studentStyle.color2}>Average</div>
      )
    }
    if (num === 4) {
      return (
        <div className={studentStyle.color4}>Above Avg</div>
      )
    }
  }

  //[Percent Conversion] Converts teamWork_avg and Tech_avg to percentage
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

  //[CheckBoxs] Allows the individual checkboxs to work based on the userId
  const handleSelectedStudents =(event) => {
      const userId = Number(event.target.value); //store the value received by event.target in a varable. Number is needed to change the id recieved into a string
      if(!selectedStudents.includes(userId)) { //Check if selectedStudents includes the Id
        setSelectStudents([...selectedStudents, userId]) // if it doesn't, use usestate, passing it an array whose first value is the spread of the existing selectedStudents, and a second value we want to add with userId
      } else {
        setSelectStudents(selectedStudents.filter((selectedUserId) => { // we use the filter method to exclude the Checked UserId
          return selectedUserId !== userId; //Only true if the userId does not match the selectedUserId
        })
        )
      }
    }
    
  const handleSelectAllStudents = () => {
    if(selectedStudents.length < currentCourse.length) { // if selectedStudents is less than currentCourse(array for the cohort students)
      setSelectStudents(currentCourse.map((student) => student.student_id)) // setSelectStudents equal to a new array by mapping over our currentCourse array, pulling the student_id for each student
        // console.log(selectedStudents, "line 106 SelectAll")
    } else {
      setSelectStudents([]) //set an empty array to signify no users are currently selected
    }
  }

  //[Sort] Used for sorting from ASC to DSC for name/progress/Client-side/Server-side.
  const wordSorting= (name) => {
      if(order === "ASC") {
        const sorted = [...currentCourse].sort((a,b) =>
          a[name].toUpperCase() > b[name].toUpperCase() ? 1 : -1
      );
      setCurrentCourse(sorted);
      setOrder("DSC")
    }
    if(order === "DSC") {
      const sorted = [...currentCourse].sort((a,b) =>
        a[name].toUpperCase() < b[name].toUpperCase() ? 1 : -1
      );
      setCurrentCourse(sorted);
      setOrder("ASC")
    }
  }

  //Same function as above but used for values
  const sorting= (name) => {
    if(order === "ASC") {
      const sorted = [...currentCourse].sort((a,b) =>
        a[name] > b[name] ? 1 : -1
    );
    setCurrentCourse(sorted);
    setOrder("DSC")
  }
  if(order === "DSC") {
    const sorted = [...currentCourse].sort((a,b) =>
      a[name] < b[name] ? 1 : -1
    );
    setCurrentCourse(sorted);
    setOrder("ASC")
  }
}

  
  //[Delete Request] Axios delete request. Removes from the database and Asana
  const handleDeleteClick = (studentId, studentGid) => {
    const newStudent = [...students] //Create New Array based on current students
    const index = students.findIndex((student) => student.student_id === studentId)
    newStudent.splice(index, 1);
    axios.delete(`/api/students/${studentId}`).then(() => {
      setStudents(newStudent)
    });

    axios({
      method:"DELETE", 
      url: `https://app.asana.com/api/1.0/tasks/${studentGid}`, 
      headers: {
        Authorization: `Bearer ${user.asana_access_token}`, 
      }, 
    })
  }
 
  //[Modals] Allows the modals to be opened
  const openGitHubModal = () => {
    setShowGitHubModal((prev) => !prev);
  };
  
  const openCommentModel = (student) => {
    setShowCommenttModal((prev) => !prev);
    setStudentNote(student)
  };

  const openGraphModel = (student) => {
    setShowGraphModal((prev) => !prev);
    setStudentGraph(student)
  }
  
  return (
    <div>
      <GitHubModal showGitHubModal={showGitHubModal} setShowGitHubModal={setShowGitHubModal} onClose={() => {setShowGitHubModal(false);}}/>
      <CommentModal showCommentModal={showCommentModal} setShowCommenttModal={setShowCommenttModal} onClose={() => {setShowCommenttModal(false)}} studentNote = {studentNote}/>
      <GraphModal showGraphModal={showGraphModal} setShowGraphModal={setShowGraphModal} onClose={() => {setShowGraphModal(false)}} studentGraph = {studentGraph}/>
      <div className={studentStyle.container}>
        <div className={studentStyle.topBorder}>
          <div className={studentStyle.selectRow}>
            <div className={studentStyle.selectAllBox}>
              <input className={studentStyle.checkBox} type="checkbox" id="allSelect" checked={selectedStudents.length === currentCourse.length} onChange={handleSelectAllStudents}/>
              <label htmlFor="selectMe"> Select/Deselect All</label>
            </div>
            <GroupMaker />
            <div className={studentStyle.addGit}>
              <a className={studentStyle.gitBtn}>
                <span onClick={openGitHubModal} className={` ${studentStyle.gitBtn_medium} ${studentStyle.span}`}>Github Accounts</span>
              </a>
            </div>
          </div>
        </div>
        <div className={studentStyle.middleBorder}>
          <div>
            <table className= {studentStyle.table}>
              <thead className= {studentStyle.thead}>
                <tr className= {studentStyle.headerRow}>
                  <th className= {studentStyle.smallHeader}></th>
                  <th className= {studentStyle.nameColumn} scope="col" onClick={() => wordSorting("name")}>Name</th>
                  <th className= {studentStyle.learnColumn} scope="col" onClick={() => sorting("learn_avg")}>Learn Avg</th>
                  <th className= {studentStyle.clientColumn} scope="col" onClick={() => wordSorting("client_side_test")}>Client-Side</th>
                  <th className= {studentStyle.serverColumn} scope="col" onClick={() => wordSorting("server_side_test")}>Server-Side</th>
                  <th className= {studentStyle.teamColumn} scope="col" onClick={() => sorting("teamwork_avg")}>Team Avg</th>
                  <th className= {studentStyle.techColumn} scope="col" onClick={() => sorting("tech_avg")}>Tech Avg</th>
                  <th className= {studentStyle.progressColumn} scope="col" onClick={() => sorting("progress")}>Progess</th>
                  <th className= {studentStyle.noteColumn} scope="col">Notes</th>
                  <th className= {studentStyle.smallHeader} scope="col"></th>
                </tr>
              </thead>
              <tbody className= {studentStyle.tbody}>
              {/* Iterate through the students data, ties in with the variable course */}
              {currentCourse.map((student) => (
                <tr className= {studentStyle.tbodyRow} id={student.student_id} key={student.student_id}>
                  <td className= {studentStyle.smallContent}>
                    <input type="checkbox" value = {student.student_id} checked={selectedStudents.includes(student.student_id)} onChange={handleSelectedStudents}></input>
                  </td>
                  <td  className= {studentStyle.nameContent}  onClick={() => setStudentId(student.student_id)}>
                    <Link className= {studentStyle.nameSpace} href={`/student/${student.student_id}`}>{student.name}</Link>
                  </td>
                  <td className= {studentStyle.content}>{student.learn_avg}%</td>
                  <td className= {studentStyle.content}>{student.client_side_test}</td>
                  <td className= {studentStyle.content}>{student.server_side_test}</td>
                  <td className= {studentStyle.content}>{colPercent(student.teamwork_avg)}</td>
                  <td className= {studentStyle.content}>{colPercent(student.tech_avg)}</td>
                  <td className= {studentStyle.content} onClick={() => openGraphModel(student)}>{progress(Math.ceil((student.teamwork_avg + student.tech_avg)/2))}
                    {/* <div>{progress(Math.ceil((student.teamwork_avg + student.tech_avg)/2))}</div> */}
                  </td>
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
                  <td className= {studentStyle.trashContent}>
                    <svg className={studentStyle.trash} viewBox="0 0 12 12" onClick={()=> handleDeleteClick(student.student_id, student.gid)}>
                      <path d="M6.5 17q-.625 0-1.062-.438Q5 16.125 5 15.5v-10H4V4h4V3h4v1h4v1.5h-1v10q0 .625-.438 1.062Q14.125 17 13.5 17Zm7-11.5h-7v10h7ZM8 14h1.5V7H8Zm2.5 0H12V7h-1.5Zm-4-8.5v10Z"></path>
                    </svg>
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
