import studentStyle from '../../../styles/StudentSummary.module.css'
import gitStyle from '../../../styles/GitHub.module.css'
import React, { useState, useEffect } from "react"


const StudentSummary = () => {
  const [showGitHub, setShowGitHub] = useState(false);

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
                <span onClick= {() => setShowGitHub(true)} className ={` ${studentStyle.gitBtn_medium} ${studentStyle.span}`}>Github Accounts</span>
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
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className= {studentStyle.header} scope= "col">Technical Skills
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className= {studentStyle.header} scope= "col">Progress
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className= {studentStyle.header} scope= "col">Comments
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className= {studentStyle.header} scope= "col"></th>
                </tr>
              </thead>
              <tbody className= {studentStyle.tbody}>
                <tr className= {studentStyle.tbodyRow} >
                  <td><input type = "checkbox" name = "row1"></input></td>
                  <td className= {studentStyle.content}>student1</td>
                  <td className= {studentStyle.content}>04/100</td> 
                  <td className= {studentStyle.content}>Responsive</td>
                  <td className= {studentStyle.content}>
                    <img src="https://flyclipart.com/transparent-homework-png-homework-clipart-transparent-866722"/>
                  </td>
                  <td>
                    <svg className= {studentStyle.dot}>
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                    </svg>
                  </td> 
                </tr>
                
                <tr className= {studentStyle.tbodyRow} >
                  <td><input type = "checkbox" name = "row2"></input></td>
                  <td className= {studentStyle.content}>student2</td>
                  <td className= {studentStyle.content}>70/100</td> 
                  <td className= {studentStyle.content}>Responsive</td>
                  <td className= {studentStyle.content}>
                    <img src="https://flyclipart.com/transparent-homework-png-homework-clipart-transparent-866722"/>
                  </td> 
                  <td>
                    <svg className= {studentStyle.dot}>
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                    </svg>
                  </td> 
                </tr>
                <tr className= {studentStyle.tbodyRow} >
                  <td><input type = "checkbox" name = "row3"></input></td>
                  <td className= {studentStyle.content}>student3</td>
                  <td className= {studentStyle.content}>95/100</td> 
                  <td className= {studentStyle.content}><div className={studentStyle.color2}>On Track</div></td>
                  <td className= {studentStyle.content}>Click Me</td> 
                </tr>
                <tr className= {studentStyle.tbodyRow} >
                  <td><input type = "checkbox" name = "row3"></input></td>
                  <td className= {studentStyle.content}>student4</td>
                  <td className= {studentStyle.content}>95/100</td> 
                  <td className= {studentStyle.content}><div className={studentStyle.color3}>At Risk</div></td>
                  <td className= {studentStyle.content}>Click Me</td> 
                </tr>
                <tr className= {studentStyle.tbodyRow} >
                  <td><input type = "checkbox" name = "row3"></input></td>
                  <td className= {studentStyle.content}>student5</td>
                  <td className= {studentStyle.content}>95/100</td> 
                  <td className= {studentStyle.content}><div className={studentStyle.color}>Behind</div></td>
                  <td className= {studentStyle.content}>Click Me</td> 
                </tr>
                <tr className= {studentStyle.tbodyRow} >
                  <td><input type = "checkbox" name = "row3"></input></td>
                  <td className= {studentStyle.content}>student6</td>
                  <td className= {studentStyle.content}>95/100</td> 
                  <td className= {studentStyle.content}><div className={studentStyle.color2}>On Track</div></td>
                  <td className= {studentStyle.content}>Click Me</td> 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showGitHub ? (
        <div>
          <div className= {gitStyle.gitContainer}>
            <div>
             <div className= {gitStyle.listHeader}>
              <div>
                <div className= {gitStyle.headerInfo}>
                  <div className= {gitStyle.info}>
                    <svg className= {gitStyle.personIcon}>
                      <path fillRule="evenodd" d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm.061 3.073a4 4 0 10-5.123 0 6.004 6.004 0 00-3.431 5.142.75.75 0 001.498.07 4.5 4.5 0 018.99 0 .75.75 0 101.498-.07 6.005 6.005 0 00-3.432-5.142z"></path>
                    </svg> 
                    " 0 members "
                  </div>
                </div>
              </div>
             </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default StudentSummary