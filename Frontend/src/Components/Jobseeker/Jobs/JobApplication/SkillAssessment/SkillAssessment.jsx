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

  // Prevent back navigation
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // This triggers the browser's "Are you sure you want to leave?" dialog.
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handlePopState = (event) => {
  //     setAlertMessage("Navigation back is not allowed!");
  //     setOpenAlert(true);
  //     window.history.pushState(null, null, window.location.pathname);
  //   };

  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, []);

  // Prevent copy-paste
  useEffect(() => {
    const handlePaste = (event) => {
      setAlertMessage('Pasting code is not allowed!')
      setOpenAlert(true)
      event.preventDefault()
    }

    const handleCopy = (event) => {
      setAlertMessage('Copying code is not allowed!')
      setOpenAlert(true)
      event.preventDefault()
    }

    window.addEventListener('paste', handlePaste)
    window.addEventListener('copy', handleCopy)

    return () => {
      window.removeEventListener('paste', handlePaste)
      window.removeEventListener('copy', handleCopy)
    }
  }, [])

  // Fetch assessments
  useEffect(() => {
    const getAssessments = async () => {
      const data = await jobseeker.getAssessmentById(id)
      if (data.status === 200) {
        setAssessments(data.data.assessment)
        console.log('Assessments received', data.data.assessment)
        setLoading(false)
        setInitialCode(data.data.assessment.problems[0].initialCode) // Set initial code for the first problem
      } else {
        console.log('Error fetching assessments')
      }
    }
    getAssessments()
  }, [id])

  // Full-screen mode
  useEffect(() => {
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
      }
    }

    enterFullScreen()

    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }, [])

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
    const languageId = getLanguageId(currentProblem.language || 'javascript')
    const token = await Judge0.submitCodeToJudge0(code, languageId, 'hello')
    let result

    if (token) {
      let status = 'queued'
      while (status === 'queued' || status === 'running') {
        result = await Judge0.checkSubmissionStatus(token)
        status = result.status.description

        if (status === 'accepted' || true) {
          // break;
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
      _id: currentProblem._id, // Accessing currentProblem directly
    }

    setSubmittedCode((prev) => [...prev, newCode])

    console.log('Result', result)
    const data = {
      problemId: currentProblem._id,
      code,
      timeSpent,
      keystrokes,
      actualOutput: result.stdout ? result.stdout.split('\n')[index] : '',
      passed: result.status.description === 'Accepted' && !result.stderr,
      error: result.stderr,
      // result: {
      //   error: result.stderr,
      //   time: result.time,
      //   stdout: result.stdout,
      //   status: result.status.description,
      // },
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

    // if (currentProblemIndex < assessments.problems.length - 1) {
    //   setCurrentProblemIndex(currentProblemIndex + 1);
    //   setInitialCode(assessments.problems[currentProblemIndex + 1].initialCode); // Update initial code for the next problem
    // } else {
    //   const assessmentData = {
    //     assessmentId: assessments._id,
    //     answers: userCode,
    //   }

    //   console.log("Assessment Data" , assessmentData);
    //   handleState("skillAssessment", data);
    //   setSubmitApplication(true);
    // }
  }
  const handleFinalSubmit = () => {
    const assessmentData = {
      assessmentId: assessments._id,
      answers: userCode,
    }

    // Updating parent state after assessment completion
    handleState('skillAssessment', assessmentData)

    // Optionally navigate the user to a different page or show confirmation
    // navigate("/jobseeker/dashboard");
  }

  useEffect(() => {
    if (submitApplication) {
      handleFinalSubmit()
    }
  }, [submitApplication]) // This ensures state update happens after rendering

  const handleCloseDisclaimer = () => {
    setOpenDisclaimer(false)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  if (loading) {
    return <Loader />
  }

  const currentProblem = assessments.problems[currentProblemIndex]

  if (submitApplication) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
        <div className='bg-white shadow-md rounded-lg p-6 max-w-md w-full'>
          <h2 className='text-2xl font-bold text-center text-green-600 mb-4'>
            Application Submitted Successfully!
          </h2>
          <p className='text-center text-gray-700 mb-6'>
            Thank you for completing the skill assessment. Your application has
            been submitted.
          </p>
          <div className='text-left text-gray-700 mb-4'>
            <h3 className='text-lg font-semibold mb-2'>Summary:</h3>
            <ul className='list-disc list-inside'>
              <li>Job ID: {id}</li>
              <li>User ID: 92934234</li>
              <li>Status: Applied</li>
              {/* Add more summary details as needed */}
            </ul>
          </div>
          <button
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200'
            onClick={() => {
              setSubmitApplication(true)
              // navigate("/jobseeker/dashboard");
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
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
        <p>{currentProblem.initialCode}</p>
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