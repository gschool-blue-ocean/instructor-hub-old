import style from '../../../styles/StudentPModal.module.css'
import {learnState, currentlearnAndLearnGradesState,studentIdState} from "../../state";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import axios from 'axios';

const AssessModal = ({showAssessModal, onClose }) => {

  const [learn, setLearn] = useRecoilState(learnState);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [currentLearnAndLearnGrades, setCurrentLearnAndLearnGrades] = useRecoilState(currentlearnAndLearnGradesState);
  const [score, setScore] = useState(''); 
  const [assessId, setAssessId] = useState(''); 
  console.log(currentLearnAndLearnGrades, 'here');

  let assessmentId = Number(assessId)
  let assessScore = Number(score)

  const addAssesment = () => {
    axios.post('/api/learnGrades', {
      "student_id": studentId,
      "assessment_id": assessmentId,
      "assessment_grade":assessScore
    }).then(
      axios.get(`/api/learnAndLearnGradesId/${studentId}`).then((res) => {
        setCurrentLearnAndLearnGrades(res.data);
      })
    )
  }


  return (
    <>
    { showAssessModal ?
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
                  {/* <div>Assesment</div>  */}
                  <div className={style.selectAssess}>
                    <label>Assesment</label>
                    <select id='select' type='select' onChange={(e) => setAssessId(e.target.value)} >
                      <option>Select</option>
                      { learn.map(assess => (
                          <option key={assess.assessment_id} value={assess.assessment_id}>{assess.assessment_name}</option>
                      ))
                      }
                    </select>
                  </div>
                  <div className={style.selectScore}>
                    <label>SCORE</label>
                   <input onChange={(e) => setScore(e.target.value)} type='number' />
                  </div>
                  <div>
                    <button onClick={addAssesment}>submiit</button>
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

export default AssessModal
