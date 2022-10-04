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

const CohortOverall = () => {
  const [techAvg, setTechAvg] = useState(70);
  const [teamAvg, setTeamAvg] = useState(30);

  // const randomizer = () => {
  //   const result = Math.floor(Math.random() * 100);
  //   return result;
  // };

  // *The GRAPH - using ChartJS, we want it to be
  // dynamic, responsive to changes in the
  // cohort averages.
  // *Need to make sure I'm bringing in averaged data
  // for cohorts as state, I think.
  // *Graph as its own sub-component?

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
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
        data: [techAvg],
        borderColor: "black",
        backgroundColor: ["rgba(53, 162, 235, 0.5"],
      },
      {
        label: "Team Avg",
        data: [teamAvg],
        borderColor: "black",
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
    hoverOffset: 4,
  };

  return (
    <div className={overallStyles.overallBorder}>
      <div id="barHolder">
        <Bar data={data} options={options} width={100} height={200} />
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
    </div>
  );
};

export default CohortOverall;
