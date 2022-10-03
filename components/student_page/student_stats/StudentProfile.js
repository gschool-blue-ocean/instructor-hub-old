import StudentStatsLeft from './StudentStatsLeft'
import StudentStatsRight from './StudentStatsRight'
import style from '../../../styles/StudentProfile.module.css'

const StudentProfile = () => {
  return (
    <div className={style.studentPage}>
      <div className={style.studentProfile}>
        <StudentStatsLeft/>
        <StudentStatsRight/>
      </div>
      <div>notes</div>
      <textarea></textarea>
    </div>
  )
}

export default StudentProfile