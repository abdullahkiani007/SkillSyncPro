import React, { useState, useEffect } from 'react'
import {
  FaLaptopCode,
  FaDatabase,
  FaDev,
  FaCloud,
  FaCode,
} from 'react-icons/fa'

const jobs = [
  {
    title: 'Frontend Developer at Amazon',
    icon: <FaLaptopCode className='text-teal-600 text-3xl' />,
    description: 'Build user interfaces and enhance user experience.',
    location: 'Seattle, WA',
    link: 'https://www.amazon.jobs/en/jobs/123456/frontend-developer',
  },
  {
    title: 'Data Analyst at Microsoft',
    icon: <FaDatabase className='text-orange-600 text-3xl' />,
    description: 'Analyze data to drive business solutions.',
    location: 'Redmond, WA',
    link: 'https://careers.microsoft.com/us/en/job/789012/data-analyst',
  },
  {
    title: 'DevOps Engineer at IBM',
    icon: <FaDev className='text-purple-600 text-3xl' />,
    description: 'Implement CI/CD pipelines and manage infrastructure.',
    location: 'Armonk, NY',
    link: 'https://www.ibm.com/employment/devops-engineer',
  },
  {
    title: 'Cloud Engineer at Google',
    icon: <FaCloud className='text-blue-500 text-3xl' />,
    description: 'Design and manage cloud solutions.',
    location: 'Mountain View, CA',
    link: 'https://careers.google.com/jobs/results/456789/cloud-engineer/',
  },
  {
    title: 'Backend Developer at Facebook',
    icon: <FaCode className='text-pink-500 text-3xl' />,
    description: 'Develop and maintain server-side applications.',
    location: 'Menlo Park, CA',
    link: 'https://www.facebook.com/careers/jobs/12345678/backend-developer',
  },
]

const JobSuggestions = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [interactionTimeout, setInteractionTimeout] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)

  const nextJob = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(jobs.length / 2))
  }

  const prevJob = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(jobs.length / 2)) %
        Math.ceil(jobs.length / 2)
    )
  }

  useEffect(() => {
    let interval
    if (isAutoplay) {
      interval = setInterval(() => {
        nextJob()
      }, 3000) // Change slide every 3 seconds
    }

    return () => clearInterval(interval) // Cleanup on unmount
  }, [isAutoplay, currentIndex])

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
          {jobs.map((job, index) => (
            <li
              key={index}
              className='flex items-center bg-white p-4 rounded-lg shadow-lg mx-2 min-w-[300px] 
                         hover:shadow-2xl transition-shadow duration-200 
                         hover:scale-105 hover:bg-gray-50 cursor-pointer'
              onClick={() => handleJobClick(job)} // Attach click handler
            >
              <div className='flex items-center'>
                {job.icon}
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
            prevJob()
            handleButtonClick()
          }}
          className='bg-white p-2 rounded-full shadow-md hover:bg-gray-200'
        >
          ❮
        </button>
        <button
          onClick={() => {
            nextJob()
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
