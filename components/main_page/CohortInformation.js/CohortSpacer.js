import spacerStyle from "../../../styles/CohortSpacer.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  cohortsState,
  currentCohortState,
  usersState,
  studentsState,
} from "../../state.js";
import axios from "axios";

const CohortSpacer = () => {
  
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [students, setStudents] = useRecoilState(studentsState);
  const [user, setUser] = useRecoilState(usersState);
  const [cohortId, setCohortId] = useState(0);
  const [cohortName, setCohortName] = useState('')

  useEffect(() => {
    if (user) {
      setCurrentCohort(user.default_cohort);
    }
  }, [user]);

  // useEffect(() => {
  //   if (currentCohort) {
  //     let filterId = cohorts.filter((cohort) => currentCohort === cohort.name)
  //     setCohortId(filterId.cohort_id);
  //   }  
  // }, [currentCohort]);
  console.log("cohorts:", cohorts)
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
      console.log("cohorts:", cohorts)
      console.log("res.data:", res.data)
      res.data.data.forEach((asanaCohort) => {
        const found = cohorts.find((element) => element.gid === asanaCohort.gid);
       console.log("currentCohort:", currentCohort)
        if (found) {
          console.log(asanaCohort, "success, cohorts will be added to our database");
          axios.get("/api/cohorts")
          .then((res) => {
            const currentCohortId = res.data.filter((cohortid) => cohortid.name === currentCohort)
            console.log("currentCohortId:", currentCohortId)
            if(currentCohortId && !cohortId && currentCohortId[0].name === currentCohort) 
            console.log("res.data:", res.data)
            setCohortId(currentCohortId[0].cohort_id)
            console.log(currentCohortId[0].cohort_id) 
            // console.log(currentCohort)
          })
        } else {
          console.error("failed")
        }
        // this axios request looks at the students in our database and adds new students from the asana database
        axios.get(`https://app.asana.com/api/1.0/tasks/?project=${asanaCohort.gid}`, {
          headers: {
            Authorization: `Bearer ${user.asana_access_token}`,
          },
        }).then((res) => {
          res.data.data.forEach((asanaStudent) => {
            console.log(currentCohort)
            const found = students.find((element) => element.gid === asanaStudent.gid);
            if (found === undefined && cohortId && asanaCohort.name === currentCohort) {
              axios.put("/api/students", {
                name: `${asanaStudent.name}`,
                cohort: `${asanaCohort.name}`,
                gid: `${asanaStudent.gid}`,
                cohort_id: cohortId
              }).then((res) => {
                setStudents((prev) => [...prev, ...res.data])
                setCohortId(0)
              });
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
    </>
  );
};

export default CohortSpacer;
