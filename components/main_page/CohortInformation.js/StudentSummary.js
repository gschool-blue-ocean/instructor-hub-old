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
        <div className= {studentStlye.middleBorder}>
          <table className= {studentStlye.table}>
            <thread>
              <tr>
                <th className= {studentStlye.topColumn}>Name</th>
                {/* <th className= {studentStlye.topColumn}>Grade</th> */}
                <th className= {studentStlye.topColumn}>Tech Skill</th>
                <th className= {studentStlye.topColumn}>Progess</th>
                <th className= {studentStlye.topColumn}>Comments</th>
                <th className= {studentStlye.topColumn}></th>
              </tr>
            </thread>
              <tbody>
                <tr>
                  <td className= {studentStlye.row}>
                    <div className= {studentStlye.nameColumn}>
                      <input type="checkbox" name= "student"/>
                        <label htmlFor = "student">Chuck Tanza</label>
                    </div>
                  </td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentSummary