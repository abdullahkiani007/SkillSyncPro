import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Controller from '../../../API/index'
import ImageUpload from '../../Uploader/ImageUploader'
import placeholderImage_person from '../../../assets/placeholderImage_person.jpg'
import { format } from 'date-fns'
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('profile'))
    if (data) {
      setUser(data.user || {})
      setFormData(data || { education: [], skills: [] })
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

  const formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy/MM/dd') : ''
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    const formattedDate = value ? format(new Date(value), 'yyyy/MM/dd') : ''
    handleEduChange({ target: { name, value: formattedDate } })
  }

  const addEducation = () => {
    const formattedEdu = {
      ...edu,
      startDate: new Date(edu.startDate),
      endDate: new Date(edu.endDate),
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: [...prevFormData.education, formattedEdu],
    }))
    setEdu({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    })
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

  const handleSubmit = async () => {
    // Ensure profile picture has fallback if not uploaded
    user.profilePicture = img || user.profilePicture || placeholderImage_person
    const token = localStorage.getItem('token')

    try {
      const updatedData = {
        ...formData,
        user, // Ensure `address` and other user fields are included
      }

      console.log('Submitting data:', updatedData)
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
          src={img || placeholderImage_person}
          alt='profile'
          className='w-24 h-24 rounded-full border-4 border-orange-500 object-cover'
        />
        <div className='ml-6'>
          <ImageUpload setimg={setImg} />
        </div>
      </div>

      {/* User Details */}

      <div className='grid grid-cols-2 gap-4 mb-6'>
        <TextField
          label='First Name'
          name='firstName'
          variant='outlined'
          value={user.firstName}
          onChange={handleUserChange}
          className='input-style'
          sx={{ zIndex: 5 }}
        />

        <TextField
          label='Last Name'
          name='lastName'
          variant='outlined'
          value={user.lastName}
          onChange={handleUserChange}
          className='input-style'
          sx={{ zIndex: 5 }}
        />
      </div>

      {/* Phone and Address with spacing */}
      <div className='grid grid-cols-2 gap-4 mb-6'>
        <TextField
          label='Phone'
          name='phone'
          variant='outlined'
          value={user.phone}
          className='w-full input-style mb-4'
          onChange={handleUserChange}
          sx={{ zIndex: 5 }}
        />

        <TextField
          label='Address'
          name='address'
          variant='outlined'
          value={user.address}
          className='w-full input-style mb-6'
          onChange={handleUserChange}
          sx={{ zIndex: 5 }}
        />
      </div>

      {/* Skills Dropdown */}
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
      </div>

      {/* Education Section */}
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
                  {new Date(edu.startDate).toLocaleDateString()} -{' '}
                  {new Date(edu.endDate).toLocaleDateString()}
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

        {/* Add Education Fields */}
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
