import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { usersState, studentsState } from "../../state";
import styles from "../../../styles/UpdateModal.module.css";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  // What student is being updated at this moment
  const [currStudent, setCurrStudent] = useState(0);
  // This is derived state -- updated at same time as currStudent, one derives the other
  const [indexedStudent, setIndexedStudent] = useState({});
  const [modal, setModal] = useState(false);
  // This is a rough draft idea, probably obscelesced by simply POSTing each student to Asana
  const [stagedCohort, setStagedCohort] = useState([]);
  // Merely to identify who is making the update, and possibly selecting the students of the user's default cohort
  const [user, setUser] = useRecoilState(usersState);
  // Unless this is replaced by some "selected students" state, or "current cohort" state, this determines how the updater iterates
  // (by going through the students)
  const [students, setStudents] = useRecoilState(studentsState);
  const firstInput = useRef(null);

  // How to use this in relation to a stupid modal?
  // Try to cut out the middleman -- only need currStudent or indexedStudent, not both
  useEffect(() => {
    if (students[currStudent]) {
      setIndexedStudent(students[currStudent]);
    }
    console.log("what the stagedCohort look like?", stagedCohort);
  }, [currStudent]);

  // submitHandler and enterListener are basically redundant, see about combining/creating helper
  // enterListener only necessary because the Notes input is a textarea, and "Enter" is used by default for newline
  const submitHandler = (e) => {
    e.preventDefault();
    const stagedStudent = formGetter(e.target);
    // This bit will be replaced by the actual ASANA POST and subsequent DB stowing v
    setStagedCohort((prev) => {
      prev.push(stagedStudent);
      return prev;
    });
    // Until HERE ^
    e.target.reset();
    firstInput.current.focus();
  };

  const enterListener = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      const stagedStudent = formGetter(e.target.form);
      // This bit will be replaced by the actual ASANA POST and subsequent DB stowing v
      setStagedCohort((prev) => {
        prev.push(stagedStudent);
        return prev;
      });
      // Until HERE ^
      e.target.form.reset();
      firstInput.current.focus();
    }
  };

  // formGetter grabs the entered data from the field and packages it for POST
  const formGetter = (form) => {
    let stagedName = `${indexedStudent.name}`;
    console.log("staged student's name: ", stagedName);
    let stagedStudent = { [stagedName]: {} };
    let formData = new FormData(form);
    for (const pair of formData.entries()) {
      stagedStudent[stagedName][pair[0]] = pair[1];
    }
    // In addition, it will be necessary to grab
    // "current student" from state.
    // these Setters MUST "return" a value, not merely increment or mutate
    setCurrStudent((prev) => {
      if (prev < students.length) {
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
            <div className={styles.header}>
              Update - {indexedStudent.name}
              <button className={styles.button} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.update}>
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
                  <option value="3 - Meets standard">3 - Meets standard</option>
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
                  <option value="3 - Meets standard">3 - Meets standard</option>
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
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateModal;
