import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import admin from '../../../API/admin'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const JobApplicationsChart = () => {
  const [chartData, setChartData] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await admin.fetchJobApplications()
      const data = response.data.applications

      const labels = data.map((entry) => entry.title)
      const jobApplications = data.map((entry) => entry.applicationsCount)

      setChartData({
        labels,
        datasets: [
          {
            label: 'Applications per Job',
            data: jobApplications,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Light blue
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)', // Darker blue on hover
          },
        ],
      })

      setLoading(false)
    } catch (error) {
      console.error('Error fetching job applications data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[300px]'>
        <div className='w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-gray-100 to-gray-300 p-6 shadow-lg rounded-xl w-full h-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
      <h2 className='text-center text-lg font-semibold text-gray-800 mb-4'>
        Job Applications Overview
      </h2>
      <div className='flex items-center justify-center'>
        <div className='w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]'>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: 'rgba(54, 162, 235, 0.8)', // Light blue for legend text
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.label}: ${tooltipItem.raw} Applications`
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: '#4b5563', // Gray for x-axis labels
                    autoSkip: true,
                    maxTicksLimit: 5,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                    color: '#4b5563', // Gray for y-axis labels
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default JobApplicationsChart
