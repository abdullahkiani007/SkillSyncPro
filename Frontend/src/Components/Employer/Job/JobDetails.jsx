import React, { useState, useEffect } from 'react'
import { Outlet, useParams, useNavigate, Link } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArchiveIcon from '@mui/icons-material/Archive'
import Employer from '../../../API/employer'
import Loader from '../../Loader/Loader'

const JobDetails = () => {
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const navigate = useNavigate()
  const [candidatesList, setCandidatesList] = useState([])
  const [detail, setDetail] = useState([])

  const id = params.id

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
        console.log("candidates", response.data)
        setCandidatesList(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCandidates()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className='flex  bg-slate-200 flex-col px-10 pt-10'>
      <div className='flex justify-between'>
        <Button
          onClick={() => {
            navigate('../job/job-listing')
          }}
          variant='contained'
          startIcon={<ArrowBackIosIcon />}
          sx={{
            mt: 4,
            backgroundColor: '#2D4059',
            borderRadius: '30px',
            transition: 'transform 0.3s ease-in',

            '&:hover': {
              backgroundColor: '#000',
              transform: 'scale(1.1)',
            },
            '&.MuiButton-root': {
              color: 'white',
            },
          }}
        >
          Back to Jobs
        </Button>

        <div className='space-x-7'>
          <Button
            variant='outlined'
            onClick={() => {
              handleArchive(id)
            }}
            sx={{
              mt: 4,
              backgroundColor: '#2D4059',
              color: '#fff',
              transition: 'transform 0.3s ease',

              '&:hover': {
                backgroundColor: 'green',
                color: '#fff',
                borderColor: '#000',
                transform: 'scale(1.1)',
              },
            }}
            startIcon={<ArchiveIcon />}
          >
            Archive
          </Button>

          <Button
            onClick={() => {
              handleDelete(id)
            }}
            sx={{
              mt: 4,
              color: 'white',
              backgroundColor: 'red',
              transition: 'transform 0.3s ease',
              paddingX: '10px',

              '&:hover': {
                backgroundColor: 'darkred',
                transform: 'scale(1.1)',
              },
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <div>
        <h1 className='font-bold mt-4 text-black text-3xl hover:text-secondary-default transition-colors'>
          {detail.title}
        </h1>
        <h2 className='text-sm mb-5 text-black text-neutral-5'>
          {detail.location}
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className='flex flex-wrap items-center justify-center bg-slate-200 p-4 rounded-lg '>
        {[
          { name: 'Candidates', to: './' },
          { name: 'Job Details', to: './jobdetails' },
          { name: 'Notes', to: './notes' },
          { name: 'Reports', to: './reports' },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className='relative group mx-2 mb-2 px-6 py-3 bg-primary text-white rounded-md transition-all duration-300 ease-in-out overflow-hidden shadow-md hover:bg-secondary-default hover:shadow-lg active:shadow-inner active:bg-secondary-dark'
          >
            <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300'></span>
            <span className='absolute inset-0 w-full h-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out bg-neutral-5 opacity-10'></span>
            <span className='relative z-10'>{item.name}</span>
          </Link>
        ))}
      </nav>

      <Outlet context={{ candidatesList, detail }} />
    </div>
  )
}

export default JobDetails
