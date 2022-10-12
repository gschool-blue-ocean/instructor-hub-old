import spacerStyle from '../../../styles/CohortSpacer.module.css'
import { useEffect, useState } from 'react'
import NewCohortModal from './NewCohortModal'
import { useRecoilState } from "recoil";
import { cohortsState, currentCohortState, usersState } from "../../state.js";

const CohortSpacer = () => {
  const [newCohortModal, showNewCohortModal] = useState(false)
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState)
  const [user, setUser] = useRecoilState(usersState)

  useEffect(() => {
    if (user) {
      setCurrentCohort(user.default_cohort)
    }
  }, [])


  useEffect(() => {
    // When currentCohort changes, i.e. via the select cohort feature, logs the current cohort name and object
    console.log(currentCohort)
    console.log(cohorts.filter(current => current.name === currentCohort)[0])
  }, [currentCohort])

  const newCohort = () => {
    showNewCohortModal(!newCohortModal)
  }

  return (
    <>
      <div className = {spacerStyle.spacerContainer}>
        <a className = {spacerStyle.gitBtn}>
          <span onClick={newCohort} className ={` ${spacerStyle.gitBtn_medium} ${spacerStyle.span}`}>Add Cohort</span>
        </a>
        <select id='select' className={spacerStyle.cohort} type='select' name='cohort' value={currentCohort} onChange={(e) => setCurrentCohort(e.target.value)}>
          <option value={currentCohort} selected>{currentCohort}</option>
          {cohorts.filter(current => current.name !== currentCohort).map(filteredCohort => (
            <option key={filteredCohort.cohort_id} value={filteredCohort.name}>{filteredCohort.name}</option>
          ))}
        </select>
      </div>
      <NewCohortModal
      showNewCohortModal={showNewCohortModal}
      newCohortModal={newCohortModal}
      onClose={() => {
        showNewCohortModal(false);
      }}/>
    </>
  )
}

export default CohortSpacer