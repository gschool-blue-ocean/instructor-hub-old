import spacerStyle from '../../../styles/CohortSpacer.module.css'

const CohortSpacer = () => {
  return (
    <div className = {spacerStyle.spacerContainer}>
      <div>
        <div className = {spacerStyle.centerContainer}>
          <div className = {spacerStyle.center}>
            <div className = {spacerStyle.newCohort_btn}>
              <a href="#">
                <span className = {spacerStyle.newCohort_btn}>New Cohort</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CohortSpacer