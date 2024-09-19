import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import admin from '../../../API/admin'

ChartJS.register(ArcElement, Tooltip, Legend)

const EmploymentTypesDistributionChart = () => {
  const [chartData, setChartData] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await admin.fetchEmploymentTypeDistribution()
      const data = response.data.employmentType

      const labels = data.map((entry) => entry._id || 'Unknown')
      const counts = data.map((entry) => entry.count)

      setChartData({
        labels,
        datasets: [
          {
            label: 'Employment Types Distribution',
            data: counts,
            backgroundColor: [
              'rgba(75,192,192,0.6)',
              'rgba(255,99,132,0.6)',
              'rgba(255,159,64,0.6)',
              'rgba(153,102,255,0.6)',
              'rgba(255,205,86,0.6)',
            ],
            borderColor: [
              'rgba(75,192,192,1)',
              'rgba(255,99,132,1)',
              'rgba(255,159,64,1)',
              'rgba(153,102,255,1)',
              'rgba(255,205,86,1)',
            ],
            borderWidth: 1,
          },
        ],
      })

      setLoading(false)
    } catch (error) {
      console.error('Error fetching employment types distribution data:', error)
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
    <div className='bg-gray-100 p-6 shadow-lg rounded-xl w-full h-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
      <h2 className='text-center text-lg font-semibold text-gray-800 mb-4'>
        Employment Types Distribution
      </h2>
      <div className='flex items-center justify-center'>
        <div className='w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]'>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: 'rgba(54, 162, 235, 0.8)',
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.label}: ${tooltipItem.raw} Jobs`
                    },
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

export default EmploymentTypesDistributionChart
