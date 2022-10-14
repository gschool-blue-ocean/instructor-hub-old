import StudentMainBody from '../../components/student_page/StudentMainBody.js'
import { useRouter } from 'next/router.js'
import { useRecoilState } from "recoil";
import {studentIdState} from '../../components/state.js'
import { useLayoutEffect } from 'react';


const Student = () => {
  // if you cosole.log router it will tell you which student is being pass through 
  const router = useRouter();  
  // we use recoil state here becuause we want to use the current studentid in layout component to make a get request for that student
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  setStudentId(router.query.student); 

  useLayoutEffect(()=>{
    const status = sessionStorage.getItem('logged_in_Status')
      if(!status){
        sessionStorage.clear();
        router.push("/")
      }
    },[])

  return (
    <div>
        <StudentMainBody />
    </div>
  )
}

export default student