import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Static data based on the company schema
const companiesData = [
  {
    id: 1,
    name: 'Tech Innovators Inc.',
    description: 'Leading the way in tech innovation and solutions.',
    industry: 'Technology',
    website: 'https://techinnovators.com',
    logo: 'https://via.placeholder.com/150',
    address: '1234 Tech Park, Silicon Valley, CA',
    contactEmail: 'contact@techinnovators.com',
    contactPhone: '123-456-7890',
    employees: ['Employer1', 'Employer2'],
    jobs: ['Job1', 'Job2'],
  },
  {
    id: 2,
    name: 'Green Energy Solutions',
    description: 'Providing sustainable energy solutions for a better future.',
    industry: 'Energy',
    website: 'https://greenenergy.com',
    logo: 'https://via.placeholder.com/150',
    address: '5678 Greenway Blvd, Austin, TX',
    contactEmail: 'info@greenenergy.com',
    contactPhone: '987-654-3210',
    employees: ['Employer3', 'Employer4'],
    jobs: ['Job3', 'Job4'],
  },
  // Add more companies as needed
];

const CompaniesList = () => {
    const navigate = useNavigate();

  return (
    <Container maxWidth="lg" className="mt-20 p-20 bg-gray-100">
      <Typography variant="h4" component="h1" className="font-bold mb-10">
        Companies
      </Typography>
      <Grid container spacing={4}>
        {companiesData.map((company) => (
          <Grid item xs={12} md={6} lg={4} key={company.id}>
            <Card className="h-full flex flex-col" 
            onClick = {()=> navigate(`${company.name}`)}>
              <CardMedia
                component="img"
                alt={company.name}
                height="200"
                image={company.logo}
                title={company.name}
              />
              <CardContent className="flex flex-col flex-grow">
                <Typography variant="h5" component="h2" className="font-bold">
                  {company.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {company.industry}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {company.address}
                </Typography>
                <Typography variant="body2" color="textPrimary" className="mt-2">
                  <p  className="text-blue-500">
                    {company.contactEmail}
                  </p>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {company.contactPhone}
                </Typography>
                <Typography variant="body2" color="textPrimary" className="mt-2">
                  <p  rel="noopener noreferrer" className="text-blue-500">
                    {company.website}
                  </p>
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mt-2 flex-grow">
                  {company.description}
                </Typography>
                <Box className="mt-4">
                  <Typography variant="body2" color="textSecondary">
                    Employees: {company.employees.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Jobs: {company.jobs.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompaniesList;
