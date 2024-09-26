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
    <div className='flex  bg-slate-200 flex-col px-10 pt-10'>
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
            backgroundColor: '#2D4059',
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
              backgroundColor: '#2D4059',
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
            onClick={() => {
              handleDelete(id)
            }}
            sx={{
              mt: 4, // Equivalent to `mt-4` in Tailwind
              // Equivalent to `border-custom-3`
              color: 'white',
              backgroundColor: 'red',
              transition: 'transform 0.3s ease',
              paddingX: '10px',

              // Equivalent to `text-custom-3`
              '&:hover': {
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
        <h1 className='font-bold mt-4 text-black text-3xl hover:text-secondary-default transition-colors'>
          {detail.title}
        </h1>
        <h2 className='text-sm mb-5 text-black text-neutral-5'>
          {detail.location}
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className='flex flex-wrap items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg'>
        {[
          { name: 'Candidates', to: './' },
          { name: 'Job Details', to: './jobdetails' },
          { name: 'Notes', to: './notes' },
          { name: 'Reports', to: './reports' },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className='relative group mx-2 mb-2 px-6 py-3 bg-primary text-white rounded-md transition-all duration-500 ease-in-out overflow-hidden shadow-md hover:bg-secondary-default'
          >
            <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500'></span>
            <span className='absolute inset-0 w-full h-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out bg-neutral-5 opacity-10'></span>
            <span className='relative z-10'>{item.name}</span>
          </Link>
        ))}
      </nav>

      <Outlet context={{ candidatesList, detail }} />
    </div>
  )
}

export default JobDetails
