import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import { Button, CircularProgress, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import resumeApi from '../../../API/resume'

const TailorResume = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tailoredResume, setTailoredResume] = useState('')
  const [similarityIndex, setSimilarityIndex] = useState('')

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0])
  }

  const handleUpload = (event) => {
    setJobDescription(event.target.value)
  }

  const handleSubmit = async (event, calculateSimilarity = false) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('jobDescription', jobDescription)
    formData.append('resume', resumeFile)
    let response

    try {
      const url = calculateSimilarity
        ? (response = await resumeApi.checkSimilarity(formData))
        : (response = await resumeApi.tailorResume(formData))

      console.log(response)

      if (calculateSimilarity) {
        setSimilarityIndex(response.data.similarity)
      } else {
        setTailoredResume(response.data.tailored_resume)
      }
    } catch (error) {
      console.error('Error processing request:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 mt-12 w-full  '>
      <div className=' w-2/3 m-auto p-8 rounded-3xl '>
        <h1 className='text-5xl font-poppins font-bold mb-6 text-center text-black'>
          Tailor Your Resume
        </h1>
        <p className='text-center text-black mb-8 leading-relaxed text-lg'>
          Upload your job description and resume in PDF format to get a
          customized resume or calculate similarity.
        </p>

        <form className='space-y-8'>
          <div>
            <TextField
              label='Job Description'
              multiline
              rows={6}
              variant='outlined'
              fullWidth
              value={jobDescription}
              onChange={handleUpload}
              placeholder='Paste the job description here...'
              className='shadow-sm'
              sx={{
                backgroundColor: '#ffffff', // Light gray for text field
                borderRadius: '12px', // Rounded corners
              }}
            />
          </div>

          <div className='flex items-center space-x-4'>
            <input
              accept='application/pdf'
              className='hidden'
              id='resume-upload'
              type='file'
              onChange={handleFileChange}
            />
            <label htmlFor='resume-upload'>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#fff', // Muted purple color
                  color: 'black',
                  borderRadius: '20px', // Rounded buttons
                  padding: '10px 20px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid black',
                  '&:hover': {
                    backgroundColor: '#26242c',
                    color: 'white', // Lighter purple on hover
                  },
                }}
                component='span'
                startIcon={<CloudUploadIcon />}
              >
                Upload Resume (PDF)
              </Button>
            </label>
            {resumeFile && <p className='text-gray-300'>{resumeFile.name}</p>}
          </div>

          <div className='text-center space-x-8 mt-12'>
            <Button
              onClick={(e) => handleSubmit(e, false)}
              variant='contained'
              disabled={loading}
              sx={{
                background: 'white', // Orange gradient
                color: 'black',
                borderRadius: '20px', // Rounded buttons
                padding: '10px 20px',
                fontSize: '1rem',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid black',
                '&:hover': {
                  background: '#26242c',
                  color: 'white', // Reverse gradient on hover
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} className='text-white' />
              ) : (
                'Tailor Resume'
              )}
            </Button>

            <Button
              onClick={(e) => handleSubmit(e, true)}
              variant='contained'
              disabled={loading}
              sx={{
                background: 'white', // Orange gradient
                color: 'black',
                borderRadius: '20px', // Rounded buttons
                padding: '10px 20px',
                fontSize: '1rem',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid black',
                '&:hover': {
                  background: '#26242c',
                  color: 'white', // Reverse gradient on hover
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} className='text-white' />
              ) : (
                'Calculate Similarity'
              )}
            </Button>
          </div>
        </form>

        {tailoredResume && (
          <div className='mt-12 p-6 rounded-lg bg-opacity-50 bg-gray-900 shadow-inner'>
            <h2 className='text-2xl font-semibold text-gray-200 mb-4'>
              Tailored Resume
            </h2>
            <div className='prose text-gray-300'>
              <ReactMarkdown>{tailoredResume}</ReactMarkdown>
            </div>
          </div>
        )}

        {similarityIndex && (
          <div className='mt-6 p-6 rounded-lg bg-opacity-50 bg-gray-800 shadow-inner text-center'>
            <h2 className='text-2xl font-semibold text-gray-200 mb-4'>
              Similarity Index
            </h2>
            <p className='text-4xl text-teal-300 font-bold'>
              {similarityIndex} / 100
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TailorResume
