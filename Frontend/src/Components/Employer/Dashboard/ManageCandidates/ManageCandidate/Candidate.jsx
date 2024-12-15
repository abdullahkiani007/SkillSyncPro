// import { ArrowBack } from '@mui/icons-material'
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Step,
//   StepLabel,
//   Stepper,
//   Tab,
//   Tabs,
//   TextField,
// } from '@mui/material'
// import { useEffect, useState } from 'react'
// import ReactStars from 'react-rating-stars-component'
// import { useParams } from 'react-router-dom'
// import EmployerController from '../../../../../API/employer'

// const Candidate = () => {
//   const { id } = useParams()
//   const applicationId = id

//   const [candidateData, setCandidateData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [tabIndex, setTabIndex] = useState(0) // For managing tabs
//   const [stage, setStage] = useState('')
//   const [feedback, setFeedback] = useState('') // State for feedback
//   const [rating, setRating] = useState(0) // State for rating

//   // Fetch data from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken = localStorage.getItem('accessToken')
//         const response = await EmployerController.getApplication(
//           applicationId,
//           accessToken
//         )
//         const data = response.data
//         console.log('Candidate data: ', data.data)
//         setCandidateData(data.data)
//         setStage(data.data.stage) // Initialize the stage
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching candidate data:', error)
//       }
//     }

//     fetchData()
//   }, [applicationId])

//   const handleStageChange = async (newStage) => {
//     try {
//       const accessToken = localStorage.getItem('accessToken')
//       await EmployerController.updateApplicationStage(
//         applicationId,
//         newStage,
//         accessToken
//       )
//       setStage(newStage) // Update the local state
//     } catch (error) {
//       console.error('Error updating stage:', error)
//     }
//   }

//   const handleFeedbackSubmit = async () => {
//     console.log('applicationId', applicationId)
//     try {
//       const accessToken = localStorage.getItem('accessToken')
//       const response = await EmployerController.submitFeedback(
//         applicationId,
//         { feedback, rating },
//         accessToken
//       )
//       console.log('Feedback response:', response)
//       if (response.status === 201) {
//         alert('Feedback submitted successfully')
//         setFeedback('')
//         setRating(0)
//       } else {
//         alert('Failed to submit feedback')
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error)
//     }
//   }

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (!candidateData) {
//     return <div>No data found for this application.</div>
//   }

//   const statusSteps = [
//     'Applied',
//     'Under Review',
//     'Interview Scheduled',
//     'Rejected',
//     'Accepted',
//   ]

//   const getStatusStepIndex = (status) => {
//     return statusSteps.indexOf(status)
//   }

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue)
//   }

//   return (
//     <div className='bg-gray-100 min-h-screen px-8 py-12'>
//       {/* Header */}
//       <div className='flex items-center mb-8 space-x-5'>
//         <ArrowBack
//           className='text-secondary-dark'
//           fontSize='medium'
//           onClick={() => window.history.back()}
//         />
//         <h1 className='text-xl font-extrabold text-slate-800'>
//           {candidateData.jobTitle}
//         </h1>
//       </div>

//       {/* Candidate Info */}
//       <div className='mb-8 space-y-2'>
//         <p className='text-lg text-slate-700'>
//           <span className='font-semibold'>Candidate Name:</span>{' '}
//           {candidateData.candidateName}
//         </p>
//         <p className='text-lg text-slate-700'>
//           <span className='font-semibold'>Current Status:</span> {stage}
//         </p>
//         <p className='text-lg text-slate-700'>
//           <span className='font-semibold'>Applied Date:</span>{' '}
//           {new Date(candidateData.appliedDate).toLocaleDateString()}
//         </p>
//       </div>

//       {/* Stages - MUI Stepper */}
//       <div className='mb-12'>
//         <Stepper activeStep={getStatusStepIndex(stage)} alternativeLabel>
//           {statusSteps.map((stage, index) => (
//             <Step key={index}>
//               <StepLabel>{stage}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//       </div>

//       {/* Tabs */}
//       <Tabs
//         value={tabIndex}
//         onChange={handleTabChange}
//         indicatorColor='primary'
//       >
//         <Tab label='Review Application' />
//         <Tab label='Job Description' />
//         <Tab label='Change Stage' />
//         <Tab label='Feedback' />
//       </Tabs>

//       {/* Tab Panels */}
//       {tabIndex === 0 && (
//         <div>
//           {/* Resume */}
//           {candidateData.resume && (
//             <div className='mb-8'>
//               <h3 className='text-xl font-semibold text-slate-800 mb-2'>
//                 Resume:
//               </h3>
//               <a
//                 href={candidateData.resume}
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='text-blue-500 underline'
//               >
//                 Download/View Resume
//               </a>
//             </div>
//           )}

//           {/* Video Introduction */}
//           {candidateData.videoIntroduction && (
//             <div className='mb-8'>
//               <h3 className='text-xl font-semibold text-slate-800 mb-2'>
//                 Video Introduction:
//               </h3>
//               <video
//                 controls
//                 className='w-96 rounded-lg shadow-lg'
//                 src={candidateData.videoIntroduction}
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}

//           {/* Candidate Assessment */}
//           {candidateData.candidateAssessment && (
//             <div className='bg-white rounded-lg shadow-lg p-6'>
//               <h2 className='text-2xl font-bold text-slate-800 mb-4'>
//                 Coding Assessment
//               </h2>

//               {candidateData.candidateAssessment.answers.map(
//                 (answer, index) => (
//                   <div key={index} className='mb-6'>
//                     <h3 className='text-xl font-semibold text-slate-800 mb-2'>
//                       Problem: {answer.problemTitle}
//                     </h3>
//                     <p className='text-slate-700 mb-2'>
//                       <span className='font-semibold'>Code:</span>
//                     </p>
//                     <pre className='bg-gray-100 p-4 rounded-md overflow-auto'>
//                       {answer.code}
//                     </pre>
//                     <p className='text-slate-700 mb-2'>
//                       <span className='font-semibold'>Passed:</span>{' '}
//                       {answer.passed ? 'Yes' : 'No'}
//                     </p>
//                     <p className='text-slate-700 mb-2'>
//                       <span className='font-semibold'>Time Spent:</span>{' '}
//                       {answer.timeSpent} ms
//                     </p>
//                     <p className='text-slate-700 mb-2'>
//                       <span className='font-semibold'>Keystrokes:</span>{' '}
//                       {answer.keystrokes}
//                     </p>
//                     {answer.error && (
//                       <p className='text-slate-700 mb-2'>
//                         <span className='font-semibold'>Error:</span>{' '}
//                         {answer.error}
//                       </p>
//                     )}
//                   </div>
//                 )
//               )}
//             </div>
//           )}
//         </div>
//       )}
//       {tabIndex === 1 && (
//         <div>
//           <h3 className='text-xl font-semibold text-slate-800 mb-2'>
//             Job Description:
//           </h3>
//           <p>{candidateData.jobDescription}</p>
//         </div>
//       )}
//       {tabIndex === 2 && (
//         <div>
//           <h3 className='text-xl font-semibold text-slate-800 mb-2'>
//             Change Stage:
//           </h3>
//           <FormControl fullWidth>
//             <InputLabel id='stage-label'>Stage</InputLabel>
//             <Select
//               labelId='stage-label'
//               id='stage'
//               value={stage}
//               onChange={(e) => setStage(e.target.value)}
//             >
//               {statusSteps.map((step) => (
//                 <MenuItem key={step} value={step}>
//                   {step}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Button
//             variant='contained'
//             color='primary'
//             onClick={() => handleStageChange(stage)}
//           >
//             Update Stage
//           </Button>
//         </div>
//       )}
//       {tabIndex === 3 && (
//         <div>
//           <h3 className='text-xl font-semibold text-slate-800 mb-2'>
//             Feedback:
//           </h3>
//           <p>{candidateData.feedback}</p>
//           <div className='mt-4'>
//             <TextField
//               label='Feedback'
//               multiline
//               rows={4}
//               variant='outlined'
//               fullWidth
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//             />
//             <div className='mt-4'>
//               <label className='text-lg font-semibold text-slate-800 mb-2'>
//                 Rating:
//               </label>
//               <ReactStars
//                 count={5}
//                 onChange={(newRating) => setRating(newRating)}
//                 size={24}
//                 activeColor='#ffd700'
//                 value={rating}
//               />
//             </div>
//             <Button
//               variant='contained'
//               color='primary'
//               onClick={handleFeedbackSubmit}
//               className='mt-4'
//             >
//               Submit Feedback
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Candidate

import { ArrowBack, FileDownload } from '@mui/icons-material'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useParams } from 'react-router-dom'
import EmployerController from '../../../../../API/employer'

const Candidate = () => {
  const { id } = useParams()
  const applicationId = id

  const [candidateData, setCandidateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tabIndex, setTabIndex] = useState(0) // For managing tabs
  const [stage, setStage] = useState('')
  const [feedback, setFeedback] = useState('') // State for feedback
  const [rating, setRating] = useState(0) // State for rating

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

  const handleFeedbackSubmit = async () => {
    console.log('applicationId', applicationId)
    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await EmployerController.submitFeedback(
        applicationId,
        { feedback, rating },
        accessToken
      )
      console.log('Feedback response:', response)
      if (response.status === 201) {
        alert('Feedback submitted successfully')
        setFeedback('')
        setRating(0)
      } else {
        alert('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
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
    <div className='bg-white min-h-screen px-8 py-12 mb-10'>
      {/* Header */}
      <div className='flex items-center mb-10 space-x-6'>
        <ArrowBack
          className='text-secondary-dark cursor-pointer hover:text-primary transition-all duration-300'
          fontSize='medium'
          onClick={() => window.history.back()}
        />
        <h1 className='text-4xl font-extrabold text-black'>
          Application for {candidateData.jobTitle}
        </h1>
      </div>

      {/* Candidate Info */}
      <div className='bg-white p-6 rounded-lg shadow-lg mb-10'>
        <div className='space-y-4'>
          <p className='text-lg text-black'>
            <span className='font-semibold text-primary'>Candidate Name:</span>{' '}
            {candidateData.candidateName}
          </p>
          <p className='text-xl text-black'>
            <span className='font-semibold text-primary'>Current Status:</span>{' '}
            {stage}
          </p>
          <p className='text-xl text-black'>
            <span className='font-semibold text-primary'>Applied Date:</span>{' '}
            {new Date(candidateData.appliedDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stages - MUI Stepper */}
      <div className='mb-12'>
        <Stepper
          activeStep={getStatusStepIndex(stage)}
          alternativeLabel
          sx={{
            '.MuiStep-root': {
              marginBottom: '20px', // Adds space between the steps
              '& .MuiStepLabel-root': {
                fontSize: '1.125rem', // Makes the step label text size more prominent
              },
            },
            '.MuiStepIcon-root': {
              color: 'rgba(0, 0, 0, 0.4)', // Default step icon color (light gray)
              '&.Mui-active': {
                color: '#007BFF', // Color when the step is active (primary blue)
              },
              '&.Mui-completed': {
                color: '#28a745', // Color for completed steps (green)
              },
            },
          }}
        >
          {statusSteps.map((stage, index) => (
            <Step key={index}>
              <StepLabel sx={{ fontWeight: 600 }}>{stage}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Tabs */}
      <div className='w-full mb-12'>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary' // Ensures active tab text is primary color
          sx={{
            display: 'flex', // Ensures tabs are aligned horizontally
            justifyContent: 'space-between', // Spreads tabs across full width
            borderBottom: '2px solid #ddd', // Adds a subtle border below the tabs
            '.MuiTabs-flexContainer': {
              width: '100%', // Make the flex container take full width
            },
            '.MuiTab-root': {
              padding: '10px 20px', // Adds padding to make tabs larger and more clickable
              fontWeight: '600', // Bold text for better visibility
              fontSize: '1.1rem', // Slightly larger font size for tab labels
              '&.Mui-selected': {
                color: '#007BFF', // Active tab text color
                fontWeight: 'bold', // Bold font on active tab
              },
              '&:hover': {
                color: '#007BFF', // Hover effect to indicate interactivity
              },
            },
          }}
        >
          <Tab label='Review Application' />
          <Tab label='Job Description' />
          <Tab label='Change Stage' />
          <Tab label='Feedback' />
        </Tabs>
      </div>

      {/* Tab Panels */}
      {tabIndex === 0 && (
        <div>
          {/* Resume */}
          {candidateData.resume && (
            <div className='mb-8'>
              <h3 className='text-xl font-semibold text-black mb-2'>Resume:</h3>
              <a
                href={candidateData.resume}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline flex items-center space-x-2'
              >
                <FileDownload fontSize='medium' className='text-blue-500' />{' '}
                {/* Add Icon */}
                <span>Download/View Resume</span>
              </a>
            </div>
          )}

          {/* Video Introduction */}
          {candidateData.videoIntroduction && (
            <div className='mb-8'>
              <h3 className='text-xl font-semibold text-black mb-2'>
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
            <div className='bg-white rounded-lg shadow-lg p-6 mb-10'>
              <h2 className='text-2xl font-bold text-black mb-4'>
                Coding Assessment
              </h2>

              {candidateData.candidateAssessment.answers.map(
                (answer, index) => (
                  <div key={index} className='mb-6'>
                    <h3 className='text-xl font-semibold text-black mb-2'>
                      Problem: {answer.problemTitle}
                    </h3>
                    <p className='text-black mb-2'>
                      <span className='font-semibold'>Code:</span>
                    </p>
                    <pre className='bg-gray-100 p-4 rounded-md overflow-auto'>
                      {answer.code}
                    </pre>
                    <p className='text-black mb-2'>
                      <span className='font-semibold'>Passed:</span>{' '}
                      {answer.passed ? 'Yes' : 'No'}
                    </p>
                    <p className='text-black mb-2'>
                      <span className='font-semibold'>Time Spent:</span>{' '}
                      {answer.timeSpent} ms
                    </p>
                    <p className='text-black mb-2'>
                      <span className='font-semibold'>Keystrokes:</span>{' '}
                      {answer.keystrokes}
                    </p>
                    {answer.error && (
                      <p className='text-black mb-2'>
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
          <h3 className='text-xl font-semibold text-black mb-2'>
            Job Description:
          </h3>
          <p>{candidateData.jobDescription}</p>
        </div>
      )}
      {tabIndex === 2 && (
        <div className='mb-12 space-y-6'>
          <h3 className='text-xl font-semibold text-black'>Change Status:</h3>
          <FormControl fullWidth variant='outlined'>
            <InputLabel id='stage-label'>Status</InputLabel>
            <Select
              labelId='stage-label'
              id='stage'
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              label='Status'
              sx={{
                backgroundColor: '#fff', // White background for select dropdown
                borderRadius: '8px', // Rounded corners
              }}
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
            sx={{
              padding: '10px 20px',
              fontWeight: 'bold',
              borderRadius: '8px', // Rounded corners
              textTransform: 'none', // No uppercase transformation for button text
              '&:hover': {
                backgroundColor: '#004a89', // Darker blue on hover
              },
            }}
          >
            Update Status
          </Button>
        </div>
      )}
      {tabIndex === 3 && (
        <div className='space-y-6'>
          <h3 className='text-2xl font-bold text-black'>Feedback:</h3>
          <p className='text-lg text-gray-700'>
            {candidateData.feedback || 'No feedback provided yet.'}
          </p>

          <div>
            <TextField
              label='Your Feedback'
              multiline
              rows={4}
              variant='outlined'
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
              }}
            />
          </div>

          <div>
            <label className='text-lg font-semibold text-black mb-2 block'>
              Rating:
            </label>
            <ReactStars
              count={5}
              onChange={(newRating) => setRating(newRating)}
              size={30} // Slightly larger stars for better visibility
              activeColor='#ffd700'
              value={rating}
            />
          </div>

          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={handleFeedbackSubmit}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                borderRadius: '8px',
                textTransform: 'none',
                backgroundColor: '#007BFF',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Candidate
