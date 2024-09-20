import React from 'react'
import { FaSearch, FaBookmark, FaFileAlt } from 'react-icons/fa'

const JobManagementCard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {/* Card 1 - Job Search */}
      <div className='bg-gray-800 text-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl self-start'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaSearch className='mr-2' /> Job Search
        </h2>
        <input
          type='text'
          placeholder='Search for jobs...'
          className='w-full p-2 border border-gray-300 rounded-lg mb-4 text-black'
        />

        {/* Recent Activity under Job Search */}
        <h3 className='text-xl font-semibold mt-4 mb-2'>Recent Activity</h3>
        <ul className='text-gray-300'>
          <li className='mb-2'>Applied for Software Engineer at Google</li>
          <li className='mb-2'>Completed Profile Assessment</li>
          <li className='mb-2'>Updated Resume</li>
        </ul>
      </div>

      {/* Card 2 - Saved Jobs */}
      <div className='bg-teal-500 text-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl '>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaBookmark className='mr-2' /> Saved Jobs
        </h2>
        <ul>
          <li className='mb-2'>Software Engineer at Google</li>
          <li className='mb-2'>Frontend Developer at Facebook</li>
        </ul>
      </div>

      {/* Card 3 - Application Status */}
      <div className='bg-orange-500 text-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl '>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <FaFileAlt className='mr-2' /> Application Status
        </h2>
        <ul>
          <li className='mb-2'>Google - Pending</li>
          <li className='mb-2'>Facebook - Interview Scheduled</li>
        </ul>
      </div>
    </div>
  )
}

export default JobManagementCard
