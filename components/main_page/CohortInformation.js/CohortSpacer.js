import spacerStyle from '../../../styles/CohortSpacer.module.css'
import { useState } from 'react'
import NewCohortModal from './NewCohortModal'

const CohortSpacer = () => {
  const [newCohortModal, showNewCohortModal] = useState(false)

  const newCohort = () => {
    showNewCohortModal(!newCohortModal)
  }

  return (
    <>
      <div className = {spacerStyle.spacerContainer}>
        <a className = {spacerStyle.gitBtn}>
          <span onClick={newCohort} className ={` ${spacerStyle.gitBtn_medium} ${spacerStyle.span}`}>Add Cohort</span>
        </a>
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