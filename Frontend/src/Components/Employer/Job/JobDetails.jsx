import React, { useState, useEffect } from 'react'
import { Outlet, useParams, useOutletContext } from 'react-router-dom'
import { Button } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { IconButton } from '@mui/material'
import Employer from '../../../API/employer'
import Loader from '../../Loader/Loader'
import ArchiveIcon from '@mui/icons-material/Archive'
const JobDetails = () => {
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const navigate = useNavigate()
  const [candidatesList, setCandidatesList] = useState([])

  const id = params.id
  const [detail, setDetail] = useState([])

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    try {
      const response = await Employer.deleteJob(token, id)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleArchive = async (id) => {
    const token = localStorage.getItem('token')
    try {
      const response = await Employer.archiveJob(token, id)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('empJobs'))

    const job = jobs.find((job) => job._id === id)
    if (job === undefined) {
      try {
        async function fetchJob() {
          const token = localStorage.getItem('accessToken')
          const response = await Employer.getJobDetails(token, id)
          console.log('job details', response.data)

          setDetail(response.data)
          setLoading(false)
        }
        fetchJob()
      } catch (error) {
        console.log(error)
      }
    }
    setDetail(job)
    console.log('job details', detail)
  }, [])

  useEffect(() => {
    async function fetchCandidates() {
      const token = localStorage.getItem('accessToken')
      try {
        const response = await Employer.getCandidatesByJobId(token, id)
        console.log(response)
        console.log('candidates list', response.data)
        setCandidatesList(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCandidates()
  }, [])

  console.log('params received', params.id)

  if (loading) {
    return <Loader />
  }
  return (
    <div className='flex  bg-gradient-to-r from-secondary-dark to-secondary-dark flex-col px-10 pt-10'>
      <div className='flex justify-between'>
        {/* Back to Jobs Button with primary light color */}
        <Button
          onClick={() => {
            navigate('../job/job-listing')
          }}
          variant='contained'
          startIcon={<ArrowBackIosIcon />}
          sx={{
            mt: 4, // Equivalent to `mt-4` in Tailwind
            backgroundColor: '#E14411',
            borderRadius: '30px',
            transition: 'transform 3s ease-in', // Equivalent to `bg-primary-light`

            '&:hover': {
              backgroundColor: '#000',
              transform: 'scale(1.1)', // Equivalent to `hover:bg-primary`
            },
            '&.MuiButton-root': {
              color: 'white', // Equivalent to `dark:text-neutral-1` when using dark theme
            },
          }}
        >
          Back to Jobs
        </Button>

        <div className='space-x-7'>
          {/* Archive Button with secondary light */}
          <Button
            variant='outlined'
            onClick={() => {
              handleArchive(id)
            }}
            sx={{
              mt: 4, // Equivalent to `mt-4` in Tailwind
              backgroundColor: '#E14411',
              color: '#fff',

              transition: 'transform 0.3s ease',

              // Equivalent to `text-secondary-dark`
              '&:hover': {
                backgroundColor: 'green',
                color: '#fff',
                borderColor: '#000',
                transform: 'scale(1.1)',
                // Equivalent to `hover:bg-secondary-light`
              },
            }}
            startIcon={<ArchiveIcon />}
          >
            Archive
          </Button>

          {/* Delete Button with custom color 3 */}
          <Button
            variant='outlined'
            onClick={() => {
              handleDelete(id)
            }}
            sx={{
              mt: 4, // Equivalent to `mt-4` in Tailwind
              // Equivalent to `border-custom-3`
              color: 'white',
              backgroundColor: '#E14411',
              transition: 'transform 0.3s ease',

              // Equivalent to `text-custom-3`
              '&:hover': {
                borderColor: 'black',
                backgroundColor: 'red ', // Equivalent to `hover:bg-custom-3`
                color: 'white',
                transform: 'scale(1.1)', // Equivalent to `hover:text-neutral-1`
              },
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <div>
        {/* Job Title */}
        <h1 className='font-bold mt-4 text-white text-3xl hover:text-secondary-default transition-colors'>
          {detail.title}
        </h1>
        <h2 className='text-sm mb-5 text-white text-neutral-5'>
          {detail.location}
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className='flex mb-4'>
        <Link
          to='./'
          className='bg-primary text-white hover:bg-secondary-default text-neutral-5 hover:text-neutral-1 rounded-md px-3 py-1 mr-2 transition-all'
        >
          Candidates
        </Link>
        <Link
          to='./jobdetails'
          className='bg-primary text-white hover:bg-secondary-default text-neutral-5 hover:text-neutral-1 rounded-md px-3 py-1 mr-2 transition-all'
        >
          Job Details
        </Link>
        <Link
          to='./notes'
          className='bg-primary text-white hover:bg-secondary-default text-neutral-5 hover:text-neutral-1 rounded-md px-3 py-1 mr-2 transition-all'
        >
          Notes
        </Link>
        <Link
          to='./reports'
          className='bg-primary text-white  hover:bg-secondary-default text-neutral-5 hover:text-neutral-1 rounded-md px-3 py-1 mr-2 transition-all'
        >
          Reports
        </Link>
      </nav>

      <Outlet context={{ candidatesList, detail }} />
    </div>
  )
}

export default JobDetails
