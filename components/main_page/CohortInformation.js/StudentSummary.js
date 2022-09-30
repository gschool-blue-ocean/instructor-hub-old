import React from 'react'
import studentStyle from '../../../styles/StudentSummary.module.css'

const StudentSummary = () => {

  return (
    <div className = {studentStyle.border}>
      <div>
        <div className = {studentStyle.topBorder}>
          <div className = {studentStyle.selectRow}>
            <div className = {studentStyle.selectAllBox}>
              <input className= {studentStyle.checkBox} type= "checkbox" name= "selectAll"/>
                <label htmlFor = "selectMe"> Select/Deselect All</label>
            </div>
            <div className = {studentStyle.addGit}>
              <a className = {studentStyle.gitBtn}>
                <span>Github Accounts</span>
              </a>
            </div>
          </div>
        </div>
        <div className= {studentStyle.middleBorder}>
          <div className= {studentStyle.topRow}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSummary