import style from '../../../styles/StudentPModal.module.css'
import {projectsState,currStudentProjectsState, studentIdState} from "../../state";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import axios from 'axios';

const ProjectModal = ({showProjModal, onClose}) => {

  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [currStudentProjects, setCurrStudentProjects] = useRecoilState(currStudentProjectsState)
  const [projSelected, setProjSelected] = useState(''); 
  const [projGrade, setProjGrade] = useState([]); 
  const [projNotes, setProjNotes] = useState(''); 

  

  let grade = projGrade === 'true'
  let projectId = Number(projSelected)
  // console.log(projectId,'here')


  const addProject = () => {
        // e.preventDefault(); 

    axios.post('/api/projectGrades', {
      "student_id": studentId,
      "project_id": projectId,
      "project_passed": grade, 
      "notes": `${projNotes}`
    })
    .then(() => {
      axios.get(`/api/projectsAndProjectGradesId/${studentId}`).then((res) => {
        setCurrStudentProjects(res.data);
        // console.log(res.data, 'new');
      })
    }
    ) 
  }


  return (
    <>
    { showProjModal ?
      <div>
        <div className={style.background} onClick={onClose}></div>
        <div className={style.container}>
          <div>
            <div onClick={onClose} className={style.close}></div>
          </div>
          <div className={style.body}>
            <div className={style.content}>
              <div className={style.border}>
                <div className={style.border2}>
                  <div>Add a Project</div> 
                  <div>
                    <select id='select' type='select' onChange={(e) => setProjSelected(e.target.value)}>
                      <option></option>
                      { projects.map(proj => (
                          <option key={proj.project_id} value={proj.project_id}>{proj.project_name}</option>
                      ))
                      }
                    </select>
                  </div>
                  <div>
                    <select id='select' type='select' onChange={(e) => setProjGrade(e.target.value)}>
                     <option></option>
                      <option value={true}>Passed</option>
                      <option value={false}>Failed</option>
                    </select>
                  </div>
                  <div>
                    <textarea onChange={(e) => setProjNotes(e.target.value)}></textarea>
                  </div>
                  <div>
                    <button onClick={addProject}>submiit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>   
      </div>
      : null
    }
    </>
  )
}

export default ProjectModal
