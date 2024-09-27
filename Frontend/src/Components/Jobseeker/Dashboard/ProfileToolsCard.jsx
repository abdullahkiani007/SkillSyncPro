import React, { useState } from 'react'
import { FaFileUpload, FaClipboardCheck } from 'react-icons/fa'
import JobSeeker from "../../../API/jobseeker"
import {useSelector} from "react-redux"


const ProfileToolsCard = () => {
  const [resume, setResume] = useState(null)
  const [userId] = useState( useSelector((state) => state.user)._id)  // Replace with dynamic user_id
  const [uploadStatus, setUploadStatus] = useState('')  // To show upload success/failure message
; // Fetch user from Redux store

  // Function to handle resume upload
  const handleUploadResume = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setResume(file)

      try {
        const response = await JobSeeker.uploadResume(userId, file)  // Call API to upload resume
        setUploadStatus(response.success || response.error)  // Update status based on response
      } catch (error) {
        setUploadStatus('Failed to upload resume')
      }
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    document.getElementById('resumeInput').click()
  }

  return (
    <div className='bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-2xl shadow-2xl border border-transparent p-8 transform transition duration-700 hover:scale-105 hover:shadow-2xl'>
      <h2 className='text-4xl font-bold mb-8 text-center'>Profile Tools</h2>
      <div>
        <h3 className='text-2xl font-semibold mb-4'>Resume Management</h3>
        {/* Hidden file input */}
        <input
          id='resumeInput'
          type='file'
          accept='.pdf'
          style={{ display: 'none' }}
          onChange={handleUploadResume}  // Upload file on selection
        />
        <button
          className='p-4 bg-white text-yellow-600 rounded-xl flex items-center justify-center space-x-2 hover:bg-yellow-500 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1 shadow-lg'
          onClick={triggerFileInput}  // Trigger file input on button click
        >
          <FaFileUpload />
          <span>Upload Resume</span>
        </button>
        {uploadStatus && <p className="mt-4">{uploadStatus}</p>}  {/* Display upload status */}

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
