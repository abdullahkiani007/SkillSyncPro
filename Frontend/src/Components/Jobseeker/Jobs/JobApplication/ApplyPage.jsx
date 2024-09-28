import React, { useState } from 'react'

const InterviewPage = () => {
  const [answer, setAnswer] = useState('')
  const [video, setVideo] = useState(null)

  const handleFileChange = (e) => {
    setVideo(e.target.files[0])
  }

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log('Answer:', answer)
    if (video) {
      console.log('Video file selected:', video.name)
    }
  }

  return (
    <div className='container mx-auto p-4 min-h-screen flex flex-col justify-center'>
      <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>
          Interview Section
        </h1>
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Instructions
          </h2>
          <p className='text-gray-600'>
            Please answer the following questions to the best of your ability.
            You can either upload a video or type your answers below.
          </p>
        </div>

        <div className='mt-8'>
          <label className='block mb-2 text-lg font-medium text-gray-700'>
            Question 1: Tell us about a time you solved a problem at work.
          </label>
          <textarea
            className='w-full px-4 py-3 mb-6 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            rows='6'
            placeholder='Type your answer here...'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </div>

        <div className='mt-8'>
          <label className='block mb-2 text-lg font-medium text-gray-700'>
            Upload Video Response (Optional):
          </label>
          <input
            type='file'
            accept='video/*'
            className='w-full p-3 border border-gray-300 rounded-md mb-6'
            onChange={handleFileChange}
          />
        </div>

        <div className='mt-10 flex justify-center space-x-4'>
          <button
            className='bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200'
            onClick={handleSubmit}
          >
            Submit Interview
          </button>
          <button
            className='bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200'
            onClick={() => console.log('Cancel')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default InterviewPage
