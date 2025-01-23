"use client"

import { useEffect, useState } from "react"
import Chart from 'chart.js/auto';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function PowerChart({ power_data, max_speed }: { power_data: number, max_speed: number }) {
  const [data, setData] = useState({
    labels: Array.from({ length: 60 }, (_, i) => i.toString()),
    datasets: [
      {
        label: "Speed (Frequency)",
        data: Array.from({ length: 60 }, () => 0),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  })

  useEffect(() => {
    setData((prev) => ({
      labels: prev.labels,
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data.slice(1), power_data],
        },
      ],
    }))
  }, [power_data])

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        ticks: {
          maxTicksLimit: 60,
        },
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        max: max_speed,
      },
    },
    animation: {
      duration: 500,
    },
  }

  return (
    <div className="h-[200px] sm:h-[300px]">
      <Line data={data} options={options} />
    </div>
  )
}

