import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2' // Import Bar instead of Line
import JobPerfomanceTracker from '../../../../API/JobPerfomanceTracker'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'

const JobPerformanceChart2 = () => {
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
            backgroundColor: 'blue',
          },
          {
            label: 'Applications',
            data: applications,
            backgroundColor: 'green',
          },
          {
            label: 'Hires',
            data: hires,
            backgroundColor: 'red',
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
      className='bg-secondary-light'
      style={{
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <div>
        <LocalizationProvider
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            className='text-xs w-40 p-0 m-0'
            label='From Date'
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label='To Date'
            className='text-xs w-40'
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {loading ? <h1>Loading ...</h1> : <Bar data={chartData} />}{' '}
        {/* Replaced Line with Bar */}
      </div>
    </div>
  )
}

export default JobPerformanceChart2
