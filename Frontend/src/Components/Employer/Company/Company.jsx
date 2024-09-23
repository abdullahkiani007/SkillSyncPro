import React, { useState, useEffect } from 'react'
import EmployerController from '../../../API/employer'
import Loader from '../../Loader/Loader'
import CompanyForm from './CompanyForm'
import companyBackgroundImg from '../../../assets/company_background.jpg'
import logo from '../../../assets/companyLogo.png'
import personImage from '../../../assets/person.jpeg'
import { Button } from '@mui/material'

const Company = () => {
  const [company, setCompany] = useState(null)
  const [edit, setEdit] = useState(false)
  const [create, setCreate] = useState(false)
  const [loading, setLoding] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [jobs, setJobs] = useState([])

  let company_description =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, fuga.Nostrum culpa hic perspiciatis reprehenderit iusto minima nobis, a,autem sequi dignissimos possimus. Perspiciatis, nisi eaque ea voluptatem quis sunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit...'

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
        } else {
          console.log(Employees.message)
        }

        let newCompany = {
          ...company.data.data,
          employees: Employees.authEmployees,
        }
        setCompany(newCompany)
        setLoding(false)
      } else if (company.status === 404) {
        setCreate(true)
        setLoding(false)
      } else {
        console.log(company.message)
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
    <div className='w-full min-h-screen bg-slate-50 font-poppins'>
      <div className='relative w-full h-60'>
        <img
          className='w-full h-full object-cover'
          src={companyBackgroundImg}
          alt='companyBackground'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black opacity-60'></div>
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center'>
          <img
            className='w-24 h-24 rounded-full border-4 border-white shadow-md'
            src={logo}
            alt='companyLogo'
          />
          <h1 className='text-white text-2xl font-bold mt-2'>
            {company.name.toUpperCase()}
          </h1>
          <p className='text-gray-300 text-sm'>{company.industry}</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='bg-white p-6 shadow-lg rounded-lg'>
          <div className='flex justify-between items-center'>
            <div className='space-y-2'>
              <p className='text-gray-500 text-sm'>Website</p>
              <a
                href={company.website}
                target='_blank'
                rel='noreferrer'
                className='text-blue-600 hover:underline'
              >
                {company.website}
              </a>
            </div>
            <div className='space-y-2'>
              <p className='text-gray-500 text-sm'>Location</p>
              <p className='text-sm font-bold'>{company.address}</p>
            </div>
            <div className='space-y-2'>
              <p className='text-gray-500 text-sm'>Company Size</p>
              <p className='text-sm font-bold'>
                {company.employees.length} - {company.employees.length + 50}
              </p>
            </div>
            <Button
              sx={{
                backgroundColor: '#007bff',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
              onClick={() => setEdit(true)}
            >
              Manage
            </Button>
          </div>
        </div>

        <div className='mt-12 grid lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <div className='bg-white p-6 shadow-lg rounded-lg'>
              <h2 className='font-bold text-lg mb-4'>About {company.name}</h2>
              <p className='text-gray-700 text-sm'>
                {isExpanded
                  ? company_description
                  : company_description.substring(0, 200)}
              </p>
              <Button
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  color: 'blue',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'blue',
                  },
                }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </Button>
            </div>

            <div className='bg-white p-6 shadow-lg rounded-lg mt-8'>
              <h2 className='font-bold text-lg mb-4'>
                Jobs from {company.name}
              </h2>
              {jobs.map((job, index) => (
                <div
                  key={index}
                  className='bg-gray-100 p-4 rounded-lg shadow-md mb-4'
                >
                  <div className='flex items-center mb-2'>
                    <img
                      className='w-10 h-10 rounded-full mr-4'
                      src={logo}
                      alt='companyLogo'
                    />
                    <div>
                      <h3 className='font-bold'>{job.title}</h3>
                      <p className='text-gray-500'>{job.location}</p>
                    </div>
                  </div>
                  <div className='flex space-x-4'>
                    <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>
                      {job.jobType}
                    </span>
                    <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>
                      {job.jobMode}
                    </span>
                    <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>
                      {job.salary}
                    </span>
                  </div>
                  <p className='text-gray-500 text-xs mt-2'>
                    {job.jobPostDays} days ago · {job.applicants.length}{' '}
                    applicants
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='font-bold text-lg mb-4'>People at {company.name}</h2>
            {company.employees.map((employee, index) => (
              <div key={index} className='flex items-center mb-4'>
                <img
                  className='w-10 h-10 rounded-full mr-4 object-cover'
                  src={employee.user.profilePicture || personImage}
                  alt='person'
                />
                <div>
                  <p className='font-bold'>{employee.user.firstName}</p>
                  <p className='text-gray-500 text-sm'>
                    {employee.position || 'Recruiter'}
                  </p>
                </div>
              </div>
            ))}
            <Button
              sx={{
                width: '100%',
                border: '1px solid #007bff',
                color: '#007bff',
                '&:hover': {
                  backgroundColor: '#007bff',
                  color: 'white',
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
