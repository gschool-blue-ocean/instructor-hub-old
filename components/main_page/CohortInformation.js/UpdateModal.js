import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  usersState,
  studentsState,
  currentCohortState,
  cohortsState,
  currentStudentState,
} from "../../state";
import styles from "../../../styles/UpdateModal.module.css";
import axios from "axios";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  // What student is being updated at this moment
  const [currStudent, setCurrStudent] = useState(0);
  // This is derived state -- updated at same time as currStudent, one derives the other
  const [indexedStudent, setIndexedStudent] = useState({});
  const [modal, setModal] = useState(false);
  // This is a rough draft idea, probably obscelesced by simply POSTing each student to Asana
  const [stagedCohort, setStagedCohort] = useState([]);
  const [studentGID, setStudentGID] = useState([]);
  const [techSkillGID, setTechSkillGID] = useState({});
  const [teamWorkGID, setTeamWorkGID] = useState({});
  // Merely to identify who is making the update, and possibly selecting the students of the user's default cohort
  const [currentCohortName, setCurrentCohortName] =
    useRecoilState(currentCohortState);
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [user, setUser] = useRecoilState(usersState);
  const [currentStudent, setCurrentStudent] =
    useRecoilState(currentStudentState);
  // Unless this is replaced by some "selected students" state, or "current cohort" state, this determines how the updater iterates
  // (by going through the students)
  const [students, setStudents] = useRecoilState(studentsState);
  // This lets us use a ref hook to grab the first Select input and refocus it on form submission
  const firstInput = useRef(null);

  const fetchData = async () => {
    if (filteredCohort[currStudent]) {
      const projectInfo = await axios.get(
        `https://app.asana.com/api/1.0/tasks/${filteredCohort[currStudent].gid}`,
        {
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
        }
      );
      console.log("wut projectinfo", projectInfo.data);
      setTechSkillGID({
        GID: projectInfo.data.data.custom_fields[0].gid,
        Great: projectInfo.data.data.custom_fields[0].enum_options[0].gid,
        Good: projectInfo.data.data.custom_fields[0].enum_options[1].gid,
        Okay: projectInfo.data.data.custom_fields[0].enum_options[2].gid,
        Bad: projectInfo.data.data.custom_fields[0].enum_options[3].gid,
      });
      setTeamWorkGID({
        GID: projectInfo.data.data.custom_fields[1].gid,
        Great: projectInfo.data.data.custom_fields[1].enum_options[0].gid,
        Good: projectInfo.data.data.custom_fields[1].enum_options[1].gid,
        Okay: projectInfo.data.data.custom_fields[1].enum_options[2].gid,
        Bad: projectInfo.data.data.custom_fields[1].enum_options[3].gid,
      });
    } else {
      return;
    }
  };

  // Try to cut out the middleman -- only need currStudent or indexedStudent, not both
  useEffect(() => {
    console.log("What's the whole cohort object?", cohortObject[0]);
    if (filteredCohort[currStudent]) {
      setIndexedStudent((prev) => filteredCohort[currStudent]);
    } else if (
      (currStudent = filteredCohort.length && filteredCohort.length > 0)
    ) {
      axios.put(
        `https://app.asana.com/api/1.0/projects/${cohortObject[0].gid}`,
        {
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
          // data: {
          //   data: {

          //   }
          // }
        }
      );
      setStagedCohort({});
    }
    console.log("what filteredCohort?", filteredCohort);
    fetchData();
  }, [currStudent, currentCohortName]);

  // Filters students to be updated by matching their cohort value to currentCohortName's name
  let filteredCohort = students.filter(
    (classRoom) => classRoom.cohort == currentCohortName
  );
  let cohortObject = cohorts.filter(
    (cohort) => cohort.name == currentCohortName
  );

  // To reset the indexer value if modal is closed early
  onClose = () => {
    setCurrStudent((prev) => 0);
    setShowUpdateModal(false);
  };

  // submitHandler and enterListener are basically redundant, see about combining/creating helper
  // enterListener only necessary because the Notes input is a textarea, and "Enter" is used by default for newline
  const submitHandler = (e) => {
    e.preventDefault();
    const stagedStudent = formGetter(e.target);
    // This bit will be replaced by the actual ASANA POST and subsequent DB stowing v
    setStagedCohort((prev) => [...prev, stagedStudent]);
    // Until HERE ^
    e.target.reset();
    firstInput.current.focus();
  };

  const enterListener = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      const stagedStudent = formGetter(e.target.form);
      // This bit will be replaced by the actual ASANA POST and subsequent DB stowing v
      setStagedCohort((prev) => [...prev, stagedStudent]);

      // Until HERE ^
      e.target.form.reset();
      firstInput.current.focus();
    }
  };

  // formGetter grabs the entered data from the field and packages it for POST
  const formGetter = (form) => {
    let stagedName = `${indexedStudent.name}`;
    console.log("Just staged for POST: ", stagedName);
    let stagedStudent = { name: stagedName, GID: indexedStudent.gid };
    let formData = new FormData(form);
    for (const pair of formData.entries()) {
      stagedStudent[pair[0]] = pair[1];
    }
    console.log("StagedStudent", stagedStudent);
    // In addition, it will be necessary to grab
    // "current student" from state.
    // these Setters MUST "return" a value, not merely increment or mutate
    setCurrStudent((prev) => {
      if (prev < filteredCohort.length) {
        return prev + 1;
      } else {
        return 0;
      }
    });
    return stagedStudent;
  };

  return (
    <>
      {showUpdateModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />

          <div className={styles.UpdateModal}>
            <div>
              <div className={styles.header}>
                Update -{" "}
                {filteredCohort[currStudent]
                  ? indexedStudent.name
                  : "Weekly Update COMPLETE"}
                <button className={styles.button} onClick={onClose}>
                  X
                </button>
              </div>
              <div className={styles.update}>
                {filteredCohort[currStudent] ? (
                  <form
                    className={styles.updateForm}
                    onSubmit={submitHandler}
                    onKeyDown={enterListener}
                  >
                    <label htmlFor="Tech">Technical Aptitude</label> <br />
                    <select
                      id="Tech"
                      name="Tech"
                      required
                      autoFocus={true}
                      ref={firstInput}
                    >
                      <option value="none" selected disabled hidden>
                        Select an Option
                      </option>
                      <option value="1 - Needs improvement">
                        1 - Needs improvement
                      </option>
                      <option value="2 - Approaching standard">
                        2 - Approaching standard
                      </option>
                      <option value="3 - Meets standard">
                        3 - Meets standard
                      </option>
                      <option value="4 - Exceeds standard">
                        4 - Exceeds standard
                      </option>
                    </select>{" "}
                    <br />
                    <label htmlFor="Team">Teamwork Aptitude</label> <br />
                    <select id="Team" name="Team" required>
                      <option value="none" selected disabled hidden>
                        Select an Option
                      </option>
                      <option value="1 - Needs improvement">
                        1 - Needs improvement
                      </option>
                      <option value="2 - Approaching standard">
                        2 - Approaching standard
                      </option>
                      <option value="3 - Meets standard">
                        3 - Meets standard
                      </option>
                      <option value="4 - Exceeds standard">
                        4 - Exceeds standard
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
                    ></textarea>{" "}
                    <br />
                    <input type="submit" value="Submit" />
                  </form>
                ) : (
                  <>
                    {stagedCohort.map((student) => (
                      <>
                        <ul>
                          <li key={student.GID}>{student.name}</li>
                        </ul>
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateModal;
