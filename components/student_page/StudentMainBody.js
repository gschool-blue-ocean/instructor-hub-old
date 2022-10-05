import NavBar from '../main_page/NavBar.js'
import StudentProfile from './student_stats/StudentProfile'
import style from '../../styles/StudentMainBody.module.css'

const StudentMainBody = () => {
  return (
    <div className={style.studentMainBody}>
      <NavBar/>
      <div style={{height: '50px'}}></div>
      <StudentProfile />
    </div>
  )
}

export default StudentMainBody