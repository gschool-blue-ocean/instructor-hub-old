import { useState } from "react";
import styles from "../../../styles/UpdateModal.module.css";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  const [modal, setModal] = useState(false);
  const [stagedCohort, setStagedCohort] = useState({});

  // This will likely be replaced by some value grabbed from state/Recoil.
  const cohort = {};

  // In addition, it will be necessary to grab
  // "current student" from state.

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("What is the submit 'e'?", e);
    const stagedStudent = formGetter(e.target);
    setStagedCohort((prev) => ({
      ...stagedStudent,
    }));
  };

  const enterListener = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      console.log("Compare context of this 'e' with the submit 'e'", e);
      const stagedStudent = formGetter(e.target.form);
      setStagedCohort((prev) => ({
        ...stagedStudent,
      }));
    }
  };

  const formGetter = (form) => {
    let stagedStudent = { studentName: {} };
    let formData = new FormData(form);
    for (const pair of formData.entries()) {
      stagedStudent.studentName[pair[0]] = pair[1];
    }
    return stagedStudent;
  };

  return (
    <>
      {showUpdateModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />

          <div className={styles.UpdateModal}>
            <div className={styles.header}>
              Update - Student's Name
              <button className={styles.button} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.update}>
              <p>
                Tab select between Technical Ability, Teamwork Ability, and
                Notes. Use number keys to select aptitude, hit Enter to move to
                next student.
              </p>
              <form
                id="updateForm"
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
