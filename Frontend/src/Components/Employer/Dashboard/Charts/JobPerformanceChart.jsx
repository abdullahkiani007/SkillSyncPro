import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import JobPerfomanceTracker from '../../../../API/JobPerfomanceTracker'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'

const JobPerformanceChart = () => {
  const [chartData, setChartData] = useState({})
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs())

  const fetchData = async () => {
    console.log('fetching data')
    setLoading(true)

    try {
      const company = JSON.parse(localStorage.getItem('company'))
      console.log('start date', startDate)
      console.log('end date', endDate)
      let data = await JobPerfomanceTracker.getJobPerformanceByDate(
        company._id,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      )

      data = data.performance

      console.log('data is ', data)

      // Extracting the labels and data from the response
      const labels = data.map((entry) =>
        new Date(entry._id.date).toLocaleDateString()
      )
      const views = data.map((entry) => entry.views)
      const applications = data.map((entry) => entry.applications)
      const hires = data.map((entry) => entry.hires)

      // Setting the chart data
      setChartData({
        labels,
        datasets: [
          {
            label: 'Views',
            data: views,
            borderColor: '#4FC3F7', // Light blue to match gray background
            backgroundColor: 'rgba(79, 195, 247, 0.2)', // Light blue with transparency
            fill: true,
          },
          {
            label: 'Applications',
            data: applications,
            borderColor: '#81C784', // Light green to match gray background
            backgroundColor: 'rgba(129, 199, 132, 0.2)', // Light green with transparency
            fill: true,
          },
          {
            label: 'Hires',
            data: hires,
            borderColor: '#FF8A65', // Light orange to match gray background
            backgroundColor: 'rgba(255, 138, 101, 0.2)', // Light orange with transparency
            fill: true,
          },
        ],
      })
    } catch (error) {
      console.error('Error fetching job performance data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [startDate, endDate])

  return (
    <div
      className='bg-secondary-light '
      style={{
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      {/* bg-gray-700 with padding and rounded corners */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <DatePicker
            className='text-xs w-40 p-0 m-0'
            label='From Date'
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                sx={{ input: { color: '#' }, label: { color: '#FFF' } }}
              />
            )}
          />
          <DatePicker
            label='To Date'
            className='text-xs w-40'
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
              />
            )}
          />
        </div>
      </LocalizationProvider>
      {loading ? (
        <h1 style={{ color: '#FFF' }}>Loading ...</h1>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#000', // Set legend text to white
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#000', // X-axis tick color to white
                },
              },
              y: {
                ticks: {
                  color: '#000', // Y-axis tick color to white
                },
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default JobPerformanceChart
