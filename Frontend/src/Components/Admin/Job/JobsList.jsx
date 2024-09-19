import React, { useState, useEffect } from 'react'
import { FaArchive, FaTrashAlt } from 'react-icons/fa'

// Initial static data for jobs
const staticJobs = [
  {
    _id: '1',
    title: 'Frontend Developer',
    companyName: 'Tech Solutions',
    location: 'San Francisco, CA',
    applicantCount: 34,
    postedAt: '2024-09-01',
    archived: false,
  },
  {
    _id: '2',
    title: 'Backend Engineer',
    companyName: 'InnovateX',
    location: 'New York, NY',
    applicantCount: 25,
    postedAt: '2024-09-10',
    archived: false,
  },
  {
    _id: '3',
    title: 'UI/UX Designer',
    companyName: 'Creative Minds',
    location: 'Austin, TX',
    applicantCount: 17,
    postedAt: '2024-09-05',
    archived: false,
  },
]

const ManageJobs = () => {
  const [jobs, setJobs] = useState(staticJobs) // Using static data

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        // Uncomment the line below to fetch jobs from the API once it's ready
        // const response = await admin.getJobsForAdmin(token);
        // setJobs(response.data.jobs);
      } catch (error) {
        console.error('Failed to fetch jobs', error)
      }
    }

    fetchJobs()
  }, [])

  const handleArchiveJob = async (jobId) => {
    try {
      // Simulate archiving action
      setJobs(
        jobs.map((job) =>
          job._id === jobId ? { ...job, archived: true } : job
        )
      )
    } catch (error) {
      console.error('Failed to archive job', error)
    }
  }

  const handleDeleteJob = async (jobId) => {
    try {
      // Simulate delete action
      setJobs(jobs.filter((job) => job._id !== jobId))
    } catch (error) {
      console.error('Failed to delete job', error)
    }
  }

  return (
    <div className='bg-gradient-to-br from-orange-300 via-pink-200 to-purple-400 p-8 rounded-lg shadow-2xl'>
      <h2 className='text-4xl font-bold text-gray-900 mb-6 text-center'>
        Manage Jobs
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gradient-to-r from-purple-600 to-blue-600 text-white'>
            <tr>
              <th className='py-4 px-4 text-left'>Title</th>
              <th className='py-4 px-4 text-left'>Company</th>
              <th className='py-4 px-4 text-left'>Location</th>
              <th className='py-4 px-4 text-left'>Applicants</th>
              <th className='py-4 px-4 text-left'>Posted At</th>
              <th className='py-4 px-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {jobs.map((job) => (
              <tr key={job._id} className='border-b hover:bg-purple-100'>
                <td className='py-4 px-4'>{job.title}</td>
                <td className='py-4 px-4'>{job.companyName}</td>
                <td className='py-4 px-4'>{job.location}</td>
                <td className='py-4 px-4'>{job.applicantCount}</td>
                <td className='py-4 px-4'>
                  {new Date(job.postedAt).toLocaleDateString()}
                </td>
                <td className='py-4 px-4'>
                  <div className='flex items-center space-x-4'>
                    {!job.archived ? (
                      <button
                        onClick={() => handleArchiveJob(job._id)}
                        className='text-indigo-500 hover:text-indigo-700 focus:outline-none'
                        title='Archive Job'
                      >
                        <FaArchive className='w-5 h-5' />
                      </button>
                    ) : (
                      <span className='text-gray-500'>Archived</span>
                    )}
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className='text-red-500 hover:text-red-700 focus:outline-none'
                      title='Delete Job'
                    >
                      <FaTrashAlt className='w-5 h-5' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageJobs
