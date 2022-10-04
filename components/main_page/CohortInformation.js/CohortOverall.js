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
  const [techAvg, setTechAvg] = useState(90);
  const [teamAvg, setTeamAvg] = useState(60);

  // const randomizer = () => {
  //   const result = Math.floor(Math.random() * 100);
  //   return result;
  // };

  // The GRAPH - using ChartJS, we want it to be
  // dynamic, responsive to changes in the
  // cohort averages.
  // Need to make sure I'm bringing in averaged data
  // for cohorts as state, I think
  // Would probably be best if the graph were horizontal
  // so that it fits nicer in the panel.
  // Also, what's up with the title being cut off? Need
  // to figure out cohesive styling.

  const data = {
    labels: ["Cohort Tech Avg", "Cohort Teamwork Avg"],
    datasets: [
      {
        axis: "y",
        label: "Cohort Averages",
        data: [techAvg, teamAvg],
        fill: false,
        backgroundColor: ["green"],
        borderColor: ["black"],
        barThickness: 10,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          boxWidth: 7,
          usePointStyle: true,
          pointStyle: "circle",
        },
        title: {
          text: "Cohort Averages",
          display: true,
          color: "#000",
          font: {
            size: 18,
          },
        },
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        max: 100,
      },
    },
    elements: {
      bar: {
        barPercentage: 0.3,
        categoryPercentage: 1,
      },
    },
  };

  return (
    <div className={overallStyles.overallBorder}>
      <p>Cohort Overall</p>
      <div id="barHolder">
        <Bar data={data} height={300} options={options} />
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
