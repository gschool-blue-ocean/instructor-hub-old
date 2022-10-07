import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/UpdateModal.module.css";

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, onClose }) => {
  const [modal, setModal] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({})
  const [techSkillGid, setTechSkillGid] = useState(null)
  const [teamWorkGid, setTeamWorkGid] = useState(null)
  const [studentList, setStudentList] = useState([])
  // This will likely be replaced by some value grabbed from state/Recoil.
  const cohort = {}; //obsolete now? oct 5th, sam chavez
 
  // In addition, it will be necessary to grab
  // "current student" from state.


  useEffect(() => { 
    axios.get("https://app.asana.com/api/1.0/projects/1203082294663367" , {
      headers: {
        Authorization: "Bearer 1/1202490391764279:bea7f8d535303444d7b1aa5e74101eec",
      }
    })
    .then((res) => {
      setTechSkillGid(res.data.data.custom_field_settings[0].custom_field.gid)
      setTeamWorkGid(res.data.data.custom_field_settings[1].custom_field.gid)
    })
    axios.get("https://app.asana.com/api/1.0/tasks/?project=1203082294663367", {
      headers: {
        Authorization: "Bearer 1/1202490391764279:bea7f8d535303444d7b1aa5e74101eec",
      }
    })
    .then((res) => {
      setStudentList(res.data.data)
    })
    console.log(studentList)
}, [])

  async function submitHandler(e) {
    e.preventDefault(); 
    const target = e.target; 
    console.log(studentList, "student list in state")
    console.log(techSkillGid, "tech gid state")
    console.log(teamWorkGid, "team work gid state")
    let formData = new FormData(target);
    let student = { studentInfo: {} };
    for (const pair of formData.entries()) {
      student.studentInfo[pair[0]] = pair[1];
    }
    cohort = { ...student };
    setUpdatedInfo(student)
    setTimeout(() => {
    }, 100)



const studentGid = studentList[0].gid
     axios({
        method:"PUT",
        url: `https://app.asana.com/api/1.0/tasks/${studentGid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this
        headers: {
          Authorization: "Bearer 1/1202490391764279:bea7f8d535303444d7b1aa5e74101eec",
        }, 
          data: { 
            data: {
              "workspace": "1213745087037",
              "assignee_section": null,
              // "notes": `${updatedInfo.studentInfo.assessmentName}: ${updatedInfo.studentInfo.assessmentScore}`,
              "parent": null,
              "html_notes": "<p>this is a note</p>",
              "resource_subtype": "default_task",
              "custom_fields": {
                [techSkillGid]: `${updatedInfo.studentInfo.Tech}`,  //template literal
                [teamWorkGid]: `${updatedInfo.studentInfo.Team}`   //template literal
        }
      }
      }
    })    
  };

  async function asanaPost() {
    console.log(updatedInfo, "my post func")
}


  //TECH skills below
  const exceedsStandards = "1203082294663378"
  const fullyMeetsStandards = "1203082294663379"
  const approachingStandards = "1203082294663380"
  const notApproachingStandards = "1203082294663381"

  //TEAMWORK skills below
  const teamExceeds = "1203082294663385"
  const teamFullyMeetsStandards = "1203082294663386"
  const teamApproaching = "1203082294663387"
  const teamNotYet = "1203082294663388"
  return (
    <>
      {showUpdateModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />

          <div className={styles.UpdateModal}>
            <div className={styles.header}>
              Update - Students Name
              <button className={styles.button} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.update}>
              <p>
                Tab select between Technical Ability, Teamwork Ability, and
                Notes. Use number keys to select aptitude, hit Enter to move to
                next student.
              </p>
              <form onSubmit={submitHandler}>
                <label htmlFor="Tech">Technical Aptitude</label> <br />
                <select id="Tech" name="Tech" required>
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  <option value={`${notApproachingStandards}`}>
                    1 - Needs improvement
                  </option>
                  <option value={`${approachingStandards}`}>
                    2 - Approaching standard
                  </option>
                  <option value={`${fullyMeetsStandards}`}>3 - Meets standard</option>
                  <option value={`${exceedsStandards}`}>
                    4 - Exceeds standard
                  </option>
                </select>{" "}
                <br />
                <label htmlFor="Team">Teamwork Aptitude</label> <br />
                <select id="Team" name="Team" required>
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  <option value={`${teamNotYet}`}>
                    1 - Needs improvement
                  </option>
                  <option value={`${teamApproaching}`}>
                    2 - Approaching standard
                  </option>
                  <option value={`${teamFullyMeetsStandards}`}>3 - Meets standard</option>
                  <option value={`${teamExceeds}`}>
                    4 - Exceeds standard
                  </option>
                </select>{" "}
                <br />
                <label htmlFor="assessmentName">Assement Name:</label>
                <br />
                <input name="assessmentName" placeholder="Enter assessment name"></input>
                <br />
                <label htmlFor="assessmentScore">Score:</label>
                <br />
                <input name="assessmentScore" placeholder="Enter score"></input>
                <br />
                <label htmlFor="Notes">Notes</label> <br />
                <textarea
                  id="Notes"
                  name="Notes"
                  rows="10"
                  cols="30"
                  required
                ></textarea>{" "}
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateModal;
