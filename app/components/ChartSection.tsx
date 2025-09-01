'use client'

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTheme } from 'next-themes'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ChartSection() {
  const { theme } = useTheme()

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Messages Sent',
        data: [4, 6, 2, 8, 5, 3, 7],
        backgroundColor: '#2563eb', // Tailwind blue-600
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#e5e7eb' : '#111827', // dark: gray-200, light: gray-900
        },
      },
      title: {
        display: true,
        text: 'Message Stats 📊',
        color: theme === 'dark' ? '#f3f4f6' : '#111827', // dark: gray-100, light: gray-900
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: theme === 'dark' ? '#d1d5db' : '#374151', // gray-300 vs gray-700
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: theme === 'dark' ? '#d1d5db' : '#374151',
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
      <Bar data={data} options={options} />
    </div>
  )
}
