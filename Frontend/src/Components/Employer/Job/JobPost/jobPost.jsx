import { ArrowBack, ArrowForward, CheckCircle, Send } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import Slider from '@mui/material/Slider'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployerController from '../../../../API/employer'
import { skillsList } from '../../../../constants'

const JobPost = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [assessments, setAssessments] = useState([])
  const [completed, setCompleted] = useState({})
  const [submited, setSubmited] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [company, setCompany] = useState({})
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    requirements: '',
    company: '',
    location: '',
    salaryRange: [0, 100000], // Ensure this is an array
    employmentType: '',
    experienceLevel: '',
    skillAssessment: '',
    skills: [],
    generateRandomProblem: false,
  })
  const navigate = useNavigate()
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }, [message])

  useEffect(() => {
    let company = JSON.parse(localStorage.getItem('company'))
    setCompany(company)
    setFormValues((prevValues) => ({
      ...prevValues,
      company: company._id,
    }))
  }, [])

  useEffect(() => {
    const getAssessments = async () => {
      const company = JSON.parse(localStorage.getItem('company'))

      const data = await EmployerController.getAssessments(
        localStorage.getItem('token'),
        company._id
      )
      if (data.status === 200) {
        setAssessments(data.data.assessment)
      } else {
        console.log('Error fetching assessments')
      }
    }
    getAssessments()
  }, [])

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    console.log(completedSteps(), totalSteps())

    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    console.log(completed)
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    let isValid = true
    const newCompleted = completed

    switch (activeStep) {
      case 0:
        if (!formValues.title || !formValues.location) isValid = false
        break
      case 1:
        if (!formValues.description || !formValues.requirements) isValid = false
        break
      case 2:
        if (
          !formValues.company ||
          !formValues.salaryRange ||
          !formValues.employmentType ||
          !formValues.experienceLevel ||
          formValues.skills.length === 0
        )
          isValid = false
        break
      case 3:
        if (!formValues.skillAssessment) isValid = false
        break
      default:
        isValid = false
    }

    if (isValid) {
      newCompleted[activeStep] = true
      setCompleted(newCompleted)
      handleNext()
    } else {
      setMessage('Please fill in all required fields before proceeding.')
      setError(true)
    }
  }

  const handleSliderChange = (event, newValue) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      salaryRange: newValue,
    }))
    console.log(formValues)
  }

  const handleReset = () => {
    setSubmissionError('')
    setSubmited(false)
    setActiveStep(0)
    setCompleted({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSkillChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      skills: event.target.value,
    }))
  }
  const handleSkillAssessmentChange = (event) => {
    console.log('skill assessment', event.target.value)
    setFormValues((prevValues) => ({
      ...prevValues,
      skillAssessment: event.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('accessToken')
    const formattedValues = {
      ...formValues,
      salaryRange: `${formValues.salaryRange[0]}-${formValues.salaryRange[1]}`,
    }
    console.log(formattedValues)
    try {
      const response = await EmployerController.postJob(formattedValues, token)
      console.log(response)
      if (response.status === 200) {
        setSubmited(true)
        setTimeout(() => {
          setMessage('Job Posted Successfully')
          // navigate("/employer/jobs");
        }, 3000)
      } else {
        setSubmited(true)
        setSubmissionError('Error Posting Job')
        setMessage('Error Posting Job')
        setError(true)
      }
    } catch (error) {
      setSubmited(true)
      setSubmissionError('Error Posting Job')
      console.log(error)
      setMessage('Error Posting Job')
      setError(true)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card className='mb-5 mx-10 p-10 bg-white  rounded-full'>
            <div>
              <h1 className='font-bold text-lg text-black'>Title:</h1>
              <div className='pl-3 pt-2'>
                <TextField
                  className='w-full'
                  id='title'
                  name='title'
                  label='Title'
                  variant='outlined'
                  value={formValues.title}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: 'black' }, // Text color
                  }}
                  InputLabelProps={{
                    style: { color: 'black' }, // Label color
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'black', // Border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className='mt-4'>
              <h1 className='font-bold text-lg text-black'>Location:</h1>
              <div className='pl-3 pt-2'>
                <TextField
                  className='w-full'
                  id='location'
                  name='location'
                  label='Location'
                  variant='outlined'
                  value={formValues.location}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: 'black' }, // Text color
                  }}
                  InputLabelProps={{
                    style: { color: 'black' }, // Label color
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'black', // Border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        )
      case 1:
        return (
          <Card
            className='mb-5 mx-10 p-10 h-96 bg-white'
            sx={{ overflowY: 'scroll' }}
          >
            <div>
              <h1 className='font-bold text-lg text-black'>Description:</h1>
              <TextField
                className='w-full mt-2 pl-3'
                id='description'
                name='description'
                label='Description'
                variant='outlined'
                multiline
                value={formValues.description}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />
            </div>

            <div className='mt-4'>
              <h1 className='font-bold text-lg text-black'>Requirements:</h1>
              <TextField
                className='w-full mt-2 pl-3'
                id='requirements'
                name='requirements'
                label='Requirements'
                variant='outlined'
                multiline
                rows={6} // Set this to control the initial height
                maxRows={10} // Set this to control the maximum height
                value={formValues.requirements}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />
            </div>
          </Card>
        )
      case 2:
        return (
          <Card className='mb-5 mx-10 p-10 bg-white'>
            {/* Salary Range Section */}
            <div className='mt-4'>
              <h1 className='font-bold text-lg text-black'>Salary Range:</h1>
              <div className='pl-3 pt-2'>
                <Slider
                  value={formValues.salaryRange}
                  onChange={handleSliderChange}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={100000}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 25000, label: '25K' },
                    { value: 50000, label: '50K' },
                    { value: 75000, label: '75K' },
                    { value: 100000, label: '100K' },
                  ]}
                  sx={{
                    color: 'black', // Slider track and thumb color
                    '& .MuiSlider-markLabel': {
                      color: 'black', // Mark labels color
                    },
                    '& .MuiSlider-valueLabel': {
                      color: 'black', // The value label box background
                      backgroundColor: 'transparent', // Remove default background
                    },
                    '& .MuiSlider-valueLabelLabel': {
                      color: 'black', // Text inside the value label
                    },
                  }}
                />
              </div>
            </div>

            {/* Employment Type Section */}
            <div className='mt-4'>
              <h1 className='font-bold text-lg text-black'>Employment Type:</h1>
              <div className='pl-3 pt-2'>
                <FormControl variant='outlined' className='w-full'>
                  <InputLabel
                    id='employmentType-label'
                    sx={{ color: 'black' }} // Label color
                  >
                    Employment Type
                  </InputLabel>
                  <Select
                    labelId='employmentType-label'
                    id='employmentType'
                    name='employmentType'
                    label='Employment Type'
                    value={formValues.employmentType}
                    onChange={handleInputChange}
                    sx={{
                      color: 'black', // Text color
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color when focused
                      },
                      '.MuiSvgIcon-root': {
                        color: 'black', // Dropdown arrow color
                      },
                      '&.Mui-focused': {
                        color: 'black',
                        borderColor: 'black', // Label color when focused
                      },

                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background of dropdown
                    }}
                  >
                    {['Full-time', 'Part-time', 'Contract', 'Temporary'].map(
                      (type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Experience Level Section */}
            <div className='mt-4'>
              <h1 className='font-bold text-lg text-black'>
                Experience Level:
              </h1>
              <div className='pl-3 pt-2'>
                <FormControl fullWidth>
                  <InputLabel
                    id='experienceLevel-label'
                    sx={{ color: 'black' }} // Label color
                  >
                    Experience Level
                  </InputLabel>
                  <Select
                    labelId='experienceLevel-label'
                    id='experienceLevel'
                    name='experienceLevel'
                    value={formValues.experienceLevel}
                    onChange={handleInputChange}
                    label='Experience Level'
                    sx={{
                      color: 'black', // Text color
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color
                      },
                      '&.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                        color: 'black', // Border color when focused
                      },
                      '.MuiSvgIcon-root': {
                        color: 'black', // Dropdown arrow color
                      },
                      '&.Mui-focused': {
                        color: 'black',
                        borderColor: 'black', // Label color when focused
                      },

                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background of dropdown
                    }}
                  >
                    {[
                      'Fresher',
                      '0-2 years',
                      '2-5 years',
                      '5-10 years',
                      '10+ years',
                    ].map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Skills Section */}
            <div className='mt-4'>
              <h1 className='font-bold text-lg text-black'>Skills:</h1>
              <div className='pl-3 pt-2'>
                <FormControl className='w-full'>
                  <InputLabel
                    id='skills-label'
                    sx={{
                      color: 'black',
                      '&.Mui-focused': {
                        color: 'black', // Label color when focused
                      },
                    }} // Label color to black
                  >
                    Skills
                  </InputLabel>
                  <Select
                    labelId='skills-label'
                    id='skills'
                    name='skills'
                    multiple
                    value={formValues.skills}
                    onChange={handleSkillChange}
                    input={<Input id='select-multiple-chip' />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            sx={{
                              backgroundColor: '#333', // Chip background color
                              color: 'white', // Chip text color
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    sx={{
                      color: 'white', // Text color
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)', // Softer black border color
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                        // Border color when focused
                      },
                      '.MuiSvgIcon-root': {
                        color: 'black', // Dropdown arrow color
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background of dropdown
                      '& .MuiChip-root': {
                        borderColor: 'black', // Border for the selected chips
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Change the border color on hover
                      },
                    }}
                  >
                    {skillsList.map((skill) => (
                      <MenuItem key={skill} value={skill}>
                        {skill}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Card>
        )
      // skill assessment
      case 3:
        return (
          <Card className='mb-5 mx-10 p-10 bg-white'>
            <div>
              <h1 className='font-bold text-lg text-black'>
                Select Skill Assessment
              </h1>
              <div className='mt-4'>
                <FormControl variant='outlined' className='w-full'>
                  <InputLabel
                    id='skillAssessment-label'
                    sx={{
                      color: 'black', // Label color
                      '&.Mui-focused': {
                        color: 'black', // Label color when focused
                      },
                    }}
                  >
                    Skill Assessment
                  </InputLabel>
                  <Select
                    labelId='skillAssessment-label'
                    id='skillAssessment'
                    name='skillAssessment'
                    label='Skill Assessment'
                    value={formValues.skillAssessment}
                    onChange={handleSkillAssessmentChange}
                    sx={{
                      color: 'black', // Text color for selected items
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Softer black border color
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color when focused
                      },
                      '.MuiSvgIcon-root': {
                        color: 'black', // Dropdown arrow color
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background of dropdown
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color on hover
                      },
                      '&.Mui-focused': {
                        color: 'black', // Label color when focused
                      },
                    }}
                  >
                    {assessments.map((assessment) => (
                      <MenuItem key={assessment._id} value={assessment._id}>
                        {assessment.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className='mt-6'>
              <h1 className='font-bold text-lg text-black'>
                Generate Random Problem
              </h1>
              <div className='mt-4'>
                <FormControl variant='outlined' className='w-full'>
                  <InputLabel
                    id='generateRandomProblem-label'
                    sx={{
                      color: 'black', // Label color
                      '&.Mui-focused': {
                        color: 'black', // Label color when focused
                      },
                    }}
                  >
                    Generate Random Problem
                  </InputLabel>
                  <Select
                    labelId='generateRandomProblem-label'
                    id='generateRandomProblem'
                    name='generateRandomProblem'
                    label='Generate Random Problem'
                    value={formValues.generateRandomProblem}
                    onChange={handleInputChange}
                    sx={{
                      color: 'black',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Softer black border color
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color when focused
                      },
                      '.MuiSvgIcon-root': {
                        color: 'black', // Dropdown arrow color
                      },
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background of dropdown
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color on hover
                      },
                      '&.Mui-focused': {
                        color: 'black', // Label color when focused
                      },
                    }}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className='w-full min-h-screen mx-auto flex justify-center items-center bg-slate-400 py-10 mb-10'>
      <Box
        sx={{
          width: '70%',
        }}
      >
        <Stepper
          nonLinear
          activeStep={activeStep}
          sx={{
            '.MuiStep-root': {
              marginBottom: '20px',
              '& .MuiStepLabel-label': {
                color: 'black', // Text color of the step labels
              },
              '& .MuiStepIcon-root': {
                color: 'rgba(255, 255, 255, 0.5)', // Default color of step icons
                '&.Mui-active': {
                  color: 'black', // Active step icon color
                },
                '&.Mui-completed': {
                  color: 'black', // Completed step icon color
                },
              },
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color='inherit'
                onClick={handleStep(index)}
                sx={{
                  '& .MuiStepLabel-label': {
                    color: 'black', // Step label text color
                  },
                  '& .Mui-active': {
                    color: 'black', // Active step label color
                  },
                  '& .Mui-completed': {
                    color: 'black', // Completed step label color
                  },
                }}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div>
          {allStepsCompleted() ? (
            <div
              className='flex flex-col 
        items-center mb-5 bg-white
        rounded-xl'
            >
              <Typography
                variant='h5'
                sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'black' }}
              >
                {!submited
                  ? "All steps completed - you're finished"
                  : submissionError
                  ? 'Error Posting Job'
                  : 'Job Posted Successfully'}
              </Typography>
              <button
                variant='contained'
                onClick={handleSubmit}
                disabled={submited}
                className=' text-white bg-black py-2 px-5 rounded-md w-[150px]'
              >
                <Send className='mr-2' /> {/* Icon added before text */}
                Submit
              </button>

              <button
                className='py-2 px-5  text-white bg-black rounded-md my-6 w-[100px] flex flex-nowrap gap-1
                
                '
                onClick={handleReset}
              >
                <ArrowBack /> {/* Icon added before text */}
                Back
              </button>
            </div>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {/* Back Button */}
                <button
                  className='py-2 px-5 rounded-md w-[100px] flex items-center gap-2 text-black bg-white'
                  onClick={handleBack}
                  disabled={activeStep === 0} // Disable button when activeStep is 0
                >
                  <ArrowBack className='mr-1' /> {/* Icon added before text */}
                  Back
                </button>

                {/* Spacer to push the Next button to the right */}
                <Box sx={{ flex: '1 1 auto' }} />

                {/* Next Button */}
                <button
                  className='px-5 mx-3 rounded-md w-[120px] flex items-center gap-2 bg-white text-black'
                  onClick={handleNext}
                >
                  Next
                  <ArrowForward className='ml-1' />{' '}
                  {/* Icon added after the text */}
                </button>

                {/* Complete/Finish Button */}
                {activeStep !== steps.length && (
                  <button
                    className='px-5 rounded-md w-[190px] flex items-center gap-2 bg-white  text-black'
                    onClick={handleComplete}
                  >
                    <CheckCircle className='mr-1' />{' '}
                    {/* Icon added before Complete Step */}
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </button>
                )}
              </Box>
            </>
          )}
        </div>
      </Box>
      {message && (
        <Dialog
          open={true} // Keeps the modal open when message exists
          onClose={() => setMessage('')} // Close modal when user clicks outside or on close button
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: '10px', // Rounded corners for the modal
              width: '400px', // Fixed width of the modal
              padding: '20px', // Padding inside the modal
              backgroundColor: '#fff', // White background
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for the modal
            },
          }}
        >
          <DialogTitle
            id='modal-title'
            className='bg-primary text-white'
            sx={{
              paddingBottom: '10px',
              fontWeight: 'bold',
              fontSize: '18px',
              textAlign: 'center', // Centering the title
              borderBottom: '2px solid #ddd', // Adding a line under the title
            }}
          >
            {messageType === 'error'
              ? 'Error'
              : messageType === 'success'
              ? 'Success'
              : messageType === 'info'
              ? 'Information'
              : messageType === 'warning'
              ? 'Warning'
              : 'Notification'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id='modal-description'
              sx={{
                fontSize: '16px',
                color: '#333', // Text color
                textAlign: 'center', // Centered text
              }}
            >
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center', // Centering the button
              padding: '10px 20px',
            }}
          >
            <Button
              onClick={() => setMessage('')}
              color='primary'
              variant='contained'
              sx={{
                backgroundColor: '#007BFF', // Custom blue color
                '&:hover': {
                  backgroundColor: '#0056b3', // Darker blue on hover
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default JobPost
