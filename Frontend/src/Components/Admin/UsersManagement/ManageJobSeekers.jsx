import React, { useState, useEffect } from 'react'
import admin from '../../../API/admin'
import { FaEye, FaArchive, FaTrashAlt } from 'react-icons/fa'

const ManageJobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([])
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await admin.getJobSeekersForAdmin(token)
        setJobSeekers(response.data.jobSeekers)
      } catch (error) {
        console.error('Failed to fetch job seekers', error)
      }
    }

    fetchJobSeekers()
  }, [])

  const handleArchiveJobSeeker = async (jobSeekerId) => {
    try {
      await admin.put(`/api/admin/jobseekers/${jobSeekerId}/archive`)
      setJobSeekers(
        jobSeekers.map((jobSeeker) =>
          jobSeeker._id === jobSeekerId
            ? { ...jobSeeker, archived: true }
            : jobSeeker
        )
      )
    } catch (error) {
      console.error('Failed to archive job seeker', error)
    }
  }

  const handleDeleteJobSeeker = async (jobSeekerId) => {
    try {
      await admin.delete(`/api/admin/jobseekers/${jobSeekerId}`)
      setJobSeekers(
        jobSeekers.filter((jobSeeker) => jobSeeker._id !== jobSeekerId)
      )
    } catch (error) {
      console.error('Failed to delete job seeker', error)
    }
  }

  const openModal = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedJobSeeker(null)
    setIsModalOpen(false)
  }

  return (
    <div className='p-8 bg-gradient-to-r from-secondary-dark to-secondary-dark  min-h-screen'>
      <h2 className='text-4xl font-extrabold text-white   mb-8'>
        Manage Job Seekers
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gradient-to-r from-primary to-primary text-white'>
            <tr>
              <th className='py-3 px-4 text-left'>Name</th>
              <th className='py-3 px-4 text-left'>Email</th>
              <th className='py-3 px-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-slate-700'>
            {jobSeekers.map((jobSeeker) => (
              <tr
                key={jobSeeker._id}
                className='border-b cursor-pointer hover:bg-slate-50 transition-colors'
              >
                <td className='py-4 px-4'>
                  {`${jobSeeker.user?.firstName || 'No data available '} ${
                    jobSeeker.user?.lastName || ''
                  }`}
                </td>
                <td className='py-4 px-4'>
                  {jobSeeker.user?.email || 'No data available '}
                </td>
                <td className='py-4 px-4'>
                  <div className='flex items-center space-x-4'>
                    <button
                      onClick={() => openModal(jobSeeker)}
                      className='text-blue-500 hover:text-blue-700 transition-colors'
                      title='View Details'
                    >
                      <FaEye className='w-5 h-5 text-black' />
                    </button>
                    {!jobSeeker.archived ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleArchiveJobSeeker(jobSeeker._id)
                        }}
                        className='text-teal-500 hover:text-teal-700 transition-colors'
                        title='Archive Job Seeker'
                      >
                        <FaArchive className='w-5 h-5' />
                      </button>
                    ) : (
                      <span className='text-gray-500'>Archived</span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteJobSeeker(jobSeeker._id)
                      }}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Delete Job Seeker'
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

      {/* Enhanced Job Seeker Details Modal */}
      {isModalOpen && selectedJobSeeker && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300'>
          <div className='relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto transition-all duration-500 ease-out transform scale-100'>
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold'
            >
              &times;
            </button>
            <h3 className='text-3xl font-semibold text-slate-800 mb-6 text-center'>
              {`${selectedJobSeeker.user?.firstName || 'No data available '} ${
                selectedJobSeeker.user?.lastName || ''
              }`}
            </h3>
            <div className='flex flex-col space-y-6'>
              <p className='text-lg'>
                <strong>Email:</strong>{' '}
                {selectedJobSeeker.user?.email || 'No data available '}
              </p>
              <div>
                <strong className='block text-lg mb-2'>Skills:</strong>
                <p className='text-gray-600 bg-gray-100 p-4 rounded-md'>
                  {selectedJobSeeker.skills?.length > 0
                    ? selectedJobSeeker.skills.join(', ')
                    : 'No data available '}
                </p>
              </div>
              <div>
                <strong className='block text-lg mb-2'>Experience:</strong>
                {selectedJobSeeker.experience?.length > 0 ? (
                  selectedJobSeeker.experience.map((exp, index) => (
                    <div
                      key={index}
                      className='bg-gray-50 p-4 rounded-md mb-4 shadow-sm'
                    >
                      <p className='text-slate-700 font-medium'>{`${
                        exp.companyName || 'No data available '
                      } - ${exp.role || ''}`}</p>
                      <p className='text-sm text-gray-500'>
                        {exp.startDate
                          ? new Date(exp.startDate).toLocaleDateString()
                          : 'No data available '}{' '}
                        -{' '}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString()
                          : 'Present'}
                      </p>
                      <p className='text-slate-600 mt-2'>
                        {exp.description || 'No data available '}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-600'>No data available </p>
                )}
              </div>
              <div>
                <strong className='block text-lg mb-2'>Education:</strong>
                {selectedJobSeeker.education?.length > 0 ? (
                  selectedJobSeeker.education.map((edu, index) => (
                    <div
                      key={index}
                      className='bg-gray-50 p-4 rounded-md mb-4 shadow-sm'
                    >
                      <p className='text-slate-700 font-medium'>{`${
                        edu.institution || 'No data available '
                      } - ${edu.degree || 'No data available '} in ${
                        edu.fieldOfStudy || 'No data available '
                      }`}</p>
                      <p className='text-sm text-gray-500'>
                        {edu.startDate
                          ? new Date(edu.startDate).toLocaleDateString()
                          : 'No data available '}{' '}
                        -{' '}
                        {edu.endDate
                          ? new Date(edu.endDate).toLocaleDateString()
                          : 'Present'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-600'>No data available </p>
                )}
              </div>
              <div>
                <strong className='block text-lg mb-2'>Certifications:</strong>
                {selectedJobSeeker.certifications?.length > 0 ? (
                  selectedJobSeeker.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className='bg-gray-50 p-4 rounded-md mb-4 shadow-sm'
                    >
                      <p className='text-slate-700 font-medium'>{`${
                        cert.title || 'No data available '
                      } - ${cert.institution || 'No data available '}`}</p>
                      <p className='text-sm text-gray-500'>
                        {cert.date
                          ? new Date(cert.date).toLocaleDateString()
                          : 'No data available '}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-600'>No data available </p>
                )}
              </div>
            </div>
            <button
              onClick={closeModal}
              className='mt-6 w-full py-3 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageJobSeekers
