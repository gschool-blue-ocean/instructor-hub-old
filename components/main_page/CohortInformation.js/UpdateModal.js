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
              <button className={styles.button} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.update}>
              Tab select between Technical Ability, Teamwork Ability, and Notes.
              Use number keys to select aptitude, hit Enter to move to next
              student.
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateModal;
