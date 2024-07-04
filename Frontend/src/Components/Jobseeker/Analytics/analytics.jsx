import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';

const applicationStatusData = [
  { name: 'Applied', value: 10 },
  { name: 'Under Review', value: 5 },
  { name: 'Interview Scheduled', value: 2 },
  { name: 'Rejected', value: 3 },
  { name: 'Accepted', value: 1 },
];

const companyPopularityData = [
  { name: 'Codewar', applications: 15 },
  { name: 'Green Energy', applications: 10 },
  { name: 'Finance Corp', applications: 7 },
];

const salaryTrendData = [
  { month: 'Jan', salary: 5000 },
  { month: 'Feb', salary: 5200 },
  { month: 'Mar', salary: 4800 },
  { month: 'Apr', salary: 5300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF'];

const Analytics = () => {
  return (
    <Container maxWidth="lg" className="mt-20 p-20 bg-gray-100">
      <Typography variant="h4" component="h1" className="font-bold mb-10">
        Job Seeker Analytics
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">Application Status</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">Company Popularity</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={companyPopularityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">Salary Trends</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salaryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="salary" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
