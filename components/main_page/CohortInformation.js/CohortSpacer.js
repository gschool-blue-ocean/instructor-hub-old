import spacerStyle from "../../../styles/CohortSpacer.module.css";
import { useEffect, useState } from "react";
// import NewCohortModal from './NewCohortModal'
import { useRecoilState } from "recoil";
import {
  cohortsState,
  currentCohortState,
  usersState,
  accessToken,
  studentsState,
} from "../../state.js";
import axios from "axios";

const CohortSpacer = () => {
  // const [newCohortModal, showNewCohortModal] = useState(false)
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [students, setStudents] = useRecoilState(studentsState);
  const [user, setUser] = useRecoilState(usersState);
  // const [asanaCohorts, setAsanaCohorts] = useState([])
  // const [asana_access_token, setAsana_Access_Token] = useRecoilState(accessToken)

  useEffect(() => {
    if (user) {
      setCurrentCohort(user.default_cohort);
    }
  }, [user]);

  const syncCohorts = () => {
    //verifies that the cohorts set state matches what is in our database
    axios.get("/api/cohorts").then((res) => setCohorts(res.data));
    synchronize();
  };

  function synchronize() {
    //this axios request gets all cohorts associated with the user/user's asana token
    axios.get("https://app.asana.com/api/1.0/projects/", {
      headers: {
        Authorization: `Bearer ${user.asana_access_token}`,
      },
    }).then((res) => {
      //this goes through each cohort in the asana database and adds ones that do not exist in our database
      res.data.data.forEach((asanaCohort) => {
        const found = cohorts.find((element) => element.gid === asanaCohort.gid);
        if (found === undefined) {
          axios.put("/api/cohorts", {
            name: `${asanaCohort.name}`,
            gid: `${asanaCohort.gid}`,
          })
        } else {
          console.log("failed, cohorts are in our database");
        }
        // this axios request looks at the students in our database and adds new students from the asana database
        axios.get(`https://app.asana.com/api/1.0/tasks/?project=${asanaCohort.gid}`, {
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
        }).then((res) => {
          res.data.data.forEach((asanaStudent) => {
            const found = students.find((element) => element.gid === asanaStudent.gid);
            if (found === undefined) {
              axios.put("/api/students", {
                name: `${asanaStudent.name}`,
                cohort: `${asanaCohort.name}`,
                gid: `${asanaStudent.gid}`,
              }).then((res) => setStudents((prev) => [...prev, ...res.data]));
            }
          })

          //this looks at the students in our database and checks to see if they are in the asana database. If not then it removes it from our database
          //have someone check the logic of my axios.delete request
          // remainingStudents is an array that I will push all students that are in both local and asana databases
          students.forEach((localStudent) => {
            const studentInAsana = res.data.data.find((element) => element.gid === localStudent.gid);
            if (studentInAsana === undefined && localStudent.cohort === asanaCohort.name) {
              axios.delete(`/api/students/${localStudent.student_id}`).then((res) => {
                console.log(localStudent, "student that was not in asana")
              }).then(()=>{
                axios.get("/api/students").then((res) => setStudents(res.data.students))
              })
            }
          });
        });
      });
    });
  }

  return (
    <>
      <div className={spacerStyle.spacerContainer}>
        <a className={spacerStyle.gitBtn}>
          <span
            onClick={syncCohorts}
            className={` ${spacerStyle.gitBtn_medium} ${spacerStyle.span}`}
          >
            Sync Cohorts
          </span>
        </a>
        <select
          id="select"
          className={spacerStyle.cohort}
          type="select"
          name="cohort"
          value={currentCohort}
          onChange={(e) => setCurrentCohort((prev) => e.target.value)}
        >
          <option value={currentCohort} selected>
            {currentCohort}
          </option>
          {cohorts
            .filter((current) => current.name !== currentCohort)
            .map((filteredCohort) => (
              <option
                key={filteredCohort.cohort_id}
                value={filteredCohort.name}
              >
                {filteredCohort.name}
              </option>
            ))}
        </select>
      </div>
      {/* <NewCohortModal
      showNewCohortModal={showNewCohortModal}
      newCohortModal={newCohortModal}
      onClose={() => {
        showNewCohortModal(false);
      }}/> */}
    </>
  );
};

export default CohortSpacer;
