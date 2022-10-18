import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
        usersState,
        studentsState,
        currentCohortState,
        learnState,
        currentStudentState,
        currentlearnAndLearnGradesState,
        projectsState,
        learnGradesState,
      } from "../../state";
import styles from "../../../styles/UpdateModal.module.css";
import axios from 'axios'
import style from '../../../styles/UpdateAssessments.module.css'

const UpdateAssessmentsModal = ({ showUpdateAssessmentModal, setShowUpdateAssessmentModal, onClose }) => {
  // What student is being updated at this moment
  const [currStudent, setCurrStudent] = useState(0);
  // This is derived state -- updated at same time as currStudent, one derives the other
  const [indexedStudent, setIndexedStudent] = useState({});
  const [modal, setModal] = useState(false);
  // This is a rough draft idea, probably obscelesced by simply POSTing each student to Asana
  const [stagedCohort, setStagedCohort] = useState([]);
  // Merely to identify who is making the update, and possibly selecting the students of the user's default cohort
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [user, setUser] = useRecoilState(usersState);
  // Unless this is replaced by some "selected students" state, or "current cohort" state, this determines how the updater iterates
  // (by going through the students)
  const [students, setStudents] = useRecoilState(studentsState);
  // This lets us use a ref hook to grab the first Select input and refocus it on form submission
  const firstInput = useRef(null);

  
  const [projects, setProjects] = useRecoilState(projectsState);
  const [currentLearnAndLearnGrades, setCurrentLearnAndLearnGrades] = useRecoilState(currentlearnAndLearnGradesState)
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [users, setUsers] = useRecoilState(usersState);
  const [newAssessName, setNewAssessName] = useState(''); 
  const [score, setScore] = useState(''); 
  const [projNotes, setAssessNotes] = useState(''); 
  const [assessId, setAssessId] = useState(''); 
  const [learn, setLearn] = useRecoilState(learnState);
  const [addAssessName, setAddAssessName] = useState(false);
  const [learnGrades, setLearnGrades] = useRecoilState(learnGradesState)

  // How to use this in relation to a stupid modal?
  // Try to cut out the middleman -- only need currStudent or indexedStudent, not both
  useEffect(() => {
    if (course[currStudent]) {
        setIndexedStudent(course[currStudent]);
        console.log(currStudent)
    }
  }, [currStudent, currentCohort]); 
  
  // Filters students to be updated by matching their cohort value to currentCohort's name
  let course = students.filter((classRoom) => classRoom.cohort === currentCohort);

  // To reset the indexer value if modal is closed early
  onClose = () => {
    setCurrStudent(0);
    setShowUpdateAssessmentModal(false);
  };
  // this grade is set in the input element
//   let grade = score
//     let assessmentId = Number(projSelected)
    let assessmentId = Number(assessId)
    let assessScore = Number(score)
 // post assessment_name to request to learn table
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post("/api/learn", {
          "assessment_name": newAssessName, 
        }).then((res) => {
          setAssessId((prev) =>  res.data.assessment_id)
          const newLearn = [...learn, res.data]
            setLearn(newLearn);
            setCurrStudent(prev => { return prev + 1 })
            console.log('learnGrades:', learnGrades)
            console.log('learn;', learn)
        })
      }

  // enterListener only necessary because the Notes input is a textarea, and "Enter" is used by default for newline
  const submitHandler = async (e) => {
    e.preventDefault();   
    // post request to local database
    try {
      await axios.post('/api/learnGrades', {
        "student_id": indexedStudent.student_id,
        "assessment_id": assessmentId,
        "assessment_grade": assessScore,
        // "notes": `${projNotes}`
      }).then((res) => setCurrStudentAssessment((prev)=> [...prev, ...res.data]))
    } catch(error) {     
      alert(`This project has already been added for ${indexedStudent.name}`) 
    } 
    // increments to the next student
    setCurrStudent((prev) => {
      if (prev < course.length) {
        return prev + 1;
      } else {
        return 0;
      }
    })
    
    setAssessNotes("")
    firstInput.current.focus();
    enterListener(e)
  };

  const enterListener = (e) => {
    e.preventDefault();
    const selectedProjName = projects.find((project) => project.project_id === projectId)
    let instructorNotes = ''
    
    axios.get(`https://app.asana.com/api/1.0/tasks/${indexedStudent.gid}`, {
      headers: {
        Authorization: `Bearer ${users.asana_access_token}`,
      }
    })
    .then((res) => {
      setAssessNotes("")
      instructorNotes = res.data.data.notes
    })
    .then(() => {
      !instructorNotes.length ? instructorNotes = "<u>Test Name: Test Score</u>" : null
      
      axios({
        method: "PUT", //must be put method not patch
        url: `https://app.asana.com/api/1.0/tasks/${indexedStudent.gid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this LOCAL DB NEEDED
        headers: {
          Authorization: `Bearer ${users.asana_access_token}`,  //need template literal for ALLLLL headers so global state dependant on user
        }, 
        data: { 
          data: {
            "workspace": "1213745087037",
            "assignee_section": null,
            "html_notes": `<body>${instructorNotes}\n ${selectedProjName.project_name.toUpperCase()}: ${grade ? "Passed" : "Failed"}</body>`, //need conditional or neeed to make this field mandatory
            "parent": null,
            "resource_subtype": "default_task",
          }
        }
      })
    })

    firstInput.current.focus();
  };


  return (
    <>
      {showUpdateAssessmentModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />
          <div className={styles.UpdateModal}>
            <div className={styles.header}>
              Update -
              {course[currStudent]
                ? indexedStudent.name
                : "Assessment Update COMPLETE"}
              <button className={styles.button} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.update}>
              {course[currStudent] ? (
              <form className={styles.updateForm} onSubmit={(e) => submitHandler(e)}>
                  <label htmlFor="assessments">Assessments</label> <br />
                  <div className={style.lableContainer}>
                  {/* <label className={style.labels}>Assesment</label> */}
                  <span onClick={() => setAddAssessName(!addAssessName)} className={style.addBtn} >&#10009;</span>
                  </div>
                  {addAssessName ? 
                  <input onChange={(e) => setNewAssessName(e.target.value)}></input>     
                  :
                  <select id="assessments" name="assessments" required autoFocus={true} ref={firstInput} onChange={(e) => setNewAssessName(e.target.value)}>
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  {/* <option> */}
                    {learn.map((assessment) => {
                          return (
                          <option key={assessment.assessment_id} value={assessment.assessment_name}>
                              {assessment.assessment_name}
                          </option>)
                      })}
                  {/* </option> */}
                  {/* <option value="Functions">
                    1 - Functions
                  </option>
                  <option value="Objects">
                    2 - Objects
                  </option>
                  <option value="Arrays">
                    3 - Arrays
                  </option>
                  <option value="DOM_API">
                    4 - DOM_API
                  </option>
                  <option value="JQUERY">
                    5 - JQUERY
                  </option> */}
                </select>
                }
                <br />
                <label htmlFor="Grade">Grade</label> <br />
                <input type="number" min="1" max="100" defaultValue="1" required onChange={(e) => {setScore(e.target.value)
                }}></input>
                <div>%</div>                  
                <br />
                <label htmlFor="Notes">Notes</label> <br />
                <textarea id="Notes" name="Notes" rows="10" cols="30" value={projNotes} required onChange={(e) => setAssessNotes(e.target.value)}></textarea>
                <br />
                <button type="submit" onClick={(e) => onSubmit(e)} value="Submit">Submit</button>
              </form>
            ) : (
              <span>Go code with your buds, you're done</span>
            )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateAssessmentsModal;

// const assessmentName = learn.find((assessment) => assessment.assessment_id === assessmentId)

// // on submit it will do a post request to our local databse 
// axios.post("/api/learnGrades", {
//     student_id: studentId,
//     assessment_id: assessmentId,
//     assessment_grade: assessScore,
//   })
//   // then it will do a get request to update the new added learn grade 
//   .then(() => {
//     axios.get(`/api/learnAndLearnGradesId/${studentId}`).then((res) => {
//       setCurrentLearnAndLearnGrades(res.data)
//     })
//   })
//   // Then it will add it to ASANA 
//   .then(() => {
//     // we have to get the current notes on ASANa first so you can paste it so you dont loose your inf when you do a post request to Asana
//     let instructorNotes = ""
//     axios.get(`https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, {
//         headers: {
//           Authorization: `Bearer ${users.asana_access_token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data)
//         instructorNotes = res.data.data.notes
//       })
//       // Once you gotten your previews notes in Asana it checks the if there was previews note is empty or not to add <u> tag as the title 
//       .then(() => {
//         instructorNotes.length === 0 ? (instructorNotes = "<u>Test Name: Test Score</u>") : null
//         // Once it checks it then it will do a put request to Asana 
//         axios({
//           method: "PUT", //must be put method not patch
//           url: `https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this LOCAL DB NEEDED
//           headers: {
//             Authorization: `Bearer ${users.asana_access_token} `, //need template literal for ALLLLL headers so global state dependant on user
//           },
//           data: {
//             data: {
//               workspace: "1213745087037",
//               assignee_section: null,
//               // in the body we are passing the first get request from asana to display the prev notes and then add the new note we wanted and not loose the prev notes in Asana 
//               html_notes: `<body>${instructorNotes}\n ${assessmentName.assessment_name.toUpperCase()} : ${assessScore}</body>`, //need conditional or neeed to make this field mandatory
//               parent: null,
//               resource_subtype: "default_task",
//               // "custom_fields": {
//               //   [techSkillGid]: `${cohort.studentInfo.Tech}`,  //template literal - done
//               //   [teamWorkGid]: `${cohort.studentInfo.Team}`   //template literal - done
//               // }
//             },
//           },
//         })
//       })
//   })