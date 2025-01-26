import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the type for the chartData prop
interface ChartData {
  value: number;
  timestamp: Date;
}

interface LineChartProps {
  chartData: ChartData[];
  title: string;
  xLabel: string;
  yLabel: string;
}

const LineChart: React.FC<LineChartProps> = ({
  chartData,
  title,
  xLabel,
  yLabel,
}) => {
  // Extract labels (timestamps) and values for the chart
  const labels = chartData.map((data) =>
    new Date(data.timestamp).toLocaleString()
  );
  const values = chartData.map((data) => data.value);

  // Chart.js data configuration
  const data = {
    labels,
    datasets: [
      {
        label: "   Over Time",
        data: values,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
