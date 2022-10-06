import styles from '../../styles/StudentMainBody.module.css'
import StudentStatus from '../student_page/student_stats/StudentStatus.js'
import NavBar from '../main_page/NavBar.js'

const StudentMainBody = () => {
  return (
    <>
    <NavBar />
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <img className={styles.picture} alt='student pic' src='/pic1.jpg' width={80} height={80}/>
        <div className={styles.title}>
          <div className={styles.studentName}>First LastName</div>
          <div className={styles.gitTransCon}>
            <p className={styles.etsDate}>ETS DATE: March 20, 2023</p>
            <p className={styles.gitHub}>GitHub Username: student123A</p>
          </div>
        </div>
      </div>
      <StudentStatus/>
      <div className={styles.notesContainer}>
        <div className={styles.notesTitle}>Notes</div>
        <div>
          <ul>
            <li>An obese pink starfish</li>
            <li>Patrick lives under a rock in the underwater city of Bikini Bottom next door to Squidward Tentacles' moai</li>
            <li>His most significant character trait is his low intelligence</li>
            <li>which often gets him and his best friend, SpongeBob SquarePants, into trouble</li>
          </ul>
        </div>
      </div>
    </div>
  </>
  )
}

export default StudentMainBody