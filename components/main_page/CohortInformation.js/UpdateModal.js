import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { usersState, studentsState } from "../../state";
import styles from "../../../styles/UpdateModal.module.css";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  const [modal, setModal] = useState(false);
  const [stagedCohort, setStagedCohort] = useState({});
  const [user, setUser] = useRecoilState(usersState);
  const [students, setStudents] = useRecoilState(studentsState);
  const [currStudent, setCurrStudent] = useState(0);

  // This will likely be replaced by some value grabbed from state/Recoil.
  // const cohort = {};

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("What is the submit 'e'?", e);
    const stagedStudent = formGetter(e.target);
    setStagedCohort((prev) => ({
      ...stagedStudent,
    }));
    e.target.reset();
  };

  const enterListener = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      console.log("Compare context of this 'e' with the submit 'e'", e);
      const stagedStudent = formGetter(e.target.form);
      setStagedCohort((prev) => ({
        ...stagedStudent,
      }));
      e.target.form.reset();
    }
  };

  const formGetter = (form) => {
    let stagedName = `${students[currStudent].name_first} ${students[currStudent].name_last}`;
    console.log("staged student's name: ", stagedName);
    let stagedStudent = { [stagedName]: {} };
    let formData = new FormData(form);
    for (const pair of formData.entries()) {
      console.log(stagedStudent);
      console.log(pair);
      stagedStudent[stagedName][pair[0]] = pair[1];
    }

    // In addition, it will be necessary to grab
    // "current student" from state.
    setCurrStudent((prev) => {
      if (prev < students.length) {
        currStudent++;
      } else {
        currStudent = 0;
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
              Update -{" "}
              {`${students[currStudent].name_first} ${students[currStudent].name_last}`}
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
                <select id="Tech" name="Tech" required autoFocus="true">
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
