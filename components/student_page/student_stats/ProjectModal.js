import style from '../../../styles/StudentPModal.module.css'
import {projectsState} from "../../state";
import { useRecoilState } from "recoil";
import React, { useState } from "react";

const ProjectModal = ({showProjModal, currentStudent, onClose}) => {

  const [projects, setProjects] = useRecoilState(projectsState);
  const [projSelected, setProjSelected] = useState(''); 


  const addProject = () => {

  }
  const selectedOpt = (e) => {
    console.log(e.target.value, 'here'); 
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
                      { projects.map(proj => (
                          <option key={proj.project_id} value={proj.project_name}>{proj.project_name}</option>
                      ))
                      }
                    </select>
                  </div>
                  <div>
                    <select id='select' type='select'>
                      <option value={true}>Passed</option>
                      <option value={false}>Failed</option>
                    </select>
                  </div>
                  <div>
                    <textarea></textarea>
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
