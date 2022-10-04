import { useState } from "react";
import styles from "../../../styles/UpdateModal.module.css";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  const [modal, setModal] = useState(false);

  // This will likely be replaced by some value grabbed from state/Recoil.
  const cohort = {};

  // In addition, it will be necessary to grab
  // "current student" from state.

  const submitHandler = (e) => {
    e.preventDefault();
    const target = e.target;
    let formData = new FormData(target);
    let student = { studentName: {} };
    for (const pair of formData.entries()) {
      student.studentName[pair[0]] = pair[1];
    }
    cohort = { ...student };
    console.log("Update Modal: submitHandler returns: ", cohort);
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
              <form onSubmit={submitHandler}>
                <label htmlFor="Tech">Technical Aptitude</label> <br />
                <select id="Tech" name="Tech" required>
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
