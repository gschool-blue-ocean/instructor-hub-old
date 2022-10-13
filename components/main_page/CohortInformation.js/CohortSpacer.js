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
  // const [asana_access_token, setAsana_Access_Token] = useRecoilState(accessToken)

  useEffect(() => {
    if (user) {
      setCurrentCohort(user.default_cohort)
    }
  }, [])

  useEffect(() => {
    console.log(cohorts)
  }, [cohorts])

  useEffect(() => {
    // When currentCohort changes, i.e. via the select cohort feature, logs the current cohort name and object
    console.log(currentCohort)
    console.log(cohorts.filter(current => current.name === currentCohort)[0])
  }, [currentCohort])

  const syncCohorts = () => {
    console.log(cohorts)
    axios.get('https://app.asana.com/api/1.0/projects/', {
      headers: {
          Authorization: `Bearer ${user.asana_access_token}`,
        },
    }).then((res) => {
        let asanaCohorts = res.data.data
        console.log(asanaCohorts)
        // WORK IN PROGRESS, POST REQUEST DOES NOT WORK
        // for (let cohort of asanaCohorts) {
          // if (cohorts.filter(current => current.gid !== cohort.gid)) {
            axios.post('/api/cohorts', {
              // "name": "blahblah",
              // "begin_date": "",
              // "end_date": "",
              // "instructor": "",
              // "cohort_avg": null,
              // "cohort_min": null,
              // "cohort_max": null,
              // "gid": "69420"
            })
          // }
        // }
    })

  }

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