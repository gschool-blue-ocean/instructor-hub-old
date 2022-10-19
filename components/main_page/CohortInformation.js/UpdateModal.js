import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  usersState,
  studentsState,
  currentCohortState,
  cohortsState,
  syncNeeded,
} from "../../state";
import styles from "../../../styles/UpdateModal.module.css";
import axios from "axios";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  // What student is being updated at this moment
  const [currStudent, setCurrStudent] = useState(0);
  // Array of students checked against currentCohortName to determine cohort for iterating through
  const [filteredCohort, setFilteredCohort] = useState([]);
  // Same as filteredCohort, but checks cohorts against the currentCohortName to grab the cohort GID
  const [cohortObject, setCohortObject] = useState([]);
  // This is derived state -- updated at same time as currStudent, one derives the other
  const [indexedStudent, setIndexedStudent] = useState({});
  const [modal, setModal] = useState(false);
  // This is a rough draft idea, probably obscelesced by simply POSTing each student to Asana
  const [stagedCohort, setStagedCohort] = useState([]);
  // techSkill and teamWorkGID hold the K-V pairs describing the custom fields in Asana that instructors use for their weekly updates
  const [techSkillGID, setTechSkillGID] = useState({});
  const [teamWorkGID, setTeamWorkGID] = useState({});
  // Merely to identify who is making the update, and possibly selecting the students of the user's default cohort
  const [currentCohortName, setCurrentCohortName] =
    useRecoilState(currentCohortState);
  // Unless these two [cohorts, students] are replaced by some "selected students" state, and/or "current cohort" state, this determines how the updater iterates
  // (by going through the students)...
  const [students, setStudents] = useRecoilState(studentsState);
  // ... as well as through the available cohorts
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  // useful for stating who is making the updates, and for grabbing the default_cohort value
  const [user, setUser] = useRecoilState(usersState);
  // This lets us use a ref hook to grab the first Select input and refocus it on form submission
  const firstInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sync, setSync] = useRecoilState(syncNeeded)

  const fetchData = async () => {
    if (filteredCohort[currStudent]) {
      const projectInfo = await axios.get(
        `https://app.asana.com/api/1.0/projects/${cohortObject[0].gid}`,
        {
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
        }
      );
      setTechSkillGID(() => {
        return {
          GID: projectInfo.data.data.custom_field_settings[0].custom_field.gid,
          // 4 = Exceeds expectations
          4: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[0].gid,
          // Meets Expectations
          3: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[1].gid,
          // Approaching expecations
          2: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[2].gid,
          // Not yet approaching
          1: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[3].gid,
        };
      });
      setTeamWorkGID(() => {
        return {
          GID: projectInfo.data.data.custom_field_settings[1].custom_field.gid,
          // 4 = Exceeds expectations
          4: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[0].gid,
          // Meets Expectations
          3: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[1].gid,
          // Approaching expecations
          2: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[2].gid,
          // Not yet approaching
          1: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[3].gid,
        };
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    // console.log("user, students, or currentCohortName has changed");
    if (students) {
      const impendingCohort = students.filter(
        (student) => student.cohort == currentCohortName
      );
      setFilteredCohort(() => impendingCohort);
    }
    if (cohorts) {
      const impendingObject = cohorts.filter(
        (cohort) => cohort.name == currentCohortName
      );
      setCohortObject(() => impendingObject);
    }
  }, [user, students, currentCohortName]);

  // Try to cut out the middleman -- only need currStudent or indexedStudent, not both
  useEffect(() => {
    // console.log("currStudent or filteredCohort has changed");
    if (filteredCohort[currStudent]) {
      setIndexedStudent(() => filteredCohort[currStudent]);
    }
    fetchData();
    console.log("filteredCohort come back", filteredCohort);
  }, [currStudent, filteredCohort]);

  // To reset the indexer value if modal is closed early
  onClose = () => {
    setCurrStudent((prev) => 0);
    setStagedCohort(() => []);
    setShowUpdateModal(false);
  };

  // submitHandler and enterListener are basically redundant, see about combining/creating helper
  // enterListener only necessary because the Notes input is a textarea, and "Enter" is used by default for newline
  const submitHandler = (e) => {
    e.preventDefault();
    const stagedStudent = formGetter(e.target);
    setStagedCohort((prev) => [...prev, stagedStudent]);
    nextStudent();
    e.target.reset();
    firstInput.current.focus();
  };

  // This allows you to Shift+Enter to create a new line in the textArea, and Enter to submit the form
  // const enterListener = (e) => {
  //   if (e.key === "Enter" && e.shiftKey === false) {
  //     e.preventDefault();
  //     const stagedStudent = formGetter(e.target.form);
  //     // This bit will be replaced by the actual ASANA POST and subsequent DB stowing v
  //     setStagedCohort((prev) => [...prev, stagedStudent]);

  //     // Until HERE ^
  //     e.target.form.reset();
  //     firstInput.current.focus();
  //   }
  // };

  // A function to allow moving back and forth through the filteredCohort
  // It will be necessary to grab "current student" from state.
  // these Setters MUST "return" a value, not merely increment or mutate
  // Can I replace each usage of setCurrStudent with a way to
  // just setIndexedStudent to filteredCohort[prev + 1] or something like that?
  const prevStudent = () => {
    setCurrStudent((prev) => {
      if (prev !== 0) {
        return prev - 1;
      } else {
        return 0;
      }
    });
  };

  const nextStudent = () => {
    setCurrStudent((prev) => {
      return prev + 1;
    });
  };

  // formGetter grabs the entered data from the field and packages it for POST
  const formGetter = (form) => {
    let stagedStudent = {
      ID: indexedStudent.student_id,
      GID: indexedStudent.gid,
      Name: indexedStudent.name,
    };
    let formData = new FormData(form);
    for (const pair of formData.entries()) {
      if (pair[0] === "Tech" || pair[0] === "Team") {
        stagedStudent[pair[0]] = parseInt(pair[1]);
      } else {
        stagedStudent[pair[0]] = pair[1];
      }
    }

    return stagedStudent;
  };

  const asanaRoute = async () => {
    if (stagedCohort.length < 1) {
      setCurrStudent(() => 0);
      alert("Nice try, submit an actual update this time");
    } else {
      const timestamp = new Date();
      const preText = `${user.username} @ ${timestamp.toLocaleDateString()}: `;
      setIsLoading(() => true);
      stagedCohort.map(async (student) => {
        await axios({
          method: "PUT",
          url: `https://app.asana.com/api/1.0/tasks/${student.GID}`,
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
          data: {
            data: {
              custom_fields: {
                [techSkillGID.GID]: techSkillGID[student.Tech],
                [teamWorkGID.GID]: teamWorkGID[student.Team],
              },
            },
          },
        });
        await axios({
          method: "POST",
          url: `https://app.asana.com/api/1.0/tasks/${student.GID}/subtasks`,
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
          data: {
            data: {
              name: `${preText}${student.Notes}`,
            },
          },
        });
        await axios.post("/api/studentTechSkills", {
          student_id: student.ID,
          score: parseInt(student.Tech),
        });
        await axios.post("api/studentTeamworkSkills", {
          student_id: student.ID,
          score: parseInt(student.Team),
        });
        await axios.post("/api/notes", {
          student_id: student.ID,
          notes: student.Notes,
          name: null,
          note_date: new Date(),
        });
      });
      setIsLoading(() => false);
      onClose();
      setCurrStudent(() => 0);
      setStagedCohort(() => []);
      alert("You did it, verify your update went to Asana correctly");
    }
  };

  return (
    <>
      {showUpdateModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />

          <div className={styles.UpdateModal}>
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
                <>
                  <form
                    className={styles.updateForm}
                    onSubmit={submitHandler}
                    // onKeyDown={enterListener}
                  >
                    <label htmlFor="Tech">Technical Aptitude</label> <br />
                    <select
                      id="Tech"
                      name="Tech"
                      required
                      autoFocus={true}
                      ref={firstInput}
                    >
                      <option
                        value="none"
                        selected={true}
                        disabled={true}
                        hidden={true}
                      >
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
                      <option
                        value="none"
                        selected={true}
                        disabled={true}
                        hidden={true}
                      >
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
                  <div className={styles.formFooter}>
                    <button
                      onClick={prevStudent}
                      disabled={currStudent === 0 ? true : false}
                    >
                      Previous Student
                    </button>
                    <button onClick={nextStudent}>Next Student</button>
                  </div>
                </>
              ) : (
                <>
                  <ul>
                    {stagedCohort.map((student) => (
                      <li key={student.GID}>
                        {student.Name} - Tech: {student.Tech}
                        <br />
                        Team: {student.Team}
                        <br />
                        Notes: {student.Notes}
                      </li>
                    ))}
                  </ul>
                  <button onClick={asanaRoute}>Click to Update</button>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateModal;
