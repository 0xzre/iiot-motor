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

export function PowerChart({ power_data, max_speed, refresh }: { power_data: number, max_speed: number, refresh: boolean }) {
  const [counter, setCounter] = useState(0)
  const [avg, setAvg] = useState(0)
  
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
  const [avgData, setAvgData] = useState({
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
    setCounter(prev => prev+1)
    setAvg(prev => (prev+power_data)/2)
    setData((prev) => ({
      labels: prev.labels,
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data.slice(1), power_data],
        },
      ],
    }))
    if (counter > 60) {
      setAvgData((prev) => ({
        labels: prev.labels,
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data.slice(1), avg],
          },
        ],
      }))
      setAvg(0)
      setCounter(0)
    }
  }, [power_data, refresh])

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
      <Line key={JSON.stringify(data)} data={data} options={options} />
      {/* <Line key={JSON.stringify(avgData)} data={avgData} options={options} /> */}
    </div>
  )
}

