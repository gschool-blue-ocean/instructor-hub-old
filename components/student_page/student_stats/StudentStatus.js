import StatusLeft from "./StatusLeft"
import StatusRight from "./StatusRight"
import style from '../../../styles/StudentProfile.module.css'
const StudentStatus = () => {
  return (
    <div className={style.container}>
        <StatusLeft />
        <StatusRight/>
    </div>
  )
}

export default StudentStatus
