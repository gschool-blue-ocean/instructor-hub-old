import { useState } from "react";
import { useRecoilState } from "recoil";
import { studentsState, studentIdState, studentTechSkillsState, studentTeamworkSkillsState } from "../../state.js";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import graphStyle from "../../../styles/GraphModal.module.css";
import { Line } from 'react-chartjs-2';
import axios from "axios";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const GraphModal = ({ studentGraph, showGraphModal, setShowGraphModal, onClose }) => {
    const [students, setStudents] = useRecoilState(studentsState);
    const [studentTechSkills, setStudentTechSkills] = useRecoilState(studentTechSkillsState);
    const [studentTeamworkSkills, setStudentTeamworkSkills] = useRecoilState(studentTeamworkSkillsState);
    const [studentId, setStudentId] = useRecoilState(studentIdState);

    // console.log(studentGraph)

    let currTechSkills = studentTechSkills.filter(teckSkill => teckSkill.student_id == studentGraph.student_id); 
    let arrTeckSkills = currTechSkills.map((skill) => skill.score); 
    let currTeamSkills = studentTeamworkSkills.filter(teamSkill => teamSkill.student_id == studentGraph.student_id); 
    let arrTeamSkills = currTeamSkills.map((skill) => skill.score);

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
    
      const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
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
            label: 'TEAM SKILLS',
            data: arrTeamSkills,
            borderColor: 'darkblue',
            backgroundColor: 'blue',
            tension: 0.5, 
            // pointRadius: 1, 
          },
        ],
      };
   
    return (
      <>
    {showGraphModal ? (
        <div>
            <div className={graphStyle.background} onClick={onClose}></div>
            <div className={graphStyle.container}>
                <div className={graphStyle.topBar}></div>
                    <div>
                        <div className={graphStyle.topContainer}>
                            <div>
                                <div onClick={onClose} className={graphStyle.close}></div>
                                <div className={graphStyle.name}>{studentGraph.name}</div>
                            </div>
                        <div className= {graphStyle.outerContainer}>
                            <div className={graphStyle.graphContainer}>
                                <Line className={graphStyle.graph} option= {options} data= {data}></Line>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null}
      </>
    );
  };
  
  export default GraphModal;