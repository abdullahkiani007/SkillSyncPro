import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Controller from '../../../API/index'
import ImageUpload from '../../Uploader/ImageUploader'
import placeholderImage_person from '../../../assets/placeholderImage_person.jpg'
import { format, parseISO, isValid } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    education: [],
    skills: [],
  })
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    profilePicture: '',
  })
  const [img, setImg] = useState('')
  const navigate = useNavigate()
  const [edu, setEdu] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
  })
  const [errors, setErrors] = useState({})

  // Fetch profile data from localStorage and parse dates correctly
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('profile'))
    if (data) {
      const formattedData = {
        ...data,
        education: data.education.map((edu) => ({
          ...edu,
          startDate: new Date(edu.startDate).toLocaleDateString('en-GB'),
          endDate: new Date(edu.endDate).toLocaleDateString('en-GB'),
        })),
          // Format education dates
          
      }
      setUser(formattedData.user || {})
      setFormData(formattedData || { education: [], skills: [] })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleUserChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleSkillChange = (selectedOptions) => {
    const skills = selectedOptions.map((option) => option.value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills,
    }))
  }

  const handleEduChange = (e) => {
    const { name, value } = e.target
    setEdu((prevEdu) => ({
      ...prevEdu,
      [name]: value,
    }))
  }

  const addEducation = () => {
    // Validation for education fields
    if (!edu.institution || !edu.degree || !edu.startDate || !edu.endDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        education: 'Please fill out all education fields.',
      }))
      return
    }

    const startDate = new Date(edu.startDate)
    const endDate = new Date(edu.endDate)
    const yearDifference = endDate.getFullYear() - startDate.getFullYear()

    if (yearDifference < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        education: 'The degree duration must be at least 2 years.',
      }))
      return
    }

    const formattedEdu = {
      ...edu,
      startDate: format(startDate, 'yyyy-MM-dd'), // Save date in ISO format
      endDate: format(endDate, 'yyyy-MM-dd'), // Save date in ISO format
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      education: [...prevFormData.education, formattedEdu],
    }))

    // Reset form fields and clear errors
    setEdu({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    })

    setErrors((prevErrors) => ({
      ...prevErrors,
      education: '', // Clear education errors
    }))
  }

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index)
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: updatedEducation,
    }))
  }

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'React', label: 'React' },
    { value: 'Node', label: 'Node' },
    { value: 'Express', label: 'Express' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'SQL', label: 'SQL' },
  ]

  const validateForm = () => {
    let validationErrors = {}

    const nameRegex = /^[a-zA-Z\s-]+$/
    const phoneRegex = /^\+?[0-9]+$/

    // Name validation
    if (!nameRegex.test(user.firstName)) {
      validationErrors.firstName = 'First name should contain only alphabets'
    }

    if (!nameRegex.test(user.lastName)) {
      validationErrors.lastName = 'Last name should contain only alphabets'
    }

    // Phone validation
    if (!phoneRegex.test(user.phone)) {
      validationErrors.phone =
        'Phone number should contain only numbers and can start with +'
    }

    // Check required user fields
    if (!user.firstName) validationErrors.firstName = 'First name is required'
    if (!user.lastName) validationErrors.lastName = 'Last name is required'
    if (!user.phone) validationErrors.phone = 'Phone number is required'
    if (!user.address) validationErrors.address = 'Address is required'

    // Check if there are skills
    if (formData.skills.length === 0)
      validationErrors.skills = 'At least one skill is required'

    // Check if there is education added
    if (formData.education.length === 0)
      validationErrors.education = 'At least one education record is required'

    setErrors(validationErrors)

    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    user.profilePicture = img || user.profilePicture || placeholderImage_person
    const token = localStorage.getItem('token')

    try {
      const updatedData = {
        ...formData,
        user,
      }

      const response = await Controller.updateProfile(token, updatedData)
      if (response.status === 200) {
        navigate('/jobseeker/profile')
      } else {
        console.log('Error:', response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className='w-full bg-gradient-to-r from-teal-100 to-orange-100 p-6 rounded-lg shadow-lg'
      style={{ maxWidth: '900px', margin: 'auto' }}
    >
      <div className='flex items-center mb-6'>
        <img
          src={img ||user.profilePicture || placeholderImage_person}
          alt='profile'
          className='w-24 h-24 rounded-full border-4 border-orange-500 object-cover'
        />
        <div className='ml-6'>
          <ImageUpload setimg={setImg} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <TextField
          label='First Name'
          name='firstName'
          variant='outlined'
          value={user.firstName}
          onChange={handleUserChange}
          className='input-style'
          sx={{ zIndex: 5 }}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <TextField
          label='Last Name'
          name='lastName'
          variant='outlined'
          value={user.lastName}
          onChange={handleUserChange}
          className='input-style'
          sx={{ zIndex: 5 }}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </div>

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <TextField
          label='Phone'
          name='phone'
          variant='outlined'
          value={user.phone}
          className='w-full input-style mb-4'
          onChange={handleUserChange}
          sx={{ zIndex: 5 }}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          label='Address'
          name='address'
          variant='outlined'
          value={user.address}
          className='w-full input-style mb-6'
          onChange={handleUserChange}
          sx={{ zIndex: 5 }}
          error={!!errors.address}
          helperText={errors.address}
        />
      </div>

      <div className='mt-10 relative z-50 mb-6'>
        <h2 className='text-lg font-bold mb-2 text-teal-600'>Skills</h2>
        <CreatableSelect
          isMulti
          options={options}
          value={
            formData.skills &&
            formData.skills.map((skill) => ({
              value: skill,
              label: skill,
            }))
          }
          onChange={handleSkillChange}
          className='relative z-50'
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 50,
            }),
          }}
        />
        {errors.skills && <p className='text-red-500'>{errors.skills}</p>}
      </div>

      <div className='mt-10'>
        <h2 className='text-lg font-bold mb-4 text-teal-600'>Education</h2>
        {formData.education &&
          formData.education.map((edu, index) => (
            <div
              key={index}
              className='mt-4 bg-white shadow-md rounded-lg px-4 py-3 mb-6 transition-transform transform hover:scale-105'
              style={{ borderLeft: '4px solid #FF6347' }}
            >
              <div>
                <h3 className='font-bold text-gray-700'>Degree</h3>
                <p className='border rounded-lg text-gray-600 p-2'>
                  {edu.degree}
                </p>
              </div>
              <div className='mt-3'>
                <h3 className='font-bold text-gray-700'>Institution</h3>
                <p className='border rounded-lg text-gray-600 p-2'>
                  {edu.institution}
                </p>
              </div>
              <div className='mt-3'>
                <h3 className='font-bold text-gray-700'>Dates</h3>
                <p className='border rounded-lg text-gray-600 p-2'>
                  {/* Ensure that the dates are valid before formatting */}
                  {isValid(new Date(edu.startDate))
                    ? format(new Date(edu.startDate), 'yyyy-MM-dd')
                    : 'Invalid Date'}{' '}
                  -
                  {isValid(new Date(edu.endDate))
                    ? format(new Date(edu.endDate), 'yyyy-MM-dd')
                    : 'Invalid Date'}
                </p>
              </div>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => removeEducation(index)}
                sx={{ mt: '1rem', transition: 'transform 0.3s' }}
                className='hover:scale-105'
              >
                Remove
              </Button>
            </div>
          ))}
        {errors.education && <p className='text-red-500'>{errors.education}</p>}

        <div className='mb-4 grid grid-cols-2 gap-4'>
          <TextField
            label='Institution'
            name='institution'
            variant='outlined'
            value={edu.institution}
            onChange={handleEduChange}
            className='input-style'
            sx={{ zIndex: 5 }}
          />
          <TextField
            label='Degree'
            name='degree'
            variant='outlined'
            value={edu.degree}
            onChange={handleEduChange}
            className='input-style'
            sx={{ zIndex: 5 }}
          />
        </div>

        <div className='mb-6 grid grid-cols-2 gap-4'>
          <TextField
            label='Field of Study'
            name='fieldOfStudy'
            variant='outlined'
            value={edu.fieldOfStudy}
            onChange={handleEduChange}
            className='input-style'
            sx={{ zIndex: 5 }}
          />
          <TextField
            label='Start Date'
            name='startDate'
            type='date'
            variant='outlined'
            value={edu.startDate}
            InputLabelProps={{ shrink: true }}
            onChange={handleEduChange}
            className='input-style'
            sx={{ zIndex: 5 }}
          />
          <TextField
            label='End Date'
            name='endDate'
            type='date'
            variant='outlined'
            value={edu.endDate}
            InputLabelProps={{ shrink: true }}
            onChange={handleEduChange}
            className='input-style'
            sx={{ zIndex: 5 }}
          />
        </div>

        <Button
          variant='contained'
          color='primary'
          onClick={addEducation}
          sx={{
            mt: '1rem',
            backgroundColor: '#20B2AA',
            transition: 'transform 0.3s',
            '&:hover': {
              backgroundColor: '#17A589',
              transform: 'scale(1.05)',
            },
          }}
        >
          Add Education
        </Button>
      </div>

      <div className='flex justify-between mt-10'>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          sx={{
            mt: '1rem',
            backgroundColor: '#FF6347',
            transition: 'transform 0.3s',
            '&:hover': {
              backgroundColor: '#FF4500',
              transform: 'scale(1.05)',
            },
          }}
        >
          Save
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => navigate('/jobseeker/profile')}
          sx={{
            mt: '1rem',
            ml: '1rem',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ProfileForm
