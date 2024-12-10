import React, { useEffect, useState } from 'react'
import {
  FaCloud,
  FaCode,
  FaDatabase,
  FaDev,
  FaLaptopCode,
} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import JobSeekerController from '../../../API/jobseeker'

const JobSuggestions = () => {
  const [jobs, setJobs] = useState([])
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [showRecommended, setShowRecommended] = useState(false) // State for toggle
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [interactionTimeout, setInteractionTimeout] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)

  const userId = useSelector((store) => store.user)._id

  // Fetch jobs from the backend API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const { data } = await JobSeekerController.getJobsById(userId)

        let jobs = data.jobs.filter((job) => !job.archived && !job.applied)

        const formData = new FormData()
        formData.append('user_id', userId)

        const recommendedJobsResponse =
          await JobSeekerController.getRecommendedJbs(formData)

        // Check if recommended_jobs exists and is an array before calling sort
        if (
          recommendedJobsResponse?.recommended_jobs &&
          Array.isArray(recommendedJobsResponse.recommended_jobs)
        ) {
          // Sort recommended jobs on the basis of similarity score
          recommendedJobsResponse.recommended_jobs.sort(
            (a, b) => b.similarity_score - a.similarity_score
          )

          const recommendedJobIds =
            recommendedJobsResponse.recommended_jobs.map((job) => job.job_id)

          // Filter jobs based on recommended IDs and add similarity score to each job
          const filteredRecommendedJobs = jobs
            .filter((job) => recommendedJobIds.includes(job._id))
            .map((job) => {
              const recommendedJob =
                recommendedJobsResponse.recommended_jobs.find(
                  (rj) => rj.job_id === job._id
                )
              return {
                ...job,
                similarity_score: recommendedJob.similarity_score,
              }
            })

          setRecommendedJobs(filteredRecommendedJobs)
        } else {
          setRecommendedJobs([]) // Fallback to empty array if recommended_jobs is not available
        }

        setJobs(jobs)
        localStorage.setItem('jobs', JSON.stringify(jobs))
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [userId])

  // Handle autoplay for job suggestions
  useEffect(() => {
    let interval
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % Math.ceil(jobs.length / 2)
        )
      }, 3000) // Change slide every 3 seconds
    }

    return () => clearInterval(interval) // Cleanup on unmount
  }, [isAutoplay, currentIndex, jobs.length])

  const handleButtonClick = () => {
    setIsAutoplay(false) // Pause autoplay when navigating
    if (interactionTimeout) clearTimeout(interactionTimeout)

    const timeout = setTimeout(() => {
      setIsAutoplay(true)
    }, 5000) // Resume autoplay after 5 seconds
    setInteractionTimeout(timeout)
  }

  const handleJobClick = (job) => {
    setSelectedJob(job) // Set selected job details
  }

  // Conditional rendering based on loading or error states
  if (loading) return <div>Loading jobs...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='bg-gradient-to-br from-teal-400 to-blue-500 p-6 rounded-xl mb-8 shadow-lg'>
      <h2 className='text-3xl font-bold mb-6 text-white text-center'>
        Job Suggestions
      </h2>
      <div className='relative overflow-hidden'>
        <ul
          className='flex transition-transform duration-500'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {(showRecommended ? recommendedJobs : jobs).map((job, index) => (
            <li
              key={index}
              className='flex items-center bg-white p-4 rounded-lg shadow-lg mx-2 min-w-[300px] 
                         hover:shadow-2xl transition-shadow duration-200 
                         hover:scale-105 hover:bg-gray-50 cursor-pointer'
              onClick={() => handleJobClick(job)} // Attach click handler
            >
              <div className='flex items-center'>
                {job.icon || (
                  <FaLaptopCode className='text-teal-600 text-3xl' />
                )}
                <span className='text-lg font-semibold text-gray-800 ml-3'>
                  {job.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-between mt-4'>
        <button
          onClick={() => {
            setCurrentIndex(
              (prevIndex) =>
                (prevIndex - 1 + Math.ceil(jobs.length / 2)) %
                Math.ceil(jobs.length / 2)
            )
            handleButtonClick()
          }}
          className='bg-white p-2 rounded-full shadow-md hover:bg-gray-200'
        >
          ❮
        </button>
        <button
          onClick={() => {
            setCurrentIndex(
              (prevIndex) => (prevIndex + 1) % Math.ceil(jobs.length / 2)
            )
            handleButtonClick()
          }}
          className='bg-white p-2 rounded-full shadow-md hover:bg-gray-200'
        >
          ❯
        </button>
      </div>

      {selectedJob && (
        <div className='mt-6 p-4 bg-white rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105'>
          <h3 className='text-xl font-bold text-teal-600'>
            {selectedJob.title}
          </h3>
          <p className='text-gray-700 mt-2'>{selectedJob.description}</p>
          <p className='text-gray-500 italic'>{selectedJob.location}</p>
          <a
            href={selectedJob.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline mt-2 block'
          >
            View Job Details
          </a>
          <button
            onClick={() => setSelectedJob(null)}
            className='mt-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors duration-200'
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default JobSuggestions
