import style from '../../../styles/StudentPModal.module.css'
import {learnState,usersState, currentlearnAndLearnGradesState,studentIdState, currentStudentState} from "../../state";
import { useRecoilState } from "recoil";
import { useState, useLayoutEffect } from "react";
import axios from 'axios';

const AssessModal = ({showAssessModal, onClose }) => {

  const [learn, setLearn] = useRecoilState(learnState);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [currentLearnAndLearnGrades, setCurrentLearnAndLearnGrades] = useRecoilState(currentlearnAndLearnGradesState);
  const [score, setScore] = useState(''); 
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [assessId, setAssessId] = useState(''); 
  const [users, setUsers] = useRecoilState(usersState);

  
  let asanaToken = sessionStorage.getItem('user asana access token')
 

  const selectedOption = (e) => {
    setAssessId(e.target.value)
    // console.log(e.target.value, 'value')
  }
  /*----------Converting String into Number----------*/
  let assessmentId = Number(assessId)
  let assessScore = Number(score)

  /*------------- On Submit------------*/
  const addAssesment = () => {
    // on submit it will do a post request to our local databse 
    console.log(asanaToken)
    axios.post("/api/learnGrades", {
        student_id: studentId,
        assessment_id: assessmentId,
        assessment_grade: assessScore,
      })
      // then it will do a get request to update the new added learn grade 
      .then(() => {
        axios.get(`/api/learnAndLearnGradesId/${studentId}`).then((res) => {
          setCurrentLearnAndLearnGrades(res.data)
        })
      })
      // Then it will add it to ASANA 
      .then(() => {
        // we have to get the current notes on ASANa first so you can paste it so you dont loose your inf when you do a post request to Asana
        let instructorNotes = ""
        axios.get(`https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, {
            headers: {
              Authorization: `Bearer ${asanaToken}`,
            },
          })
          .then((res) => {
            console.log(res.data.data)
            instructorNotes = res.data.data.notes
          })
          // Once you gotten your previews notes in Asana it checks the if there was previews note is empty or not to add <u> tag as the title 
          .then(() => {
            instructorNotes.length === 0 ? (instructorNotes = "<u>Test Name: Test Score</u>") : null
            // Once it checks it then it will do a put request to Asana 
            axios({
              method: "PUT", //must be put method not patch
              url: `https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this LOCAL DB NEEDED
              headers: {
                Authorization: `Bearer ${asanaToken} `, //need template literal for ALLLLL headers so global state dependant on user
              },
              data: {
                data: {
                  workspace: "1213745087037",
                  assignee_section: null,
                  // in the body we are passing the first get request from asana to display the prev notes and then add the new note we wanted and not loose the prev notes in Asana 
                  html_notes: `<body>${instructorNotes}\n ${"Name".toUpperCase()} : ${assessScore}</body>`, //need conditional or neeed to make this field mandatory
                  parent: null,
                  resource_subtype: "default_task",
                  // "custom_fields": {
                  //   [techSkillGid]: `${cohort.studentInfo.Tech}`,  //template literal - done
                  //   [teamWorkGid]: `${cohort.studentInfo.Team}`   //template literal - done
                  // }
                },
              },
            })
          })
      })
  }


  return (
    <>
    { showAssessModal ?
      <div>
        <div className={style.background} onClick={onClose}></div>
        <div className={style.container}>
          <div>
            <div onClick={onClose} className={style.close}></div>
          </div>
          <div className={style.body}>
            <div className={style.content}>
              <div className={style.border}>
                <div className={style.border2}>
                  {/* <div>Assesment</div>  */}
                  <div className={style.selectAssess}>
                    <label>Assesment</label>
                    <select id='select' type='select' onChange={(e) => selectedOption(e)} >
                      <option>Select</option>
                      { learn.map(assess => (
                          <option key={assess.assessment_id} value={assess.assessment_id}>{assess.assessment_name}</option>
                      ))
                      }
                    </select>
                    {/* <input onChange={(e) => selectedOption(e)}  /> */}
                  </div>
                  <div className={style.selectScore}>
                    <label>SCORE</label>
                   <input onChange={(e) => setScore(e.target.value)} type='number' />
                  </div>
                  <div>
                    <button onClick={addAssesment}>submiit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>   
      </div>
      : null
    }
    </>
  )
}

export default AssessModal
