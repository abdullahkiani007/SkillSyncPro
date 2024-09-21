// src/pages/Company/Company.js

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
import EmployerController from '../../../API/employer'
import Loader from '../../Loader/Loader'
import CompanyForm from './CompanyForm'
import companyBackgroundImg from '../../../assets/company_background.jpg'
import logo from '../../../assets/companyLogo.png'

const Company = () => {
  const [company, setCompany] = useState(null)
  const [edit, setEdit] = useState(false)
  const [create, setCreate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [jobs, setJobs] = useState([])

  let company_description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, fuga. Nostrum culpa hic perspiciatis reprehenderit iusto minima nobis, autem sequi dignissimos possimus. Perspiciatis, nisi eaque ea voluptatem quis sunt.'

  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem('token')
      let company = await EmployerController.getCompany(token)

      if (company.status === 200) {
        let Employees = await EmployerController.getEmployees(
          token,
          company.data.data._id
        )

        if (Employees.status === 200) {
          Employees = Employees.data.employees
        }

        let newCompany = {
          ...company.data.data,
          employees: Employees.authEmployees,
        }
        setCompany(newCompany)
        setLoading(false)
      } else if (company.status === 404) {
        setCreate(true)
        setLoading(false)
      }
    }
    const fetchJobs = async () => {
      let jobs = JSON.parse(localStorage.getItem('empJobs'))
      let date = Date.now()
      let jobDate = jobs[0].createdAt
      let newDate = new Date(jobDate)

      let differenceInMilliseconds = date - newDate.getTime()
      let differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      )

      jobs = jobs.map((job) => ({
        ...job,
        jobType: 'Full Time',
        salary: '$1000 - $2000',
        jobMode: 'Hybrid',
        jobPostDays: differenceInDays,
      }))
      jobs = jobs.slice(0, 3)
      setJobs(jobs)
    }
    fetchCompany()
    fetchJobs()
  }, [])

  if (loading) {
    return <Loader />
  } else if (create) {
    return (
      <CompanyForm setEdit={setEdit} Edit={false} setCompany={setCompany} />
    )
  } else if (edit) {
    return (
      <CompanyForm
        setEdit={setEdit}
        Edit={true}
        setCompany={setCompany}
        company={company}
      />
    )
  }

  return (
    <div className='w-full overflow-y-auto overflow-x-hidden bg-slate-300'>
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col items-center justify-between'>
          <div className='w-full max-h-52 overflow-hidden'>
            <img
              className='object-cover w-full'
              src={companyBackgroundImg}
              alt='companyBackground'
            />
          </div>
          <div
            className='bg-white w-4/5 lg:w-3/5 p-5 rounded-xl mt-[-50px] z-10 shadow-md'
            style={{
              backgroundColor: '#FEFAE0', // Light Secondary color
            }}
          >
            <div className='flex items-center'>
              <img
                className='w-20 h-20 rounded-full mr-3'
                src={logo}
                alt='companyLogo'
              />
              <div>
                <Typography
                  variant='h5'
                  component='h1'
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    color: '#E14411', // Primary Default color
                    marginRight: '20px',
                  }}
                >
                  {company.name.toUpperCase()}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#8B322C', // Primary Dark color
                  }}
                >
                  {company.industry}
                </Typography>
              </div>
              <Button
                className='ml-auto'
                variant='outlined'
                onClick={() => setEdit(true)}
                sx={{
                  borderColor: '#FFD460', // Light Primary color
                  color: '#E14411',
                  '&:hover': {
                    backgroundColor: '#FFD460', // Light Primary on hover
                  },
                }}
              >
                Manage
              </Button>
            </div>
            <Grid container spacing={4} className='mt-5'>
              <Grid item xs={12} sm={4}>
                <Typography variant='body2' color='textSecondary'>
                  Website
                </Typography>
                <a
                  href={company.website}
                  target='_blank'
                  rel='noreferrer'
                  className='text-blue-600'
                  style={{ color: '#E14411' }} // Primary Default
                >
                  {company.website}
                </a>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant='body2' color='textSecondary'>
                  Location
                </Typography>
                <Typography
                  variant='body1'
                  style={{
                    color: '#2D4059', // Secondary Dark color
                  }}
                >
                  {company.address}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant='body2' color='textSecondary'>
                  Company Size
                </Typography>
                <Typography
                  variant='body1'
                  style={{
                    color: '#2D4059',
                  }}
                >
                  {company.employees.length} - {company.employees.length + 50}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>

        {/* Description and Jobs Section */}
        <div className='lg:flex justify-between w-full lg:w-4/5 mt-20'>
          <div className='w-full lg:w-1/2 px-10'>
            <Typography
              variant='h6'
              component='h2'
              className='mb-3'
              style={{ fontFamily: 'Roboto, sans-serif', color: '#E14411' }} // Primary Default
            >
              About {company.name}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {isExpanded
                ? company_description
                : company_description.substring(0, 200)}
            </Typography>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                mt: 2,
                color: '#E14411',
                '&:hover': {
                  backgroundColor: '#FFD460', // Light Primary on hover
                },
              }}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>

            <Typography
              variant='h6'
              component='h2'
              className='mt-5'
              style={{ fontFamily: 'Roboto, sans-serif', color: '#E14411' }} // Primary Default
            >
              Jobs from {company.name}
            </Typography>
            {jobs &&
              jobs.map((job) => (
                <Card
                  className='my-3'
                  sx={{
                    backgroundColor: '#FEFAE0', // Light Secondary color
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                  }}
                >
                  <CardContent>
                    <Grid container>
                      <Grid item xs={2}>
                        <CardMedia
                          component='img'
                          className='w-12 h-12 rounded-full'
                          image={logo}
                          alt='companyLogo'
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography
                          variant='h6'
                          style={{
                            fontFamily: 'Open Sans, sans-serif',
                            color: '#2D4059',
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {job.location}
                        </Typography>
                        <Grid container spacing={2} className='mt-2'>
                          <Grid item>
                            <Typography variant='body2'>
                              {job.jobType}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='body2'>
                              {job.jobMode}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='body2'>
                              {job.salary}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography variant='body2' color='textSecondary'>
                          {job.jobPostDays} days ago · {job.applicants.length}{' '}
                          applicants
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Employees Section */}
          <div className='w-full lg:w-1/3 px-10'>
            <Typography
              variant='h6'
              component='h2'
              className='mb-3'
              style={{ fontFamily: 'Roboto, sans-serif', color: '#E14411' }} // Primary Default
            >
              People at {company.name}
            </Typography>
            {company.employees.map((employee) => (
              <Card
                key={employee._id}
                className='mb-3'
                sx={{
                  backgroundColor: '#FEFAE0', // Light Secondary color
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                }}
              >
                <CardContent>
                  <Grid container>
                    <Grid item xs={3}>
                      <CardMedia
                        component='img'
                        className='w-12 h-12 rounded-full'
                        image={employee.user.profilePicture}
                        alt={employee.user.firstName}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant='body1' style={{ color: '#2D4059' }}>
                        {employee.user.firstName}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {employee.position || 'Recruiter'}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Button
              fullWidth
              variant='outlined'
              sx={{
                mt: 2,
                borderColor: '#FFD460', // Light Primary color
                color: '#E14411',
                '&:hover': {
                  backgroundColor: '#FFD460', // Light Primary on hover
                },
              }}
            >
              Show All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company
