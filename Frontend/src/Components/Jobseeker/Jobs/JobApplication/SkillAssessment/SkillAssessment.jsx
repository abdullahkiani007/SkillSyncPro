import React, { useState, useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material'
import CodeEditor from './CodingEnvironment' // Adjust the path as needed
import Loader from '../../../../Loader/Loader'
import jobseeker from '../../../../../API/jobseeker'
import Judge0 from '../../../../../API/Assessment'
import { useNavigate } from 'react-router-dom'

const SkillAssessment = () => {
  const navigate = useNavigate()
  const [openDisclaimer, setOpenDisclaimer] = useState(true)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { goToNextStep, handleState } = useOutletContext()
  const [assessments, setAssessments] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [submittedCode, setSubmittedCode] = useState([])
  const [initialCode, setInitialCode] = useState('') // State for initial code
  const [userCode, setUserCode] = useState([]) // State for user code
  const { id } = useParams()
  const [submitApplication, setSubmitApplication] = useState(false)

  // Fetch assessments
  useEffect(() => {
    const getAssessments = async () => {
      try {
        const data = await jobseeker.getAssessmentById(id)
        if (data.status === 200) {
          setAssessments(data.data.assessment)
          setLoading(false)
          setInitialCode(data.data.assessment.problems[0].initialCode) // Set initial code for the first problem
        } else {
          console.log('Error fetching assessments')
        }
      } catch (error) {
        console.error('Error fetching assessment data', error)
        setLoading(false)
      }
    }
    getAssessments()
  }, [id])

  const getLanguageId = (language) => {
    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62,
      // Add other languages and their IDs here
    }

    return languageMap[language.toLowerCase()] || 63 // Default to JavaScript if unknown
  }

  const handleCodeSubmit = async (code, timeSpent, keystrokes) => {
    const currentProblem = assessments.problems[currentProblemIndex]
    const languageId = getLanguageId(currentProblem.language || 'javascript')
    const token = await Judge0.submitCodeToJudge0(code, languageId, 'hello')
    let result

    if (token) {
      let status = 'queued'
      while (status === 'queued' || status === 'running') {
        result = await Judge0.checkSubmissionStatus(token)
        status = result.status.description

        if (status === 'accepted' || true) {
          // Handle accepted or continue checking status
          continue
        } else if (false) {
          setAlertMessage('Code rejected: ' + result.status.description)
          setOpenAlert(true)
          break
        }
      }
    }

    const newCode = {
      code,
      timeSpent,
      keystrokes,
      _id: currentProblem._id,
    }

    setSubmittedCode((prev) => [...prev, newCode])

    const data = {
      problemId: currentProblem._id,
      code,
      timeSpent,
      keystrokes,
      actualOutput: result.stdout ? result.stdout.split('\n')[0] : '', // Handling output
      passed: result.status.description === 'Accepted' && !result.stderr,
      error: result.stderr,
    }

    setUserCode((prev) => {
      const updatedUserCode = [...prev, data]

      if (currentProblemIndex < assessments.problems.length - 1) {
        setCurrentProblemIndex(currentProblemIndex + 1)
        setInitialCode(
          assessments.problems[currentProblemIndex + 1].initialCode
        ) // Update initial code for the next problem
      } else {
        setSubmitApplication(true) // Trigger submit after all problems are done
      }

      return updatedUserCode
    })
  }

  const handleFinalSubmit = () => {
    const assessmentData = {
      assessmentId: assessments._id,
      answers: userCode,
    }

    // Updating parent state after assessment completion
    handleState('skillAssessment', assessmentData)
  }

  useEffect(() => {
    if (submitApplication) {
      handleFinalSubmit()
    }
  }, [submitApplication])

  const handleCloseDisclaimer = () => {
    setOpenDisclaimer(false)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  if (loading) {
    return <Loader />
  }

  // Add a check to ensure the assessments and problems exist before rendering
  if (!assessments || !assessments.problems || !assessments.problems.length) {
    return <div>Error loading assessment data</div>
  }

  const currentProblem = assessments.problems[currentProblemIndex]

  if (!currentProblem) {
    return <div>Problem data not available</div>
  }

  return (
    <div className='skill-assessment-container p-5 bg-gray-900 text-white min-h-screen'>
      <Dialog
        open={openDisclaimer}
        onClose={handleCloseDisclaimer}
        aria-labelledby='disclaimer-dialog-title'
        aria-describedby='disclaimer-dialog-description'
      >
        <DialogTitle id='disclaimer-dialog-title'>Disclaimer</DialogTitle>
        <DialogContent>
          <Typography>
            This is a coding challenge to assess your skills. Please do not copy
            code from external sources or other candidates. Your code should be
            original and written by you.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisclaimer} color='primary'>
            I Understand
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        action={
          <Button color='inherit' onClick={handleCloseAlert}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleCloseAlert}
          severity='error'
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Typography variant='h4' className='text-xl font-semibold mb-4'>
        Coding Challenge {currentProblemIndex + 1} /{' '}
        {assessments.problems.length}
      </Typography>

      <div className='problem-statement mb-4'>
        <Typography variant='h5' className='mb-2'>
          {currentProblem.title}
        </Typography>
        <Typography variant='body1'>{currentProblem.description}</Typography>
        <Typography variant='body2' className='mt-4'>
          <strong>Input:</strong> {currentProblem.input}
        </Typography>
        <Typography variant='body2'>
          <strong>Output:</strong> {currentProblem.output}
        </Typography>
      </div>

      <CodeEditor
        key={currentProblemIndex} // Add key to force re-render
        initialCode={initialCode}
        onSubmit={handleCodeSubmit}
        language={currentProblem.language || 'javascript'}
      />
    </div>
  )
}

export default SkillAssessment
