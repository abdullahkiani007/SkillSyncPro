import React, { useEffect, useState } from 'react'
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Box,
} from '@mui/material'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6'
import { IoCaretForwardOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import JobPerformanceTracker from '../../../API/JobPerfomanceTracker'
import Loader from '../../Loader/Loader'
import companyLogo from '../../../assets/companyLogo.png'

const Job = () => {
  const id = window.location.pathname.split('/')[3]
  const navigate = useNavigate()
  const [jobDetails, setJobDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState({})
  const [applied, setApplied] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    async function handleView() {
      try {
        await JobPerformanceTracker.trackJobView(id, user._id)
      } catch (err) {
        console.log(err)
      }
    }

    handleView()
  }, [id, user._id])

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('jobs'))
    if (jobs) {
      const jobItem = jobs.find((job) => job._id.trim() === id.trim())
      console.log("job items " , jobItem)
      setJob(jobItem)
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className='flex items-center pl-10 py-3 border-b border-gray-300 bg-gray-100'>
        <IoMdArrowRoundBack
          className='hover:cursor-pointer text-2xl text-indigo-500 hover:text-indigo-700 transition duration-200'
          onClick={() => navigate('../jobs')}
        />
        <Typography
          variant='h6'
          className='ml-3 font-semibold text-indigo-500 hover:text-indigo-700 transition duration-200 hover:cursor-pointer'
          onClick={() => navigate('../jobs')}
        >
          Back to All Jobs
        </Typography>
      </div>

      <div className='lg:flex lg:flex-row lg:gap-8 mt-8 px-10'>
        {/* Main Job Card */}
        <Container>
          <Card className='shadow-xl hover:shadow-2xl transition-shadow rounded-lg bg-white border-t-8 border-indigo-500'>
            <CardContent className='flex justify-between p-8'>
              <div>
                <img
                  src={companyLogo}
                  alt='Company Logo'
                  className='w-24 h-24 rounded-full mb-6 shadow-md'
                />
                <Typography variant='h5' className='font-bold text-gray-800'>
                  {job.title}
                </Typography>
                <Typography className='text-sm text-gray-500 my-3'>
                  {job.companyWebsite}
                </Typography>
                <div className='flex items-center space-x-6'>
                  <Typography variant='body2' className='text-gray-700'>
                    {job.companyName}
                  </Typography>
                  <div className='flex items-center space-x-1'>
                    <HiOutlineCurrencyDollar className='text-xl text-green-500' />
                    <Typography variant='body2' className='text-gray-500'>
                      {job.salaryRange}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between items-end'>
                <FaRegBookmark className='text-3xl text-gray-400 cursor-pointer hover:text-yellow-500 transition duration-200' />
                <Button
                  onClick={() => navigate(`../../jobseeker/job/apply/${id}`)}
                  variant='contained'
                  sx={{
                    background: '#4F46E5',
                    '&:hover': {
                      backgroundColor: '#4338CA',
                    },
                  }}
                  className='text-white mt-4 shadow-lg transform hover:scale-105 transition-transform'
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>

            <Divider />

            {/* Job Requirements */}
            <CardContent>
              <div className='p-5'>
                <Typography
                  variant='h6'
                  className='font-bold mb-2 text-indigo-600'
                >
                  Requirements
                </Typography>
                {job.requirements?.map((requirement, index) => (
                  <div className='flex items-center my-1' key={index}>
                    <IoCaretForwardOutline className='text-indigo-400' />
                    <Typography className='text-sm ml-1 text-gray-600'>
                      {requirement}
                    </Typography>
                  </div>
                ))}
              </div>

              {/* Job Description */}
              <div className='p-5'>
                <Typography
                  variant='h6'
                  className='font-bold mb-2 text-indigo-600'
                >
                  Job Description
                </Typography>
                <div className='flex items-center'>
                  <IoCaretForwardOutline className='text-indigo-400' />
                  <Typography className='text-sm ml-1 text-gray-600'>
                    {job.description}
                  </Typography>
                </div>
              </div>
            </CardContent>

            <Divider />

            {/* Skills */}
            <CardContent>
              <div className='p-5'>
                <Typography
                  variant='h6'
                  className='font-bold mb-2 text-indigo-600'
                >
                  Skills Required
                </Typography>
                <div className='flex flex-wrap gap-3'>
                  {job.skills?.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      className='text-sm bg-indigo-500 text-white shadow-md'
                      sx={{
                        '&:hover': {
                          backgroundColor: '#E2E8F0',
                          color: '#4C51BF',
                        },
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>

        {/* Job Details Section */}
        <Container className='basis-1/3 mt-6 lg:mt-0'>
          <CardContent className='shadow-lg rounded-lg p-8 bg-gray-50'>
            <Typography variant='h6' className='font-bold mb-6 text-indigo-600'>
              About the Job
            </Typography>

            <Typography className='text-gray-500 text-sm'>
              Apply Before
            </Typography>
            <Typography className='mb-6 text-gray-700'>
              {job.deadLine}
            </Typography>

            <Typography className='text-gray-500 text-sm'>Posted on</Typography>
            <Typography className='mb-6 text-gray-700'>
              {jobDetails.postedOn}
            </Typography>

            <Typography className='text-gray-500 text-sm'>Job Type</Typography>
            <Typography className='mb-6 text-gray-700'>
              {job.employmentType}
            </Typography>

            <Typography className='text-gray-500 text-sm'>
              Experience Level
            </Typography>
            <Typography className='mb-6 text-gray-500 border border-gray-300 rounded-md p-2 text-xs w-fit'>
              {job.experienceLevel}
            </Typography>

            <Typography className='text-gray-500 text-sm'>Salary</Typography>
            <div className='flex items-center py-1 mb-6'>
              <HiOutlineCurrencyDollar className='text-xl text-green-500' />
              <Typography className='ml-1 text-sm text-gray-700'>
                {job.salaryRange}
              </Typography>
            </div>
          </CardContent>
        </Container>
      </div>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-4 mt-12'>
        <Container>
          <Typography variant='body2' className='text-center text-gray-400'>
            &copy; 2024 JobBoard. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </>
  )
}

export default Job
