import React, { useState } from 'react'
import { Container, Typography, Grid, Card, CardContent } from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const applicationStatusData = [
  { name: 'Applied', value: 10 },
  { name: 'Under Review', value: 5 },
  { name: 'Interview Scheduled', value: 2 },
  { name: 'Rejected', value: 3 },
  { name: 'Accepted', value: 1 },
]

const companyPopularityData = [
  { name: 'Codewar', applications: 15 },
  { name: 'Green Energy', applications: 10 },
  { name: 'Finance Corp', applications: 7 },
]

const salaryTrendData = [
  { month: 'Jan', salary: 5000 },
  { month: 'Feb', salary: 5200 },
  { month: 'Mar', salary: 4800 },
  { month: 'Apr', salary: 5300 },
]

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#A28CFF']

const Analytics = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  const handleClickOnPie = (data) => {
    alert(`You clicked on ${data.name}: ${data.value} applications.`)
  }

  return (
    <Container
      maxWidth='lg'
      className='mt-20 p-20 bg-white'
      style={{
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        className='font-bold mb-10'
        style={{ color: '#2F4F4F', textAlign: 'center', marginBottom: '20px' }}
      >
        Job Seeker Analytics Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Application Status */}
        <Grid item xs={12} md={6}>
          <Card
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff7e0',
            }}
          >
            <CardContent>
              <Typography
                variant='h6'
                className='mb-4'
                style={{ color: '#ff4500' }}
              >
                Application Status
              </Typography>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    label
                    activeIndex={activeIndex}
                    onMouseEnter={onPieEnter}
                    onClick={handleClickOnPie}
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Company Popularity with Bluish Gradient Bars */}
        <Grid item xs={12} md={6}>
          <Card
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#e0fff7',
            }}
          >
            <CardContent>
              <Typography
                variant='h6'
                className='mb-4'
                style={{ color: '#008080' }}
              >
                Company Popularity
              </Typography>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={companyPopularityData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='applications' fill='url(#colorUv)' />
                  <defs>
                    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#0088FE' stopOpacity={0.8} />
                      <stop
                        offset='95%'
                        stopColor='#00C49F'
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Salary Trends with Light Background */}
        <Grid item xs={12}>
          <Card
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f5f5ff',
            }}
          >
            <CardContent>
              <Typography
                variant='h6'
                className='mb-4'
                style={{ color: '#6A5ACD' }}
              >
                Salary Trends
              </Typography>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={salaryTrendData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='salary'
                    stroke='url(#colorSalary)'
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                  <defs>
                    <linearGradient
                      id='colorSalary'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                      <stop
                        offset='95%'
                        stopColor='#82ca9d'
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Analytics
