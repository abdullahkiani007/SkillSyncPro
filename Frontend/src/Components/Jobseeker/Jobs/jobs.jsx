import React, { useState, useEffect } from 'react'
import JobSeekerController from '../../../API/jobseeker'
import JobCard from './JobCard'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import JobFilter from './JobFilter'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredJobs, setFilteredJobs] = useState([])
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [showRecommended, setShowRecommended] = useState(false) // State for toggle
  const [searchParams] = useSearchParams()

  const userId = useSelector((store) => store.user)._id

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const { data } = await JobSeekerController.getJobs()

        let jobs = data.jobs.filter((job) => !job.archived)
        const formData = new FormData()
        formData.append('user_id', userId)

        const recommendedJobsResponse =
          await JobSeekerController.getRecommendedJbs(formData)
        console.log('recommendedJobs: ', recommendedJobsResponse)

        const recommendedJobIds = recommendedJobsResponse.recommended_jobs
        console.log('jobs ', jobs)

        // Filter jobs based on recommended IDs
        const filteredRecommendedJobs = jobs.filter(
          (job) => recommendedJobIds.includes(job._id) // Assuming job._id matches the recommended job ID
        )

        setJobs(jobs)
        setRecommendedJobs(filteredRecommendedJobs)
        localStorage.setItem('jobs', JSON.stringify(jobs))
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [userId])

  useEffect(() => {
    filterJobs()
  }, [searchParams, jobs])

  const filterJobs = () => {
    let filtered = [...jobs]

    // Filtering by query params (as you have implemented)
    const requirements = searchParams.get('requirements')
    const company = searchParams.get('company')
    const location = searchParams.get('location')
    const salaryRange = searchParams.get('salaryRange')
    const employmentType = searchParams.get('employmentType')
    const applicants = searchParams.get('applicants')

    if (requirements) {
      filtered = filtered.filter((job) =>
        job.requirements?.toLowerCase().includes(requirements?.toLowerCase())
      )
    }

    if (company) {
      filtered = filtered.filter((job) =>
        job.company?.toLowerCase().includes(company?.toLowerCase())
      )
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location?.toLowerCase())
      )
    }

    if (salaryRange) {
      const [minSalary, maxSalary] = salaryRange.split('-')
      filtered = filtered.filter((job) => {
        const salary = parseInt(job.salaryRange.replace(/[^0-9]/g, ''))
        return salary >= minSalary && salary <= maxSalary
      })
    }

    if (employmentType) {
      filtered = filtered.filter((job) =>
        job.employmentType
          ?.toLowerCase()
          .includes(employmentType?.toLowerCase())
      )
    }

    if (applicants) {
      filtered = filtered.filter(
        (job) => job.applicants.length <= parseInt(applicants)
      )
    }

    setFilteredJobs(filtered)
  }

  return (
    <div className='font-sans flex flex-col min-h-screen bg-gray-100'>
      <div className='p-5'>
        <JobFilter />
        <div className='p-5 rounded-lg shadow-md'>
          <div className='flex justify-between items-center mb-5'>
            <div className='text-xl font-bold'>Jobs</div>
            <div className='flex space-x-2 items-center'>
              <label htmlFor='show-recommended' className='font-semibold'>
                Show Recommended Jobs Only:
              </label>
              <input
                type='checkbox'
                id='show-recommended'
                checked={showRecommended}
                onChange={() => setShowRecommended(!showRecommended)}
              />
            </div>
            <div className='text-lg font-bold'>
              {(showRecommended
                ? recommendedJobs.length
                : filteredJobs.length) || 0}
            </div>
          </div>
          <div className='flex flex-wrap justify-around'>
            {(showRecommended ? recommendedJobs : filteredJobs).map((job) => (
              <JobCard key={job._id} props={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
