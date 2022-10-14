import StudentMainBody from '../../components/student_page/StudentMainBody.js'
import { useRouter } from 'next/router.js'
import { useRecoilState } from "recoil";
import {studentIdState} from '../../components/state.js'


const Student = () => {
  return (
    <div>
        <StudentMainBody />
    </div>
  )
}

export default Student