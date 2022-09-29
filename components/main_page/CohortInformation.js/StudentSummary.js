import React from 'react'
import studentStlye from '../../../styles/StudentSummary.module.css'

const StudentSummary = () => {

  return (
    <div className = {studentStlye.border}>
      <div className = {studentStlye.topBorder}>Student Summary</div>
    </div>
  )
}

export default StudentSummary