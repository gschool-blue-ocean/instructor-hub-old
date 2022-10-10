import StudentMainBody from '../../components/student_page/StudentMainBody.js'
import { useRouter } from 'next/router.js'
import { useRecoilState } from "recoil";
import {studentIdState} from '../../components/state.js'


const student = () => {
  // if you cosole.log router it will tell you which student you clicked on
  const router = useRouter(); 
  console.log(router, 'here'); 
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  setStudentId(router.query.student); 


  return (
    <div>
        <StudentMainBody />
    </div>
  )
}

export default student