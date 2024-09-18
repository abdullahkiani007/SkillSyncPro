import React from 'react'
import { FaFileUpload, FaClipboardCheck } from 'react-icons/fa' // Importing icons

const ProfileToolsCard = () => {
  return (
    <div className='bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-2xl shadow-2xl border border-transparent p-8 transform transition duration-700 hover:scale-105 hover:shadow-2xl'>
      <h2 className='text-4xl font-bold mb-8 text-center'>Profile Tools</h2>
      <div>
        <h3 className='text-2xl font-semibold mb-4'>Resume Management</h3>
        <button className='p-4 bg-white text-yellow-600 rounded-xl flex items-center justify-center space-x-2 hover:bg-yellow-500 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1 shadow-lg'>
          <FaFileUpload />
          <span>Upload Resume</span>
        </button>

        <h3 className='text-2xl font-semibold mt-8 mb-4'>Skills Assessment</h3>
        <button className='p-4 bg-white text-pink-600 rounded-xl flex items-center justify-center space-x-2 hover:bg-pink-500 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1 shadow-lg'>
          <FaClipboardCheck />
          <span>Take Assessment</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileToolsCard
