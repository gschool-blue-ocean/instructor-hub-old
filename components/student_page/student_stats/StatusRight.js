import style from '../../../styles/StudentStatsRight.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useState} from 'react'
import { studentTechSkillsState, studentTeamworkSkillsState } from "../../state";
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

const StatusRight = () => { 
  const [studentTechSkills, setStudentTechSkills] = useRecoilState(studentTechSkillsState);
  const [studentTeamworkSkills, setStudentTeamworkSkills] = useRecoilState(studentTeamworkSkillsState);
  const [teckSkill, setTeckSkill] = useState([1, 3, 4, 2])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // if we want multiple options then we can display true here
        // positiomn: 'bottom',
        //align:'center',
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

  const labels = ['1', '2', '3', '4'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Fake progress',
        data: teckSkill,
        borderColor: 'darkblue',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4, 
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
          <span>Project Avg</span>
          <div>50%</div>
        </div>
        <div className={style.averages}>
          <span>Assesment Avg</span>
          <div>50%</div>
        </div>
        <div className={style.averages}>
          <span>Softskills Avg</span>
          <div>50%</div>
        </div>
      </div>
    </div>
  )
}

export default StatusRight
