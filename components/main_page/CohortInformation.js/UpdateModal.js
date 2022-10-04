import { useState } from "react";
import styles from "../../../styles/UpdateModal.module.css";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  const [modal, setModal] = useState(false);

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
              <form>
                <label htmlFor="Tech">Technical Aptitude</label>
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
                </select>

                <label htmlFor="Team">Teamwork Aptitude</label>
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
                </select>

                <label htmlFor="Notes">Notes</label>
                <textarea
                  id="Notes"
                  name="Notes"
                  rows="10"
                  cols="30"
                  required
                ></textarea>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateModal;
