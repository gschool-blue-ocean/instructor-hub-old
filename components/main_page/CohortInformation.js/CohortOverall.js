import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import overallStyles from "../../../styles/CohortOverall.module.css";
import UpdateModal from "./UpdateModal";
import { studentsState } from "../../state.js";
import { useRecoilState } from "recoil";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const CohortOverall = ({ children }) => {
  const [techAvg, setTechAvg] = useRecoilState(studentsState);
  const [teamAvg, setTeamAvg] = useRecoilState(studentsState);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState({});

  const openUpdateModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  // *The GRAPH - using ChartJS, we want it to be
  // dynamic, responsive to changes in the
  // cohort averages.
  // *Need to make sure I'm bringing in averaged data
  // for cohorts as state, I think.
  // *Graph as its own sub-component?

  const options = {
    // "x" by default, setting to "y" makes the graph horizontal
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    // auto-scales by default, defining min max to not be stupid
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    //"responsive" graph
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        display: true,
      },
      title: {
        display: false,
        text: "Cohort Averages",
      },
    },
  };

  const data = {
    labels: ["Cohort Averages"],
    datasets: [
      {
        label: "Tech Avg",
        data: [techAvg.learn_avg],
        borderColor: "black",
        backgroundColor: ["rgba(53, 162, 235, 0.5"],
      },
      {
        label: "Team Avg",
        data: [teamAvg.soft_skills],
        borderColor: "black",
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
    hoverOffset: 4,
  };

  return (
    <div className={overallStyles.overallBorder}>
      <div className={overallStyles.graphContainer}>
        <div className={overallStyles.barHolder}>
          <Bar data={data} options={options} width={100} height={200} />
        </div>
      </div>
      {/* <button
        id="techRandomizerButton"
        onClick={() => setTechAvg(() => randomizer)}
      >
        Randomize Cohort Tech Average
      </button>
      <button
        id="teamRandomizerButton"
        onClick={() => setTeamAvg(() => randomizer)}
      >
        Randomize Cohort Team Average
      </button> */}
      <div className={overallStyles.btnContainer}>
        <div className={overallStyles.textContent}>
          <div className={overallStyles.link}>
            <u onClick={openUpdateModal}>Weekly Update</u>
          </div>
          <UpdateModal
            showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            onClose={() => {
              setShowUpdateModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CohortOverall;
