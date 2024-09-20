import React from 'react'
import { Container, Typography, Grid, Card, CardContent } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
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
      maxWidth='xl'
      sx={{
        minHeight: '100vh', // Full height container
        p: 4,
        backgroundColor: '#1b1b1b', // Dark background
        borderRadius: 4,
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#f5f5f5', // Light text color
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
              backgroundColor: '#2C3E50', // Dark navy blue card
              transition:
                'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)', // Slight scale on hover
                boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)', // Softer shadow on hover
                backgroundColor: '#34495E', // New background color on hover
              },
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2, color: '#FF6F61' }}>
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
              backgroundColor: '#34495E', // Dark card color
              transition:
                'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#2C3E50', // New background color on hover
              },
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2, color: '#50C878' }}>
                Candidate Demographics
              </Typography>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={candidateDemographicsData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
                  <XAxis dataKey='name' stroke='#f5f5f5' />
                  <YAxis stroke='#f5f5f5' />
                  <Tooltip />
                  <Bar dataKey='value' fill='#50C878' radius={[10, 10, 0, 0]} />
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
              boxShadow: 3,
              backgroundColor: '#2C3E50', // Matching navy blue card
              transition:
                'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#34495E', // New background color on hover
              },
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
