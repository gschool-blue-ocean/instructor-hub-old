import StudentSummary from "./CohortInformation.js/StudentSummary";
import CohortOverall from "./CohortInformation.js/CohortOverall";
import CohortSpacer from "./CohortInformation.js/CohortSpacer";
import containerStyles from "../../styles/CohortContainer.module.css";

const CohortContainer = () => {
  return (
    <div className={containerStyles.container}>
      <CohortSpacer />
      <CohortOverall />
      <StudentSummary />
    </div>
  );
};

export default CohortContainer;
