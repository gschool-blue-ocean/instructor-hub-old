import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  usersState,
  studentsState,
  currentCohortState,
  cohortsState,
  studentIdState,
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

  const fetchData = async () => {
    // console.log("What is cohortObject[0].gid?", cohortObject[0].gid);
    if (filteredCohort[currStudent]) {
      const projectInfo = await axios.get(
        `https://app.asana.com/api/1.0/projects/${cohortObject[0].gid}`,
        {
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
        }
      );
      console.log(
        "Big project",
        projectInfo.data.data.custom_field_settings[0].custom_field
          .enum_options[0]
      );
      setTechSkillGID(() => {
        return {
          GID: projectInfo.data.data.custom_field_settings[0].custom_field.gid,
          // 1 = Exceeds expectations
          1: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[0].gid,
          // Meets Expectations
          2: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[1].gid,
          // Approaching expecations
          3: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[2].gid,
          // Not yet approaching
          4: projectInfo.data.data.custom_field_settings[0].custom_field
            .enum_options[3].gid,
        };
      });
      setTeamWorkGID(() => {
        return {
          GID: projectInfo.data.data.custom_field_settings[1].custom_field.gid,
          // 1 = Exceeds expectations
          1: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[0].gid,
          // Meets Expectations
          2: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[1].gid,
          // Approaching expecations
          3: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[2].gid,
          // Not yet approaching
          4: projectInfo.data.data.custom_field_settings[1].custom_field
            .enum_options[3].gid,
        };
      });
      console.log("I have set the GID data, sire");
    } else {
      return;
    }
  };

  useEffect(() => {
    // console.log("Students: ", students);
    // console.log("What happened to the user?", user);
    console.log("user, students, or currentCohortName has changed");
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
    console.log("currStudent or filteredCohort has changed");
    if (filteredCohort[currStudent]) {
      setIndexedStudent(() => filteredCohort[currStudent]);
    }
    fetchData();
    // console.log("What is currStudent?", currStudent);
    // console.log("IndexedStudent is", indexedStudent);
    console.log("filteredCohort come back", filteredCohort);
  }, [currStudent, filteredCohort]);

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
    // let stagedName = `${indexedStudent.name}`;
    // console.log("Just staged for POST: ", stagedName);
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
    console.log("StagedStudent", stagedStudent);
    // In addition, it will be necessary to grab
    // "current student" from state.
    // these Setters MUST "return" a value, not merely increment or mutate

    // Can I replace each usage of setCurrStudent with a way to just setIndexedStudent to filteredCohort[prev + 1]
    setCurrStudent((prev) => {
      if (prev < filteredCohort.length) {
        return prev + 1;
      } else {
        return 0;
      }
    });
    return stagedStudent;
  };

  const asanaRoute = async () => {
    setIsLoading(() => true);
    console.log("Where the fuck is my stuff", techSkillGID);
    console.log("Where is the teamwork", teamWorkGID);
    stagedCohort.map(async (student) => {
      axios({
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
      }).then(() =>
        axios({
          method: "POST",
          url: `https://app.asana.com/api/1.0/tasks/${student.GID}/subtasks`,
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
          data: {
            data: {
              name: student.Notes,
            },
          },
        })
      );
      const sentTech = await axios.post("/api/studentTechSkills", {
        student_id: student.ID,
        score: parseInt(student.Tech),
      });
      const sentTeam = await axios.post("api/studentTeamworkSkills", {
        student_id: student.ID,
        score: parseInt(student.Team),
      });
      const sentNotes = await axios.post("/api/notes", {
        student_id: student.ID,
        notes: student.Notes,
        name: null,
        note_date: new Date(),
      });
    });
    setIsLoading(() => false);
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
                    <option value="4 - Needs improvement">
                      4 - Needs improvement
                    </option>
                    <option value="3 - Approaching standard">
                      3 - Approaching standard
                    </option>
                    <option value="2 - Meets standard">
                      2 - Meets standard
                    </option>
                    <option value="1 - Exceeds standard">
                      1 - Exceeds standard
                    </option>
                  </select>{" "}
                  <br />
                  <label htmlFor="Team">Teamwork Aptitude</label> <br />
                  <select id="Team" name="Team" required>
                    <option value="none" selected disabled hidden>
                      Select an Option
                    </option>
                    <option value="4 - Needs improvement">
                      4 - Needs improvement
                    </option>
                    <option value="3 - Approaching standard">
                      3 - Approaching standard
                    </option>
                    <option value="2 - Meets standard">
                      2 - Meets standard
                    </option>
                    <option value="1 - Exceeds standard">
                      1 - Exceeds standard
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
