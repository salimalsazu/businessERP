"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const dataset1Data = [300, 450, 600, 800, 350, 700, 900];
const dataset2Data = [500, 200, 750, 400, 300, 600, 800];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: dataset1Data,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: dataset2Data,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const FuelChartSection = () => {
  return <Bar data={data} />;
};

export default FuelChartSection;
