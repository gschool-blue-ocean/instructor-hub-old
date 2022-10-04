import { useState } from 'react'
import style from '../../../styles/StudentStatsLeft.module.css'
import { useRecoilState } from 'recoil'
import { studentsState } from '../../state'

const StudentStatsLeft = () => {
  const [overallRating, setOverallRating] = useState(0)
  const [technicalRating, setTechnicalRating] = useState(0)
  const [softSkillsRating, setSoftSkillsRating] = useState(0)
  const [students, setStudents] = useRecoilState(studentsState);

  return (
    <div className={style.leftMainDiv}>
      <div className={style.nameDiv}>
        <img src="https://www.nicepng.com/png/detail/163-1630351_report-abuse-rem-re-zero-chibi.png" className={style.profilePic}/>
        <div className={style.name}>
          student name
        </div>
      </div>
      <div className={style.gitHub}>GitHub username</div>
      <div className={style.date}>TransitionDate</div>
      <div className={style.ratings}>
        <div>{`Student's overall rating: ${overallRating}`}</div>
        <div>{`Student's cumulative technical rating: ${technicalRating}`}</div>
        <div>{`Student's cumulative teamwork rating: ${softSkillsRating}`}</div>
      </div>
    </div>
  )
}

export default StudentStatsLeft