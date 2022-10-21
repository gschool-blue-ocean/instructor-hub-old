import style from '../../../styles/StudentPModal.module.css'
import {projectsState,currStudentProjectsState, studentIdState, currentStudentState, usersState} from "../../state";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const ProjectModal = ({showProjModal, setShowProjModal, onClose}) => {

  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [currStudentProjects, setCurrStudentProjects] = useRecoilState(currStudentProjectsState)
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [users, setUsers] = useRecoilState(usersState);
  const [projSelected, setProjSelected] = useState(0); 
  const [projGrade, setProjGrade] = useState([]); 
  const [projNotes, setProjNotes] = useState(''); 
  const [addProjName, setAddProjName] = useState(false); 
  const [newProjName, setNewProjectName] = useState(''); 

/*-----Converting string into Boolean and Number-----*/
  let grade = projGrade === 'true'

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post("/api/projects", {
      "project_name": newProjName, 
      "gid": null
    }).then((res) => {
      setProjSelected((prev) =>  res.data.project_id)
      const newPorject = [...projects, res.data]
      setProjects(newPorject);
    })
  }

  const addProject = () => {
      // let projectId = Number(projSelected)
      const selectedProjName = projects.find((project) => project.project_id === Number(projSelected))
        axios.post('/api/projectGrades', {
          "student_id": studentId,
          "project_id": Number(projSelected),
          "project_passed": grade, 
          "notes": `${projNotes}`
        })
        .then(() => {
          axios.get(`/api/projectsAndProjectGradesId/${studentId}`).then((res) => {
            setCurrStudentProjects(res.data);
          })
        }) 
    
        let instructorNotes = ''
        axios.get(`https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, {
          headers: {
            Authorization: `Bearer ${users.asana_access_token}`,
          }
        }).then((res) => {
          instructorNotes = res.data.data.notes

        }).then(() => { instructorNotes.length === 0 ? instructorNotes = "<u>Test Name: Test Score</u>" : null
          axios({
            method:"PUT",  //must be put method not patch
            url: `https://app.asana.com/api/1.0/tasks/${currentStudent.gid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this LOCAL DB NEEDED
            headers: {
              Authorization: `Bearer ${users.asana_access_token}`,  //need template literal for ALLLLL headers so global state dependant on user
            }, data: { 
                data: {
                  "workspace": "1213745087037",
                  "assignee_section": null,
                  "html_notes": `<body>${instructorNotes}\n ${selectedProjName.project_name.toUpperCase()}: ${grade ? "Passed" : "Failed"}</body>`, //need conditional or neeed to make this field mandatory
                  "parent": null,
                  "resource_subtype": "default_task",
                }
              }
          })
        })
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
                  <div className='hello'>
                    <h3>Add a Project</h3> 
                    <div className={style.section}>
                      <div className={style.lableContainer}>
                        <lable className={style.labels}>Name</lable>
                        <span onClick={() => setAddProjName(!addProjName)} className={style.addBtn} >&#10009;</span>
                      </div>
                      { addProjName ?
                      <form onSubmit={(e) => onSubmit(e)}>
                        <input onChange={(e) => setNewProjectName(e.target.value)}></input>
                      </form>
                      :
                      <select className={style.select}  id='select' type='select' onChange={(e) => setProjSelected(e.target.value)}>
                        <option>- Select -</option>
                        { projects.map(proj => (
                            <option key={proj.project_id} value={proj.project_id}>{proj.project_name}</option>
                        ))
                        }
                      </select>
                      }
                    </div>
                    <div className={style.section}>
                      <div className={style.lableContainer}>
                      <div className={style.lableContainer}>
                        <lable className={style.labels} >Score</lable>
                      </div>
                      </div>
                      <select  className={style.select}  id='select' type='select' onChange={(e) => setProjGrade(e.target.value)}>
                      <option>- Select -</option>
                        <option value={true}>Passed</option>
                        <option value={false}>Failed</option>
                      </select>
                    </div>
                    <div className={style.section}>
                      <div className={style.lableContainer}>
                      <label className={style.labels} >Notes</label>
                      </div>
                      <textarea className={style.input} onChange={(e) => setProjNotes(e.target.value)}></textarea>
                    </div>
                    <div className={style.btn}>
                      <button onClick={addProject}>submiit</button>
                    </div>
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
