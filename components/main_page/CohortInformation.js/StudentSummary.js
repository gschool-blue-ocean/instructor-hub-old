import studentStyle from "../../../styles/StudentSummary.module.css";
import commentStyle from "../../../styles/CommentModal.module.css";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import GitHubModal from "./GitHubModal";
import CommentModal from "./CommentModal";
import GraphModal from "./GraphModal";
import { studentsState, currentStudentState ,studentIdState, cohortsState, currentCohortState, checkedPeopleState, usersState } from "../../state";
import axios from "axios";
import Link from 'next/link'

const StudentSummary = () => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showCommentModal, setShowCommenttModal] = useState(false);
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [noteStudent, setNoteStudent] = useState(" ");
  const [studentGraph, setStudentGraph] = useState(" ");
  const [order, setOrder] = useState("ASC");
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [selectedPeople, setSelectPeople] = useRecoilState(checkedPeopleState);
  const [user, setUser] = useRecoilState(usersState);

  // Allows the cohorts to be filter 
  let course = students.filter(classRoom => classRoom.cohort == currentCohort) 

  // Determines Progress row words
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

  //Converts teamWork_avg and Tech_avg to percentage
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

  //Handles the Select All checkbox.
  const handleChange = (e) => {
    const { id , checked } = e.target;
    if (id === "allSelect") {
      let tempStudent = course.map((student) => {
        return { ...student, isChecked: checked };
      });
      setStudents(tempStudent);
      setSelectPeople(tempStudent)
    } else {
      let tempStudent = course.map((student) => 
      student.student_id == id ? { ...student, isChecked: checked } : student 
    );
      setStudents(tempStudent);
      setSelectPeople(tempStudent)
    }
  }

  //Works in conjunction with the handleChange function. Needed to track who is selected and who is not
  useEffect(() => {
      let selectedStudents = selectedPeople.filter(unChecked => unChecked.isChecked == true)
      console.log(selectedPeople)
      console.log(selectedStudents)
  }, [selectedPeople])

  //Used for sorting from ASC to DSC
  const sorting= (name) => {
      if(order === "ASC") {
        const sorted = [...course].sort((a,b) =>
          a[name] > b[name]? 1 : -1
      );
      console.log(name, "name")
      console.log(sorted)
      setStudents(sorted);
      setOrder("DSC")
    }
    if(order === "DSC") {
      const sorted = [...course].sort((a,b) =>
        a[name] < b[name] ? 1 : -1
      );
      setStudents(sorted);
      setOrder("ASC")
    }
  }
  
  const handleDeleteClick = (studentId, studentGid) => {
    const newStudent = [...students] //Create New Array based on current students
    console.log(studentGid)
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

  
    const openGitHubModal = () => {
      setShowGitHubModal((prev) => !prev);
    };
  
    const openCommentModel = (student) => {
      setShowCommenttModal((prev) => !prev);
      setNoteStudent(student)
    };

    const openGraphModel = (student) => {
      setShowGraphModal((prev) => !prev);
      setStudentGraph(student)
    }
  
    useEffect(() => {
      setStudents(students);
    }, []);
  
  
  return (
    <div>
      <GitHubModal showGitHubModal={showGitHubModal} setShowGitHubModal={setShowGitHubModal} onClose={() => {setShowGitHubModal(false);}}/>
      <CommentModal showCommentModal={showCommentModal} setShowCommenttModal={setShowCommenttModal} onClose={() => {setShowCommenttModal(false)}} noteStudent = {noteStudent}/>
      <GraphModal showGraphModal={showGraphModal} setShowGraphModal={setShowGraphModal} onClose={() => {setShowGraphModal(false)}} studentGraph = {studentGraph}/>
      <div className={studentStyle.container}>
        <div className={studentStyle.topBorder}>
          <div className={studentStyle.selectRow}>
            <div className={studentStyle.selectAllBox}>
              <input className={studentStyle.checkBox} type="checkbox" id="allSelect" checked={!students.some((student) => student?.isChecked !== true)} onChange={handleChange}/>
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
            <table className= {studentStyle.table}>
              <thead className= {studentStyle.thead}>
                <tr className= {studentStyle.headerRow}>
                  <th className= {studentStyle.smallHeader}></th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("name")}>Name</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("learn_avg")}>Learn Avg</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("client_side_test")}>Client-Side</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("server_side_test")}>Server-Side</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("teamwork_avg")}>Teamwork Avg</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("tech_avg")}>Tech Avg</th>
                  <th className= {studentStyle.header} scope="col" onClick={() => sorting("average")}>Progess</th>
                  <th className= {studentStyle.header} scope="col">Notes</th>
                  <th className= {studentStyle.smallHeader} scope="col"></th>
                </tr>
              </thead>
              <tbody className= {studentStyle.tbody}>
              {/* Iterate through the students data, ties in with the variable course */}
              {course.map((student) => (
                <tr className= {studentStyle.tbodyRow} id={student.student_id} key={student.student_id}>
                  <td className= {studentStyle.smallContent}>
                    <input type="checkbox" id = {student.student_id} checked={student?.isChecked || false} onChange={handleChange} ></input>
                  </td>
                  <td  className= {studentStyle.nameContent}  onClick={() => setStudentId(student.student_id)}>
                    <Link className= {studentStyle.nameSpace} key={student.student_id} href={`/student/${student.student_id}`}>{student.name}</Link>
                  </td>
                  <td className= {studentStyle.content}>{student.learn_avg}%</td>
                  <td className= {studentStyle.content}>{student.client_side_test}</td>
                  <td className= {studentStyle.content}>{student.server_side_test}</td>
                  <td className= {studentStyle.content}>{colPercent(student.teamwork_avg)}</td>
                  <td className= {studentStyle.content}>{colPercent(student.tech_avg)}</td>
                  <td className= {studentStyle.content} onClick={() => openGraphModel(student)}>
                    <div>{progress(Math.ceil((student.teamwork_avg + student.tech_avg)/2))}</div>
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
                  <td className= {studentStyle.smallContent}>
                    <svg className={studentStyle.trash} viewBox="0 0 12 12" onClick={()=> handleDeleteClick(student.student_id, student.gid)}>
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
