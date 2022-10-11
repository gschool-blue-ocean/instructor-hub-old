import { useState } from "react";
import styles from "../../../styles/NewCohortModal.module.css";
import axios from "axios";

const NewCohortModal = ({ showNewCohortModal, newCohortModal, onClose }) => {
  const [cohortName, setCohortName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitted, isSubmitted] = useState(false);

  if (submitted) {
    setTimeout(() => {
      isSubmitted(false);
    }, 2000);
  }

  const resClick = (event) => {
    event.preventDefault();
    let formData = new FormData(document.getElementById("form"));

    setCohortName("");
    setInstructor("");
    setStartDate("");
    setEndDate("");
    isSubmitted(true);

    axios
      .post("/api/cohorts", {
        cohort: formData.get("cohortName"),
        begin_date: formData.get("cohortStart"),
        end_date: formData.get("cohortEnd"),
        startdate: formData.get("checkin"),
        instructor: formData.get("cohortInstructor"),
      })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {newCohortModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />
          <div className={styles.newCohortModal}>
            <form
              className={styles.newCohortForm}
              id="form"
              onSubmit={resClick}
            >
              <label for="cohortName">Name of Cohort</label>
              <br />
              <input
                type="text"
                id="cohortName"
                name="cohortName"
                placeholder="Name of Cohort"
                onChange={(event) => setCohortName(event.target.value)}
                value={cohortName}
                required
              />
              <br />
              <label for="startDate">Start Date:</label>
              <br />
              <input
                type="date"
                id="cohortStart"
                name="cohortStart"
                onChange={(event) => setStartDate(event.target.value)}
                value={startDate}
                required
              />
              <br />
              <label for="endDate">End Date:</label>
              <br />
              <input
                type="date"
                id="cohortEnd"
                name="cohortEnd"
                onChange={(event) => setEndDate(event.target.value)}
                value={endDate}
                required
              />
              <br />
              <label for="instructorName">Name of Instructor</label>
              <br />
              <input
                type="text"
                id="instructor"
                name="cohortInstructor"
                placeholder="Instructor Name"
                onChange={(event) => setInstructor(event.target.value)}
                value={instructor}
                required
              />
              <br />
              <input className={styles.submit} type="submit" value="Submit" />
              {submitted ? (
                <div className={styles.created}>Cohort created~!</div>
              ) : null}
            </form>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NewCohortModal;
