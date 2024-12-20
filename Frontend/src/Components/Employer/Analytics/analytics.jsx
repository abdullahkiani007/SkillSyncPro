import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const jobPostingData = [
  { title: 'Senior Software Engineer', views: 100, applications: 50 },
  { title: 'Product Manager', views: 80, applications: 40 },
  // Add more job posting data as needed
]

const candidateDemographicsData = [
  { name: 'Male', value: 60 },
  { name: 'Female', value: 40 },
  // Add more demographics data as needed
]

const timeToHireData = [
  { month: 'Jan', days: 20 },
  { month: 'Feb', days: 25 },
  // Add more time to hire data as needed
]

const EmployerAnalytics = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh', // Full height container
        paddingBottom: '100px',
        paddingTop: '50px',
        marginBottom: '20px',

        // Gradient background
        backgroundSize: 'cover', // Ensure the gradient covers the entire container
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: 'black', // Light text color
          textAlign: 'center',
        }}
      >
        Employer Analytics
      </Typography>
      <Grid container spacing={4}>
        {/* Job Posting Performance */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              background: '#2d4059', // Dark navy blue card
              transition:
                'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2, color: '#fff' }}>
                Job Posting Performance
              </Typography>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={jobPostingData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
                  <XAxis dataKey='title' stroke='#f5f5f5' />
                  <YAxis stroke='#f5f5f5' />
                  <Tooltip />
                  <Bar dataKey='views' fill='#4A90E2' radius={[10, 10, 0, 0]} />
                  <Bar
                    dataKey='applications'
                    fill='#FF6F61'
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Candidate Demographics */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,

              background: '#2d4059', // Dark card color
              transition:
                'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2, color: '#fff' }}>
                Candidate Demographics
              </Typography>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={candidateDemographicsData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
                  <XAxis dataKey='name' stroke='#fff' />
                  <YAxis stroke='#fff' />
                  <Tooltip />
                  <Bar dataKey='value' fill='#D7C3F1' radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Time to Hire */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 3,

              background: '#2d4059', // Matching navy blue card
              transition:
                'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2, color: '#f39c12' }}>
                Time to Hire
              </Typography>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={timeToHireData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
                  <XAxis dataKey='month' stroke='#f5f5f5' />
                  <YAxis stroke='#f5f5f5' />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='days'
                    stroke='#f39c12'
                    strokeWidth={2}
                    dot={{ r: 6, stroke: '#f39c12', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EmployerAnalytics
