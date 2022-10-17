import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
        usersState,
        studentsState,
        currentCohortState,
        studentIdState,
        currentStudentState,
        currStudentProjectsState,
        projectsState
      } from "../../state";
import styles from "../../../styles/UpdateModal.module.css";
import axios from 'axios'

const UpdateProjectsModal = ({ showUpdateProjectModal, setShowUpdateProjectModal, onClose }) => {
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

  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [currStudentProjects, setCurrStudentProjects] = useRecoilState(currStudentProjectsState)
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [users, setUsers] = useRecoilState(usersState);
  const [projSelected, setProjSelected] = useState(''); 
  const [projGrade, setProjGrade] = useState([]); 
  const [projNotes, setProjNotes] = useState(''); 

  // How to use this in relation to a stupid modal?
  // Try to cut out the middleman -- only need currStudent or indexedStudent, not both
  useEffect(() => {
    if (course[currStudent]) {
      setIndexedStudent((prev) => course[currStudent]);
    }
    // console.log("what the stagedCohort look like?", stagedCohort);
    // console.log(course[currStudent]);
  }, [currStudent, currentCohort]); 
  console.log('indexedStudent:',indexedStudent)
  
  // Filters students to be updated by matching their cohort value to currentCohort's name
  let course = students.filter(
    (classRoom) => classRoom.cohort == currentCohort
  );
  console.log('course:', course)
  // To reset the indexer value if modal is closed early
  onClose = () => {
    setCurrStudent((prev) => 0);
    setShowUpdateProjectModal(false);
  };
  let grade = projGrade === 'true'
  let projectId = Number(projSelected)
  console.log("Here:", indexedStudent.student_id)
  
  // submitHandler and enterListener are basically redundant, see about combining/creating helper
  // enterListener only necessary because the Notes input is a textarea, and "Enter" is used by default for newline
  const submitHandler = async (e) => {
    e.preventDefault();
    // This bit will be replaced by the actual ASANA POST and subsequent DB stowing v
    try {
      const add = await axios.post('/api/projectGrades', {
        "student_id": indexedStudent.student_id,
        "project_id": projectId,
        "project_passed": grade,
        "notes": `${projNotes}`
      })
    } catch (error) {     
        alert(`This project has already been added for ${indexedStudent.name}`) 
        console.log('wtf')
    }  
    const getIt = await axios.get(`/api/projectsAndProjectGradesId/${indexedStudent.student_id}`).then((res) => {
          setCurrStudentProjects(res.data);
            
          console.log(res.data, 'res.data/current project_grades');
          console.log('current student projects:', currStudentProjects)
          setCurrStudent((prev) => {
            if (prev < course.length) {
              return prev + 1;
            } else {
              return 0;
            }
          })
          e.target.reset();
          firstInput.current.focus();
        })
  };

  // const enterListener = (e) => {
  //   if (e.key === "Enter" && e.shiftKey === false) {
  //     e.preventDefault();
  //     const stagedStudent = formGetter(e.target.form);
  //     // This bit will be replaced by the actual ASANA POST and subsequent DB stowing v
  //     setStagedCohort((prev) => {
  //       prev.push(stagedStudent);
  //       return prev;
  //     });
  //     // Until HERE ^
  //     e.target.form.reset();
  //     firstInput.current.focus();
  //   }
  // };


  return (
    <>
      {showUpdateProjectModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />

          <div className={styles.UpdateModal}>
            <div className={styles.header}>
              Update -{" "}
              {course[currStudent]
                ? indexedStudent.name
                : "Project Update COMPLETE"}
              <button className={styles.button} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.update}>
              {course[currStudent] ? (
                <form
                  className={styles.updateForm}
                  onSubmit={submitHandler}
                  // onKeyDown={enterListener}
                >
                  <label htmlFor="Projects">Projects</label> <br />
                  <select
                    id="Projects"
                    name="Projects"
                    required
                    autoFocus={true}
                    ref={firstInput}
                    onChange={(e) => setProjSelected(e.target.value)}
                  >
                    <option value="none" selected disabled hidden>
                      Select an Option
                    </option>
                    <option value="1">
                      1 - Twiddler
                    </option>
                    <option value="2">
                      2 - PixelArtMaker
                    </option>
                    <option value="3">
                      3 - ReactMVP
                    </option>
                    <option value="4">
                      4 - FoodTruck
                    </option>
                    <option value="5">
                      5 - Hackathon
                    </option>
                  </select>{" "}
                  <br />
                  <label htmlFor="Grade">Grade</label> <br />
                  <select id="Grade" name="Grade" required onChange={(e) => setProjGrade(e.target.value)}>
                    <option value="none" selected disabled hidden>
                      Select an Option
                    </option>
                    <option value={true}>
                      1 - Passed
                    </option>
                    <option value={false}>
                      2 - Failed
                    </option>
                
                  </select>{" "}
                  <br />
                  <label htmlFor="Notes">Notes</label> <br />
                  <textarea
                    id="Notes"
                    name="Notes"
                    rows="10"
                    cols="30"
                    required
                    onChange={(e) => setProjNotes(e.target.value)}
                  ></textarea>{" "}
                  <br />
                  <input type="submit" value="Submit" />
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

export default UpdateProjectsModal;

/*-----Converting string into Boolean and Number-----*/
  // let grade = projGrade === 'true'
  // let projectId = Number(projSelected)
  // // console.log(projectId,'here')


  // const addProject = () => {
    // axios.post('/api/projectGrades', {
    //   "student_id": studentId,
    //   "project_id": projectId,
    //   "project_passed": grade, 
    //   "notes": `${projNotes}`
    // })
    // .then(() => {
    //   axios.get(`/api/projectsAndProjectGradesId/${studentId}`).then((res) => {
    //     setCurrStudentProjects(res.data);
    //     // console.log(res.data, 'new');
    //   })
    // }) 

  //   let instructorNotes = ''
  //    axios.get(`https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, {
  //     headers: {
  //       Authorization: `Bearer ${users[3].asana_access_token}`,
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res.data.data)
  //     instructorNotes = res.data.data.notes
  //   })
  //   .then(() => {
  //     instructorNotes.length === 0 ? instructorNotes = "<u>Test Name: Test Score</u>" : null
  //     axios({
  //       method:"PUT",  //must be put method not patch
  //       url: `https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this LOCAL DB NEEDED
  //       headers: {
  //         Authorization: `Bearer ${users[3].asana_access_token}`,  //need template literal for ALLLLL headers so global state dependant on user
  //       }, data: { 
  //           data: {
  //             "workspace": "1213745087037",
  //             "assignee_section": null,
  //             "html_notes": `<body>${instructorNotes}\n ${"Name".toUpperCase()}: ${grade ? "Passed" : "Failed"}</body>`, //need conditional or neeed to make this field mandatory
  //             "parent": null,
  //             "resource_subtype": "default_task",
  //           }
  //         }
  //     })
  //   })
  // }