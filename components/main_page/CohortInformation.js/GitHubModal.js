import { useState } from "react";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import { studentIdState, studentsState, currentCohortState, cohortsState } from "../../state.js";
import gitStyle from "../../../styles/GitHub.module.css";
import Image from "next/image";
import axios from "axios";

const GitHubModal = ({ showGitHubModal, setShowGitHubModal, onClose }) => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [isEditing, setIsEditing] = useState(false);
  const [githubAccount, setGithubAccount] = useState(null);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState)

  // Allows the cohorts to be filter 
  let course = students.filter(classRoom => classRoom.cohort == currentCohort)
  // edit github account
  const patchGithub = (e) => {
    let value = e.target.value
    axios.patch(`/api/students/${studentId}`, {
      "github": value
    })
      .then((updatedGithub) => {
        const indexOfGithubToUpdate = students.findIndex((student) => student.student_id === studentId);
        const updateGithub = [...students];
        updateGithub[indexOfGithubToUpdate] = updatedGithub;
        setStudents(updateGithub);
      });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    patchGithub(e);
    console.log("success")
  };

  const editGithub = (e) => {
    setGithubAccount(e.target.id)
    setIsEditing(true);
    
  }
  
  return (
    <>
      {showGitHubModal ? (
        <div>
          <div className={gitStyle.background} onClick={onClose}></div>
          <div className={gitStyle.gitContainer}>
            <div className={gitStyle.top_bar}></div>
            <div>
              <div className={gitStyle.listHeader}>
                <div>
                  <div className={gitStyle.headerInfo}>
                    <div className={gitStyle.info}>
                      <svg className={gitStyle.personIcon}>
                        <path
                          fillRule="evenodd"
                          d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm.061 3.073a4 4 0 10-5.123 0 6.004 6.004 0 00-3.431 5.142.75.75 0 001.498.07 4.5 4.5 0 018.99 0 .75.75 0 101.498-.07 6.005 6.005 0 00-3.432-5.142z"
                        ></path>
                      </svg>
                      {` ${course.length} Members`}
                    </div>
                  </div>
                  <div onClick={onClose} className={gitStyle.close}></div>
                </div>
              </div>
              <ul className={gitStyle.tableList}>
                {course.map((student) => (
                  <li className={gitStyle.tableListItem}>
                    <div className={gitStyle.tableListCell}>
                      <span className={gitStyle.frameLeft}>
                        <a className={gitStyle.frameInline} href="#">
                          <Image
                            src="/pic1.jpg"
                            height="44"
                            width="44"
                            className={gitStyle.avatar}
                          />
                        </a>
                      </span>
                    </div>
                    <div className={gitStyle.tableListName}>
                      <a className={gitStyle.frameInclineName}>
                        {student.name}
                      </a>
                      {isEditing && student.student_id == githubAccount ? 
                          <>
                           <input type="text" defaultValue={student.github} />
                            <button onClick={handleSubmit}>&#10004;</button>
                            <button onClick={() => setIsEditing(false)}>X</button>
                          </> 
                        :
                          <span className={gitStyle.codeName} id={student.student_id}
                          onDoubleClick={(e) => editGithub(e)}>
                           {student.github ? student.github : "Add Github"}
                          </span>
                      }                 
                    </div>
                  </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GitHubModal;
