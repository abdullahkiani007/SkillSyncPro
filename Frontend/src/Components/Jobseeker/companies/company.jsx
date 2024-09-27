import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from '@mui/material'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import Loader from '../../Loader/Loader'
import companyBackgroundImg from '../../../assets/company_background.jpg'
import logo from '../../../assets/companyLogo.png'
import personImage from '../../../assets/person.jpeg'

const Company = () => {
  const [company, setCompany] = useState(null)
  const [edit, setEdit] = useState(false)
  const [create, setCreate] = useState(false)
  const [loading, setLoding] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [jobs, setJobs] = useState([])
  const location = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCompany = () => {
      const company = JSON.parse(localStorage.getItem('companiesData')).filter(
        (company) => company._id === id
      )[0]

      setCompany(company)
      console.log('companies', company)

      let jobs = company.jobs.map((job) => {
        let newDate = new Date(job.createdAt)
        let differenceInDays = Math.floor(
          (Date.now() - newDate.getTime()) / (1000 * 60 * 60 * 24)
        )

        return {
          ...job,
          jobPostDays: differenceInDays,
        }
      })

      if (jobs) setJobs(jobs)
      setLoding(false)
    }

    fetchCompany()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className='w-full bg-gradient-to-b from-gray-50 to-gray-200'>
      {/* Hero Section */}
      <div className='relative'>
        <img
          className='object-cover w-full h-60'
          src={companyBackgroundImg}
          alt='Company Background'
        />
        <div className='absolute inset-0 bg-black opacity-40'></div>
        <div className='absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
          <img
            className='w-24 h-24 rounded-full shadow-lg mb-4 border-4 border-emerald-500'
            src={logo}
            alt='Company Logo'
          />
          <h1 className='text-white text-3xl font-bold'>{company.name}</h1>
          <p className='text-emerald-200 font-semibold'>{company.industry}</p>
        </div>
      </div>

      {/* Company Details Section */}
      <Container maxWidth='md' className='mt-10'>
        <div className='bg-white shadow-lg p-6 rounded-lg border-t-4 border-emerald-500'>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant='h6' className='text-emerald-600'>
                Website
              </Typography>
              <a
                href={company.website}
                className='text-emerald-500 underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                {company.website}
              </a>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant='h6' className='text-emerald-600'>
                Location
              </Typography>
              <Typography variant='body1' className='text-gray-700'>
                {company.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant='h6' className='text-emerald-600'>
                Company Size
              </Typography>
              <Typography variant='body1' className='text-gray-700'>
                {company.employees.length} - {company.employees.length + 50}
              </Typography>
            </Grid>
          </Grid>
        </div>

        {/* About Section */}
        <div className='mt-8'>
          <Typography variant='h5' className='font-bold text-emerald-700 mb-4'>
            About {company.name}
          </Typography>
          <Typography variant='body1' className='text-gray-600'>
            {isExpanded
              ? company.description
              : company.description.substring(0, 200) + '...'}
          </Typography>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{ marginTop: 2, color: 'emerald', fontWeight: 'bold' }}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        </div>

        {/* Jobs Section */}
        <div className='mt-10'>
          <Typography variant='h5' className='font-bold text-emerald-700 mb-4'>
            Jobs at {company.name}
          </Typography>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card
                key={job._id}
                className='shadow-md hover:shadow-lg transition-shadow mb-4 border-l-4 border-emerald-500'
                onClick={() => navigate(`../job/${job._id}`)}
              >
                <CardContent>
                  <Grid container>
                    <Grid item xs={2}>
                      <CardMedia
                        component='img'
                        sx={{ borderRadius: '50%', width: 50 }}
                        image={logo}
                        alt='Company Logo'
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant='h6'
                        className='font-bold text-emerald-700'
                      >
                        {job.title}
                      </Typography>
                      <Typography className='text-gray-500'>
                        {job.location} - {job.jobPostDays} days ago
                      </Typography>
                      <Typography className='text-gray-500'>
                        {job.employmentType} | {job.jobMode} | {job.salaryRange}{' '}
                        Rs.
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No Jobs Found</Typography>
          )}
        </div>

        {/* People Section */}
        <div className='mt-10'>
          <Typography variant='h5' className='font-bold text-emerald-700 mb-4'>
            People at {company.name}
          </Typography>
          <Card className='shadow-md border-l-4 border-emerald-500'>
            <CardContent>
              {company.employees.map((employee) => (
                <Grid container key={employee.user._id} className='mb-4'>
                  <Grid item xs={2}>
                    <CardMedia
                      component='img'
                      sx={{ borderRadius: '50%', width: 50, height: 50 }}
                      image={personImage}
                      alt={employee.user.firstName}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant='body1'
                      className='font-bold text-emerald-600'
                    >
                      {employee.user.firstName} {employee.user.lastName}
                    </Typography>
                    <Typography variant='body2' className='text-gray-500'>
                      {employee.user.role}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Button
                fullWidth
                variant='outlined'
                sx={{ borderColor: 'emerald', color: 'emerald' }}
              >
                Show All
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* Footer Section */}
      <footer className='w-full bg-secondary-dark text-white py-6 text-center mt-10'>
        <p>
          &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Company
