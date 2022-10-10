import styles from "../../styles/StudentMainBody.module.css";
import StudentStatus from "../student_page/student_stats/StudentStatus.js";
import NavBar from "../main_page/NavBar.js";
import { currentStudentState} from "../state";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

const StudentMainBody = () => {

  // current student is the current information for one person 
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);


  // converting ETs date into MM DAY YYYY
  let date = new Date(currentStudent.ets_date); 
  let etsDate = date.toDateString()


  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <img
            className={styles.picture}
            alt="student pic"
            src="/pic1.jpg"
            width={80}
            height={80}
          />
          <div className={styles.title}>
            <div
              className={styles.studentName}
            >{`${currentStudent.name_first} ${currentStudent.name_last}`}</div>
            <div className={styles.gitTransCon}>
              <p className={styles.etsDate}>{`ETS DATE: ${etsDate} `}</p>
              <p className={styles.gitHub}>{`GitHub Username: ${currentStudent.github}`}</p>
            </div>
          </div>
        </div>
        <StudentStatus />
        <div className={styles.notesContainer}>
          <div className={styles.notes}>
            <div className={styles.notesTitle}>Notes</div>
            <div>
              <ul>
                <li>An obese pink starfish</li>
                <li>
                  Patrick lives under a rock in the underwater city of Bikini
                  Bottom next door to Squidward Tentacles' moai
                </li>
                <li>
                  His most significant character trait is his low intelligence
                </li>
                <li>
                  which often gets him and his best friend, SpongeBob
                  SquarePants, into trouble
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentMainBody;
