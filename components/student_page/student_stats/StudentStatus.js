import StatusLeft from "./StatusLeft"
import StatusRight from "./StatusRight"
import style from '../../../styles/StudentProfile.module.css'
const StudentStatus = ({currentStudent}) => {
  return (
    <div className={style.container}>
        <StatusLeft currentStudent={currentStudent} />
        <StatusRight currentStudent={currentStudent}/>
    </div>
  )
}

export default StudentStatus
