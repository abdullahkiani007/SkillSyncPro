import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const jobPostingData = [
  { title: 'Senior Software Engineer', views: 100, applications: 50 },
  { title: 'Product Manager', views: 80, applications: 40 },
  // Add more job posting data as needed
];

const candidateDemographicsData = [
  { name: 'Male', value: 60 },
  { name: 'Female', value: 40 },
  // Add more demographics data as needed
];

const timeToHireData = [
  { month: 'Jan', days: 20 },
  { month: 'Feb', days: 25 },
  // Add more time to hire data as needed
];

const EmployerAnalytics = () => {
  return (
    <Container maxWidth="lg" className="mt-20 p-20 bg-gray-100">
      <Typography variant="h4" component="h1" className="font-bold mb-10">
        Employer Analytics
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">Job Posting Performance</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobPostingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" />
                  <Bar dataKey="applications" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">Candidate Demographics</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={candidateDemographicsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">Time to Hire</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeToHireData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="days" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployerAnalytics;
