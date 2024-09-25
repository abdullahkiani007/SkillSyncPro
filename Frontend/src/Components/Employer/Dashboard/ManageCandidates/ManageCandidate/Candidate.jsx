import React, { useState, useEffect } from 'react'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Tabs,
  Tab,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import EmployerController from '../../../../../API/employer'
import { useParams } from 'react-router-dom'

const Candidate = () => {
  const { id } = useParams()
  const applicationId = id

  const [candidateData, setCandidateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tabIndex, setTabIndex] = useState(0) // For managing tabs
  const [stage, setStage] = useState('')

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await EmployerController.getApplication(
          applicationId,
          accessToken
        )
        const data = response.data
        console.log('Candidate data: ', data.data)
        setCandidateData(data.data)
        setStage(data.data.stage) // Initialize the stage
        setLoading(false)
      } catch (error) {
        console.error('Error fetching candidate data:', error)
      }
    }

    fetchData()
  }, [applicationId])

  const handleStageChange = async (newStage) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      await EmployerController.updateApplicationStage(
        applicationId,
        newStage,
        accessToken
      )
      setStage(newStage) // Update the local state
    } catch (error) {
      console.error('Error updating stage:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!candidateData) {
    return <div>No data found for this application.</div>
  }

  const statusSteps = [
    'Applied',
    'Under Review',
    'Interview Scheduled',
    'Rejected',
    'Accepted',
  ]

  const getStatusStepIndex = (status) => {
    return statusSteps.indexOf(status)
  }

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  return (
    <div className='bg-gray-100 min-h-screen px-8 py-12'>
      {/* Header */}
      <div className='flex items-center mb-8 space-x-5'>
        <ArrowBack
          className='text-secondary-dark'
          fontSize='medium'
          onClick={() => window.history.back()}
        />
        <h1 className='text-xl font-extrabold text-slate-800'>
          {candidateData.jobTitle}
        </h1>
      </div>

      {/* Candidate Info */}
      <div className='mb-8 space-y-2'>
        <p className='text-lg text-slate-700'>
          <span className='font-semibold'>Candidate Name:</span>{' '}
          {candidateData.candidateName}
        </p>
        <p className='text-lg text-slate-700'>
          <span className='font-semibold'>Current Status:</span> {stage}
        </p>
        <p className='text-lg text-slate-700'>
          <span className='font-semibold'>Applied Date:</span>{' '}
          {new Date(candidateData.appliedDate).toLocaleDateString()}
        </p>
      </div>

      {/* Stages - MUI Stepper */}
      <div className='mb-12'>
        <Stepper activeStep={getStatusStepIndex(stage)} alternativeLabel>
          {statusSteps.map((stage, index) => (
            <Step key={index}>
              <StepLabel>{stage}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor='primary'
      >
        <Tab label='Review Application' />
        <Tab label='Job Description' />
        <Tab label='Change Stage' />
      </Tabs>

      {/* Tab Panels */}
      {tabIndex === 0 && (
        <div>
          {/* Resume */}
          {candidateData.resume && (
            <div className='mb-8'>
              <h3 className='text-xl font-semibold text-slate-800 mb-2'>
                Resume:
              </h3>
              <a
                href={candidateData.resume}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline'
              >
                Download/View Resume
              </a>
            </div>
          )}

          {/* Video Introduction */}
          {candidateData.videoIntroduction && (
            <div className='mb-8'>
              <h3 className='text-xl font-semibold text-slate-800 mb-2'>
                Video Introduction:
              </h3>
              <video
                controls
                className='w-96 rounded-lg shadow-lg'
                src={candidateData.videoIntroduction}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Candidate Assessment */}
          {candidateData.candidateAssessment && (
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-2xl font-bold text-slate-800 mb-4'>
                Coding Assessment
              </h2>

              {candidateData.candidateAssessment.answers.map(
                (answer, index) => (
                  <div key={index} className='mb-6'>
                    <h3 className='text-xl font-semibold text-slate-800 mb-2'>
                      Problem: {answer.problemTitle}
                    </h3>
                    <p className='text-slate-700 mb-2'>
                      <span className='font-semibold'>Code:</span>
                    </p>
                    <pre className='bg-gray-100 p-4 rounded-md overflow-auto'>
                      {answer.code}
                    </pre>
                    <p className='text-slate-700 mb-2'>
                      <span className='font-semibold'>Passed:</span>{' '}
                      {answer.passed ? 'Yes' : 'No'}
                    </p>
                    <p className='text-slate-700 mb-2'>
                      <span className='font-semibold'>Time Spent:</span>{' '}
                      {answer.timeSpent} ms
                    </p>
                    <p className='text-slate-700 mb-2'>
                      <span className='font-semibold'>Keystrokes:</span>{' '}
                      {answer.keystrokes}
                    </p>
                    {answer.error && (
                      <p className='text-red-500 mb-2'>
                        <span className='font-semibold'>Error:</span>{' '}
                        {answer.error}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {tabIndex === 1 && (
        <div>
          {/* Job Description */}
          <h3 className='text-xl font-semibold text-slate-800 mb-2'>
            Job Description:
          </h3>
          <p>{candidateData.jobDescription}</p>
        </div>
      )}

      {tabIndex === 2 && (
        <div>
          <h3 className='text-xl font-semibold text-slate-800 mb-2'>
            Change Application Stage:
          </h3>
          <FormControl fullWidth variant='outlined' className='mb-4'>
            <InputLabel>Stage</InputLabel>
            <Select
              value={stage}
              onChange={(e) => handleStageChange(e.target.value)}
              label='Stage'
            >
              {statusSteps.map((step) => (
                <MenuItem key={step} value={step}>
                  {step}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleStageChange(stage)}
          >
            Update Stage
          </Button>
        </div>
      )}
    </div>
  )
}

export default Candidate
