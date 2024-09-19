import React, { useState, useEffect } from 'react'
import { Typography, Container, Card, CardContent, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import jobseeker from '../../../API/jobseeker'
import { useSelector } from 'react-redux'

const AppliedJobs = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getAllJobs = async () => {
      const token = localStorage.getItem('token')
      const response = await jobseeker.getAppliedJobs(token)
      console.log(response.data.jobs)
      if (response.status === 200) {
        // let newJobs = response.data.jobs.filter((job) => {
        //   return job.applicants.includes(user._id)
        // })

        setJobs(response.data.jobs)
        // console.log('hi',response.data.jobs);
      }
    }
    getAllJobs()
    // const Jobs = localStorage.getItem("jobs")
    // if(Jobs){
    //   // console.log(JSON.parse(Jobs));

    //   const jobItems = JSON.parse(Jobs).filter((job) => {
    //     return job.applicants.includes(user._id)
    //   })
    //   setJobs(jobItems);
    //   // console.log("job state" , job);
    // }
  }, [])

  if (!jobs || jobs.length === 0) {
    return (
      <div
        // maxWidth="md"
        className=' mt-20 flex flex-col justify-center items-center'
      >
        <Typography variant='h3' align='center' gutterBottom>
          No Applied Jobs
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/jobseeker/jobs')}
        >
          Consider Applying{' '}
        </Button>
      </div>
    )
  }
  return (
    <Container maxWidth='md'>
      <Typography variant='h3' align='center' gutterBottom>
        Applied Jobs
      </Typography>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {jobs.map((job) => (
          <Card
            key={job._id}
            className='max-w-sm  rounded overflow-hidden shadow-lg hover:cursor-pointer hover:bg-slate-100'
            onClick={() => navigate('/jobseeker/job/' + job._id)}
          >
            <CardContent>
              <Typography variant='h5' component='h2' gutterBottom>
                {job.title}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Status: {job.status}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Description: {job.description}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Company: {job.company}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Location: {job.location}
              </Typography>
              {job.coverLetter && (
                <Typography variant='body2' color='textSecondary'>
                  Cover Letter: {job.coverLetter}
                </Typography>
              )}
              {job.interview && (
                <Typography variant='body2' color='textSecondary'>
                  Interview Scheduled: {job.interview.date}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default AppliedJobs
