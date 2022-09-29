import StudentSummary from './CohortInformation.js/StudentSummary'
import CohortOveral from './CohortInformation.js/CohortOveral'
import CohortSpacer from './CohortInformation.js/CohortSpacer'
import containerStyles from '../../styles/CohortContainer.module.css'

const CohortContainer = () => {
  return (
    <div className = {containerStyles.container} >
      <CohortSpacer />
      <CohortOveral />
      <StudentSummary />
    </div>
  )
}

export default CohortContainer