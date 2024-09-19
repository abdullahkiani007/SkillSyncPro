import React, { useState } from 'react'
import { CircularProgress, Alert, Fade } from '@mui/material'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import ReactMarkdown from 'react-markdown'
import resumeApi from '../../../API/resume'

const TailorResume = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tailoredResume, setTailoredResume] = useState('')
  const [similarityIndex, setSimilarityIndex] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0])
  }

  const handleUpload = (event) => {
    setJobDescription(event.target.value)
  }

  const handleSubmit = async (event, calculateSimilarity = false) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('jobDescription', jobDescription)
    formData.append('resume', resumeFile)
    let response

    try {
      const url = calculateSimilarity
        ? (response = await resumeApi.checkSimilarity(formData))
        : (response = await resumeApi.tailorResume(formData))

      if (calculateSimilarity) {
        setSimilarityIndex(response.data.similarity)
      } else {
        setTailoredResume(response.data.tailored_resume)
      }
    } catch (error) {
      setError('Error processing request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto p-8 mt-16 max-w-5xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-lg rounded-lg transition-all duration-500'>
      <h1 className='text-5xl text-center text-white font-extrabold mb-6 animate-pulse'>
        Tailor Your Resume
      </h1>
      <p className='text-center text-gray-400 mb-8 text-lg'>
        Upload your job description and resume in PDF format to get a customized
        resume or calculate similarity.
      </p>

      <form>
        <div className='mb-8'>
          <textarea
            className='w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md p-4 h-48 focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all duration-300'
            placeholder='Paste the job description here...'
            value={jobDescription}
            onChange={handleUpload}
          />
        </div>

        <div className='flex items-center mb-8'>
          <input
            accept='application/pdf'
            id='resume-upload'
            type='file'
            className='hidden'
            onChange={handleFileChange}
          />
          <label htmlFor='resume-upload'>
            <button
              type='button'
              className='bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 flex items-center'
            >
              <CloudUploadIcon className='mr-2' />
              Upload Resume (PDF)
            </button>
          </label>
          {resumeFile && <p className='ml-4 text-white'>{resumeFile.name}</p>}
        </div>

        <div className='text-center space-x-6 mt-6'>
          <button
            onClick={(e) => handleSubmit(e, false)}
            className='w-48 bg-purple-600 text-white rounded-full px-6 py-3 shadow-lg hover:bg-purple-700 hover:shadow-2xl transition-transform transform hover:scale-105 duration-300'
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} className='text-white' />
            ) : (
              'Tailor Resume'
            )}
          </button>

          <button
            onClick={(e) => handleSubmit(e, true)}
            className='w-48 bg-purple-600 text-white rounded-full px-6 py-3 shadow-lg hover:bg-purple-700 hover:shadow-2xl transition-transform transform hover:scale-105 duration-300'
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} className='text-white' />
            ) : (
              'Calculate Similarity'
            )}
          </button>
        </div>
      </form>

      {error && (
        <Fade in={!!error}>
          <Alert severity='error' className='mt-6'>
            {error}
          </Alert>
        </Fade>
      )}

      {tailoredResume && (
        <Fade in={!!tailoredResume}>
          <div className='mt-12 p-6 bg-gray-800 rounded-lg shadow-2xl transition-transform transform hover:scale-105 hover:rotate-2 duration-500'>
            <h2 className='text-2xl text-orange-400 font-bold mb-4'>
              Tailored Resume
            </h2>
            <ReactMarkdown className='text-white'>
              {tailoredResume}
            </ReactMarkdown>
          </div>
        </Fade>
      )}

      {similarityIndex && (
        <Fade in={!!similarityIndex}>
          <div className='mt-6 p-6 bg-gray-800 rounded-lg shadow-2xl transition-transform transform hover:scale-105 hover:-rotate-2 duration-500 text-center'>
            <h2 className='text-2xl text-orange-400 font-bold mb-4'>
              Similarity Index
            </h2>
            <p className='text-3xl text-orange-300'>{similarityIndex} / 100</p>
          </div>
        </Fade>
      )}
    </div>
  )
}

export default TailorResume
