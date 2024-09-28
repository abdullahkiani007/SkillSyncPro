import React, { useState, useEffect } from 'react'
import JobSeekerController from '../../../API/jobseeker'
import JobCard from './JobCard'
import { MdWork, MdLocationOn, MdMonetizationOn, MdSort } from 'react-icons/md' // Icons for filters
import { FaChevronDown } from 'react-icons/fa' // Dropdown icon

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredJobs, setFilteredJobs] = useState([])
  const [filters, setFilters] = useState({
    designer: 'all',
    location: 'all',
    experience: 'all',
    salary: 'all',
    salaryRange: 20000,
  })
  const [showFilters, setShowFilters] = useState(false) // State to toggle dropdown

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await JobSeekerController.getJobs()
        setJobs(data.jobs)
        setFilteredJobs(data.jobs)
        setLoading(false)
        localStorage.setItem('jobs', JSON.stringify(data.jobs))
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleFilterChange = (e) => {
    const { id, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }))
  }

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState)
  }

  return (
    <div className='font-sans flex flex-col min-h-screen bg-gray-50'>
      <div className='p-5'>
        {/* Filter Dropdown */}
        <div className='relative'>
          <button
            className='flex items-center justify-between p-4 bg-white shadow-md rounded-lg w-full md:w-2/3 lg:w-1/2'
            onClick={toggleFilters}
          >
            <span className='font-bold text-gray-700'>Select Filters</span>
            <FaChevronDown className='text-gray-500' />
          </button>
          {showFilters && (
            <div className='absolute w-full md:w-2/3 lg:w-1/2 mt-2 bg-white rounded-lg shadow-lg p-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5'>
                {/* Role Filter */}
                <div className='flex flex-col'>
                  <label
                    className='font-bold flex items-center space-x-2'
                    htmlFor='designer'
                  >
                    <MdWork className='text-emerald-600' />
                    <span>Role</span>
                  </label>
                  <select
                    id='designer'
                    className='p-2 border border-gray-300 rounded'
                    onChange={handleFilterChange}
                  >
                    <option value='all'>All</option>
                    <option value='ui/ux'>UI/UX</option>
                    <option value='graphic'>Graphic</option>
                    <option value='motion'>Motion</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div className='flex flex-col'>
                  <label
                    className='font-bold flex items-center space-x-2'
                    htmlFor='location'
                  >
                    <MdLocationOn className='text-emerald-600' />
                    <span>Location</span>
                  </label>
                  <select
                    id='location'
                    className='p-2 border border-gray-300 rounded'
                    onChange={handleFilterChange}
                  >
                    <option value='all'>All</option>
                    <option value='san-francisco'>San Francisco</option>
                    <option value='new-york'>New York</option>
                    <option value='california'>California</option>
                  </select>
                </div>

                {/* Experience Filter */}
                <div className='flex flex-col'>
                  <label
                    className='font-bold flex items-center space-x-2'
                    htmlFor='experience'
                  >
                    <MdWork className='text-emerald-600' />
                    <span>Experience</span>
                  </label>
                  <select
                    id='experience'
                    className='p-2 border border-gray-300 rounded'
                    onChange={handleFilterChange}
                  >
                    <option value='all'>All</option>
                    <option value='junior'>Junior</option>
                    <option value='middle'>Middle</option>
                    <option value='senior'>Senior</option>
                  </select>
                </div>

                {/* Salary Filter */}
                <div className='flex flex-col'>
                  <label
                    className='font-bold flex items-center space-x-2'
                    htmlFor='salary'
                  >
                    <MdMonetizationOn className='text-emerald-600' />
                    <span>Salary (per month)</span>
                  </label>
                  <select
                    id='salary'
                    className='p-2 border border-gray-300 rounded'
                    onChange={handleFilterChange}
                  >
                    <option value='all'>All</option>
                    <option value='1200-2000'>1,200 - 2,000</option>
                    <option value='2000-3000'>2,000 - 3,000</option>
                    <option value='3000-4000'>3,000 - 4,000</option>
                  </select>
                </div>

                {/* Salary Range Slider */}
                <div className='flex flex-col'>
                  <label
                    className='font-bold flex items-center space-x-2'
                    htmlFor='salaryRange'
                  >
                    <MdMonetizationOn className='text-emerald-600' />
                    <span>Salary Range</span>
                  </label>
                  <input
                    type='range'
                    id='salaryRange'
                    min='1200'
                    max='20000'
                    className='p-2 border border-gray-300 rounded'
                    onChange={handleFilterChange}
                    value={filters.salaryRange}
                  />
                  <span>{filters.salaryRange}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Listing Section */}
        <div className='p-5 rounded-lg shadow-md bg-white mt-5'>
          <div className='flex justify-between items-center mb-5'>
            <div className='text-xl font-bold'>Recommended jobs</div>
            <div className='text-lg font-bold'>{filteredJobs.length}</div>
            <div className='flex space-x-2 items-center'>
              <label htmlFor='sort' className='font-semibold'>
                Sort by:
              </label>
              <select id='sort' className='p-2 border border-gray-300 rounded'>
                <option value='last-updated'>Last updated</option>
                <option value='salary'>Salary</option>
                <option value='date'>Date</option>
              </select>
            </div>
          </div>

          {/* Job Cards - 3 in a Row, Wider */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                props={job}
                className='w-full hover:shadow-lg transition-shadow rounded-md p-6 border border-gray-300'
              />
            ))}
          </div>
        </div>

        {/* Pagination Section */}
        <div className='flex justify-center mt-5 space-x-5'>
          <button className='py-2 px-4 border rounded border-gray-300 text-gray-600 hover:bg-gray-200'>
            1
          </button>
          <button className='py-2 px-4 border rounded border-gray-300 text-gray-600 hover:bg-gray-200'>
            2
          </button>
          <button className='py-2 px-4 border rounded border-gray-300 text-gray-600 hover:bg-gray-200'>
            3
          </button>
          <button className='py-2 px-4 border rounded border-gray-300 text-gray-600 hover:bg-gray-200'>
            4
          </button>
          <button className='py-2 px-4 border rounded border-gray-300 text-gray-600 hover:bg-gray-200'>
            ...
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className='bg-gray-800 text-white py-6 mt-10 text-center'>
        <p>
          &copy; {new Date().getFullYear()} SkillSync Pro. All Rights Reserved.
        </p>
        <div className='flex justify-center space-x-5 mt-2'>
          <a href='#' className='hover:text-emerald-400'>
            Privacy Policy
          </a>
          <a href='#' className='hover:text-emerald-400'>
            Terms of Service
          </a>
          <a href='#' className='hover:text-emerald-400'>
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Jobs
