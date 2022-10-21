import StudentMainBody from '../../components/student_page/StudentMainBody.js'
import { useRecoilState } from "recoil";
import {studentIdState} from '../../components/state.js'
import { useLayoutEffect } from 'react';


const Student = () => {

  return (
    <div>
        <StudentMainBody />
    </div>
  )
}

export default Student