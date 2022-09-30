import { useState } from 'react'

const StudentStatsLeft = () => {
  const [overallRating, setOverallRating] = useState(0)
  const [technicalRating, setTechnicalRating] = useState(0)
  const [softSkillsRating, setSoftSkillsRating] = useState(0)
  
  return (
    <div>
      <div>This is for the Students Name</div>
      <div>GitHub username</div>
      <div>TransitionDate</div>
      <div>
        <div>{`Student's overall rating: ${overallRating}`}</div>
        <div>{`Student's cumulative technical rating: ${technicalRating}`}</div>
        <div>{`Student's cumulative teamwork rating: ${softSkillsRating}`}</div>
      </div>
    </div>
  )
}

export default StudentStatsLeft