import StudentSummary from "./CohortInformation.js/StudentSummary";
import CohortOverall from "./CohortInformation.js/CohortOverall";
import CohortSpacer from "./CohortInformation.js/CohortSpacer";
import containerStyles from "../../styles/CohortContainer.module.css";

const CohortContainer = () => {
  return (
    <div className={containerStyles.container}>
      <CohortSpacer />
      <div className= {containerStyles.container2}>
      <StudentSummary />
      <CohortOverall />
      </div>
    </div>
  );
};

export default CohortContainer;
