import spacerStyle from '../../../styles/CohortSpacer.module.css'
import { useEffect, useState } from 'react'
// import NewCohortModal from './NewCohortModal'
import { useRecoilState } from "recoil";
import { cohortsState, currentCohortState, usersState, accessToken } from "../../state.js";
import axios from 'axios'

const CohortSpacer = () => {
  // const [newCohortModal, showNewCohortModal] = useState(false)
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState)
  const [user, setUser] = useRecoilState(usersState)
  // const [asanaCohorts, setAsanaCohorts] = useState([])
  // const [asana_access_token, setAsana_Access_Token] = useRecoilState(accessToken)

  useEffect(() => {
    if (user) {
      setCurrentCohort(user.default_cohort)
    }
  }, [])

  // useEffect(() => {
  //   console.log(cohorts)
  // }, [cohorts])

  // useEffect(() => {
  //   // When currentCohort changes, i.e. via the select cohort feature, logs the current cohort name and object
  //   console.log(currentCohort)
  //   console.log(cohorts.filter(current => current.name === currentCohort)[0])
  // }, [currentCohort])

  const syncCohorts = () => {
    axios.get("/api/cohorts").then((res) => setCohorts(res.data))
    console.log(cohorts, "first")
    syncronize();
  }

  function syncronize (){
    console.log(cohorts, "second")
      axios.get('https://app.asana.com/api/1.0/projects/', {
      headers: {
          Authorization: `Bearer ${user.asana_access_token}`,
        },
    // }).then((res) => setAsanaCohorts(res.data.data))
      })
    .then((res) => { 
      // console.log(cohorts,"updated cohorts", res.data.data)
      (res.data.data).forEach((asanaCohort) =>{
        const found = cohorts.find(element => element.gid === asanaCohort.gid)
        console.log(found, "found")
        if(found === undefined){
          console.log(asanaCohort,"success")
          axios.put('/api/cohorts', {
            "name": `${asanaCohort.name}`,
            "gid": `${asanaCohort.gid}`
          })
        }else{
          console.log("failed")
        }
      })
    })
  }
    
    // WORK IN PROGRESS, POST REQUEST DOES NOT WORK   
    //   console.log(blah, "should be new additions to table")
      
    //   blah.forEach(classes =>{
    //     axios.put('/api/cohorts', {
    //       "name": `${classes.name}`,
    //       "gid": `${classes.gid}`
    //     })
    //   })
    // })

  return (
    <>
      <div className = {spacerStyle.spacerContainer}>
        <a className = {spacerStyle.gitBtn}>
          <span onClick={syncCohorts} className ={` ${spacerStyle.gitBtn_medium} ${spacerStyle.span}`}>Sync Cohorts</span>
        </a>
        <select id='select' className={spacerStyle.cohort} type='select' name='cohort' value={currentCohort} onChange={(e) => setCurrentCohort(e.target.value)}>
          <option value={currentCohort} selected>{currentCohort}</option>
          {cohorts.filter(current => current.name !== currentCohort).map(filteredCohort => (
            <option key={filteredCohort.cohort_id} value={filteredCohort.name}>{filteredCohort.name}</option>
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
  )
}

export default CohortSpacer