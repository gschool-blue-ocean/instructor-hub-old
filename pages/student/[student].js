import StudentMainBody from '../../components/student_page/StudentMainBody.js'
import { useRouter } from 'next/router.js'
import { useRecoilState } from "recoil";
import {studentIdState} from '../../components/state.js'
import { useLayoutEffect } from 'react';


const Student = () => { 
  const router = useRouter();  
 
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

export default Student