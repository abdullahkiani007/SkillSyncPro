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
    <div className='bg-gradient-to-br from-orange-400 via-purple-300 to-purple-600 p-10 rounded-xl shadow-lg'>
      <h2 className='text-4xl font-extrabold text-white mb-8 text-center'>
        Manage Jobs
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-lg rounded-xl overflow-hidden'>
          <thead className='bg-gradient-to-r from-purple-700 via-orange-600 to-red-500 text-white'>
            <tr>
              <th className='py-5 px-6 text-left text-lg'>Title</th>
              <th className='py-5 px-6 text-left text-lg'>Company</th>
              <th className='py-5 px-6 text-left text-lg'>Location</th>
              <th className='py-5 px-6 text-left text-lg'>Applicants</th>
              <th className='py-5 px-6 text-left text-lg'>Posted At</th>
              <th className='py-5 px-6 text-left text-lg'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-900'>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className='border-b hover:bg-gradient-to-r from-purple-50 to-orange-50'
              >
                <td className='py-5 px-6 text-md font-medium'>{job.title}</td>
                <td className='py-5 px-6 text-md font-medium'>
                  {job.companyName}
                </td>
                <td className='py-5 px-6 text-md'>{job.location}</td>
                <td className='py-5 px-6 text-md'>{job.applicantCount}</td>
                <td className='py-5 px-6 text-md'>
                  {new Date(job.postedAt).toLocaleDateString()}
                </td>
                <td className='py-5 px-6'>
                  <div className='flex items-center space-x-5'>
                    {!job.archived ? (
                      <button
                        onClick={() => handleArchiveJob(job._id)}
                        className='text-blue-500 hover:text-blue-700 transition ease-in-out duration-300 focus:outline-none'
                        title='Archive Job'
                      >
                        <FaArchive className='w-6 h-6' />
                      </button>
                    ) : (
                      <span className='text-gray-500'>Archived</span>
                    )}
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className='text-red-500 hover:text-red-700 transition ease-in-out duration-300 focus:outline-none'
                      title='Delete Job'
                    >
                      <FaTrashAlt className='w-6 h-6' />
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
