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
                <span className ={` ${studentStyle.gitBtn_medium} ${studentStyle.span}`}>Github Accounts</span>
              </a>
            </div>
          </div>
        </div>
        <div className= {studentStyle.middleBorder}>
          <div className= {studentStyle.tablebox}>
            <table className= {studentStyle.table}>
              <thead className= {studentStyle.thead}>
                <tr className= {studentStyle.headerRow}>
                  <th></th>
                  <th className= {studentStyle.header} scope= "col">Name
                    <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/>
                  </th>
                  <th className= {studentStyle.header} scope= "col">Technical Skills
                    <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/>
                  </th>
                  <th className= {studentStyle.header} scope= "col">Progress
                    <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/>
                  </th>
                  <th className= {studentStyle.header} scope= "col">Comments
                    <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/>
                  </th>
                  <th className= {studentStyle.header} scope= "col"></th>
                </tr>
              </thead>
              <tbody className= {studentStyle.tbody}>
                <tr className= {studentStyle.tbodyRow}>
                  <td><input type = "checkbox" name = "row1"></input></td>
                  <td className= {studentStyle.content}>student1</td>
                  <td className= {studentStyle.content}>04/100</td> 
                  <td className= {studentStyle.content}>Responsive</td>
                  <td className= {studentStyle.content}>Click Me</td> 
                </tr>
                <tr className= {studentStyle.tbodyRow}>
                  <td><input type = "checkbox" name = "row2"></input></td>
                  <td className= {studentStyle.content}>student2</td>
                  <td className= {studentStyle.content}>70/100</td> 
                  <td className= {studentStyle.content}>Responsive</td>
                  <td className= {studentStyle.content}>Click Me</td> 
                </tr>
                <tr className= {studentStyle.tbodyRow}>
                  <td><input type = "checkbox" name = "row3"></input></td>
                  <td className= {studentStyle.content}>student3</td>
                  <td className= {studentStyle.content}>95/100</td> 
                  <td className= {studentStyle.content}>Responsive</td>
                  <td className= {studentStyle.content}>Click Me</td> 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSummary