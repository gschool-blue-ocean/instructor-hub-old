import style from '../../../styles/StudentStatsRight.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useEffect, useState} from 'react'
import { studentTechSkillsState, studentTeamworkSkillsState, studentIdState, currentlearnAndLearnGradesState } from "../../state";
import { useRecoilState } from 'recoil';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatusRight = ({currentStudent}) => { 
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [studentTechSkills, setStudentTechSkills] = useRecoilState(studentTechSkillsState);
  
  const [teckSkill, setTeckSkill] = useState([]); 
  // console.log(studentTechSkills, 'here')


   let currTechSkills = studentTechSkills.filter(teckSkill => teckSkill.student_id == studentId); 
   let arrTeckSkills = currTechSkills.map((skill) => skill.score); 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        // if we want multiple options then we can display true here
        position: 'bottom',
        align:'center',
      },
      title: {
        display: true,
        text: 'Progress Over time',
        font: {size: 15},
      },
    },
    scales: {
      x:{
        grid:{
          display: false,
        }
      },
    }
  };

  const labels = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const data = {
    labels,
    datasets: [
      {
        label: 'TECH SKILLS',
        data: arrTeckSkills,
        borderColor: 'darkgreen',
        backgroundColor: 'green',
        tension: 0.4, 
        // pointRadius: 1, 
      },
      {
        label: 'Fake progress',
        data: [0,2,3,4,1,1],
        borderColor: 'darkblue',
        backgroundColor: 'blue',
        tension: 0.5, 
        // pointRadius: 1, 
      },
    ],
  };
  
  return (
    <div className={style.container}>
      <div className={style.graphCon}>
        <Line className={style.graph}  options={options} data={data} />
      </div>
      <div className={style.avrgScoreCon}>
        <div className={style.averages}>
          <span>Tech Avg</span>
          <div>{currentStudent.tech_avg}%</div>
        </div>
        <div className={style.averages}>
          <span>Learn Avg</span>
          <div>{currentStudent.learn_avg}%</div>
        </div>
        <div className={style.averages}>
          <span>TeamWork Avg</span>
          <div>{currentStudent.teamwork_avg}%</div>
        </div>
      </div>
    </div>
  )
}

export default StatusRight
