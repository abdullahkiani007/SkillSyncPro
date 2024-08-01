import React from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Static data for an individual company and its jobs
const companyData = {
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
  jobs: [
    {
      id: 1,
      title: 'Senior Software Engineer',
      description: 'Develop and maintain software applications.',
      location: 'Silicon Valley, CA',
      salary: '$120,000 - $150,000',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Product Manager',
      description: 'Oversee product development and strategy.',
      location: 'Remote',
      salary: '$90,000 - $120,000',
      date: '2024-02-01',
    },
  ],
};

const Company = () => {
    const navigate = useNavigate();
  const { name, description, industry, website, logo, address, contactEmail, contactPhone, jobs } = companyData;

  return (
    <Container maxWidth="lg" className="mt-20 p-20 bg-gray-100">
      <Card className="flex flex-col items-center p-4">
        <CardMedia
          component="img"
          alt={name}
          height="200"
          image={logo}
          title={name}
          className="w-32 h-32 rounded-full mb-4"
        />
        <CardContent className="text-center">
          <Typography variant="h4" component="h1" className="font-bold mb-2">
            {name}
          </Typography>
          <Typography variant="h6" color="textSecondary" className="mb-2">
            {industry}
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-2">
            {address}
          </Typography>
          <Typography variant="body1" color="textPrimary" className="mb-2">
            <a href={`mailto:${contactEmail}`} className="text-blue-500">
              {contactEmail}
            </a>
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-2">
            {contactPhone}
          </Typography>
          <Typography variant="body1" color="textPrimary" className="mb-2">
            <Link href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {website}
            </Link>
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mt-4">
            {description}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h4" component="h2" className="font-bold mt-10 mb-4">
        Jobs at {name}
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card className="flex flex-col h-full"
            onClick = {()=> navigate(`/jobseeker/job/${job.id}`)}
            >
              <CardContent className="flex flex-col flex-grow">
                <Typography variant="h5" component="h3" className="font-bold">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.location}
                </Typography>
                <Typography variant="body2" color="textPrimary" className="text-green-500">
                  {job.salary}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mt-2 flex-grow">
                  {job.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Posted on {job.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Company;
