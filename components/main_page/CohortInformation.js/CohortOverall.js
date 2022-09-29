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
import { useEffect } from "react";
import axios from "axios";

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
  const randomizer = () => {
    const result = Math.floor(Math.random() * 100);
    console.log("result is: ", result);
    return result;
  };
  let classTechAvg = randomizer();
  let classTeamAvg = randomizer();

  const data = {
    labels: ["Class Tech Avg", "Class Teamwork Avg"],
    datasets: [
      {
        axis: "y",
        label: "Cohort Averages",
        data: [classTechAvg, classTeamAvg],
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
        max: 1,
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
    <div>
      <p>Cohort Overall</p>
      <Bar data={data} height={300} options={options} />
      <button id="techRandomizerButton" onClick={(classTechAvg = randomizer)}>
        Randomize Class Tech Average
      </button>
      <button id="teamRandomizerButton" onClick={(classTeamAvg = randomizer)}>
        Randomize Class Team Average
      </button>
    </div>
  );
};

export default CohortOverall;
