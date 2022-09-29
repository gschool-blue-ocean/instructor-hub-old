import React from 'react'
import studentStlye from '../../../styles/StudentSummary.module.css'

const StudentSummary = () => {

  return (
    <div className = {studentStlye.border}>
      <div>
        <div className = {studentStlye.topBorder}>
          <div className = {studentStlye.selectRow}>
            <div className = {studentStlye.selectAllBox}>
              <input className= {studentStlye.checkBox} type= "checkbox" name= "selectAll"/>
                <label htmlFor = "selectMe"> Select/Deselect All</label>
            </div>
            <div className = {studentStlye.addGit}>
              <a className = {studentStlye.gitBtn}>
                <span>Github Accounts</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSummary