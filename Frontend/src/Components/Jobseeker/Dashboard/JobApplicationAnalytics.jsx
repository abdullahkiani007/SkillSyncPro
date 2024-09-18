import React from 'react'
import { Bar } from 'react-chartjs-2'

const JobApplicationAnalytics = () => {
  const barChartData = {
    labels: [
      'Submitted',
      'In Review',
      'Interview Scheduled',
      'Offer Received',
      'Rejected',
    ],
    datasets: [
      {
        label: 'Job Applications',
        data: [30, 10, 5, 2, 15], // Example data
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)')
          gradient.addColorStop(1, 'rgba(153, 102, 255, 0.8)')
          return gradient
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 10, // Rounded corners
      },
    ],
  }

  const barChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: '#e0e0e0',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333', // Darker text color for better contrast
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuad',
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutElastic',
        from: 1,
        to: 0,
        loop: false,
      },
    },
  }

  return (
    <div
      className='p-6 rounded-xl mb-8'
      style={{
        height: '500px',
        backgroundColor: '#f7f9fc',
        border: '1px solid #ccc',
      }}
    >
      <h2 className='text-2xl font-semibold mb-4' style={{ color: '#444' }}>
        Job Application Analytics
      </h2>
      <div className='h-96'>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  )
}

export default JobApplicationAnalytics
