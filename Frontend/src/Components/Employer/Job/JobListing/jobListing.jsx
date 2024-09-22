import React, { useState, useEffect } from 'react'
import EmployeeController from '../../../../API/employer'
import Loader from '../../../Loader/Loader'
import JobCard from './jobCard'

const JobListing = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('active')

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await EmployeeController.getJobs(token)

        if (response.status === 200) {
          const jobsData = response.data.data
          setJobs(jobsData)
          setFilteredJobs(jobsData.filter((job) => !job.archived))
          localStorage.setItem('empJobs', JSON.stringify(jobsData))
        } else {
          throw new Error('Failed to fetch jobs')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setFilteredJobs(
      jobs.filter((job) => job.archived === (category === 'archived'))
    )
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <h1 className='text-red-500 text-xl font-semibold'>{error}</h1>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-secondary-dark to-secondary-dark mx-auto p-4'>
      {/* Category Filter */}
      <div className='flex justify-center mb-8'>
        <button
          className={`px-6 py-3 mr-2 rounded-lg font-semibold transition-all duration-200 ${
            selectedCategory === 'active'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleCategoryChange('active')}
        >
          <span role='img' aria-label='active'>
            💼
          </span>{' '}
          Active Jobs
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            selectedCategory === 'archived'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleCategoryChange('archived')}
        >
          <span role='img' aria-label='archived'>
            🗄️
          </span>{' '}
          Archived Jobs
        </button>
      </div>

      {/* Job Listings */}
      <section>
        {filteredJobs.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredJobs.map((job) => (
              <JobCard job={job} key={job._id} />
            ))}
          </div>
        ) : (
          <div className='text-center text-gray-500'>
            <p className='text-lg'>No jobs available in this category.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default JobListing
