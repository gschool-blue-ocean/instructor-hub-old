import overallStyles from "../../../styles/CohortOverall.module.css";
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { studentsState } from '../../state'



const GroupMaker = () => {

    const [student, setStudent] = useRecoilState(studentsState);
    const [display, setDisplay] = useState('display here');
    const [groupSize, setGroupSize] = useState(false);
    const [toggle, setToggle] = useState(false);

    console.log(student);



    return (
      <div>
        <select id="dropdown">
          <option value="N/A">Group Size</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button>Create Groups</button>
      </div>
    )
}

export default GroupMaker