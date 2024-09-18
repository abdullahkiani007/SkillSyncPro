import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Controller from '../../../API/index'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import placeholderImage_person from '../../../assets/placeholderImage_person.jpg'

const ProfileForm = () => {
  const [formData, setFormData] = useState({})
  const [user, setUser] = useState({})
  const [img, setImg] = useState('')
  const [selectedFile, setSelectedFile] = useState(null) // New state for image file selection
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
    setUser(data.user)
    delete data.user
    setFormData(data)
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
    const skills = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : []
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
    const fileUrl = URL.createObjectURL(file) // This allows you to show the selected image.
    setImg(fileUrl) // Set the image URL without previewing it before.
  }

  const handleSubmit = async () => {
    user.profilePicture = selectedFile || img || placeholderImage_person
    const token = localStorage.getItem('token')

    try {
      let updatedData = {
        ...formData,
        user,
      }

      console.log(updatedData)
      const response = await Controller.updateProfile(token, updatedData)
      if (response.status === 200) {
        console.log(response)
        navigate('/jobseeker/profile')
      } else {
        console.log(response)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className='w-full bg-gradient-to-r from-teal-100 to-orange-100 p-6 rounded-lg shadow-lg'
      style={{
        maxWidth: '900px',
        margin: 'auto',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <div className='flex items-center mb-6'>
        <img
          src={img || placeholderImage_person} // Image preview is hidden unless user uploads
          alt='profile'
          className='w-24 h-24 rounded-full border-4 border-orange-500 object-cover'
        />
        <div className='ml-6'>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id='upload-button'
          />
          <label htmlFor='upload-button'>
            <Button
              variant='outlined'
              color='primary'
              component='span'
              sx={{
                mt: '1rem',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Select Profile Image
            </Button>
          </label>
        </div>
      </div>

      <TextField
        label='First Name'
        name='firstName'
        variant='outlined'
        value={user.firstName}
        className='w-full'
        onChange={handleUserChange}
        sx={{
          mt: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FF6347',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6347',
              boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
            },
          },
        }}
      />

      <TextField
        label='Last Name'
        name='lastName'
        variant='outlined'
        value={user.lastName}
        className='w-full'
        onChange={handleUserChange}
        sx={{
          mt: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FF6347',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6347',
              boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
            },
          },
        }}
      />

      <TextField
        label='Phone'
        name='phone'
        variant='outlined'
        value={user.phone}
        className='w-full'
        onChange={handleUserChange}
        sx={{
          mt: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FF6347',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6347',
              boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
            },
          },
        }}
      />

      <TextField
        label='Address'
        name='address'
        variant='outlined'
        value={user.address}
        className='w-full'
        onChange={handleUserChange}
        sx={{
          mt: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FF6347',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6347',
              boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
            },
          },
        }}
      />

      <div className='mt-10'>
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
          className='transition-transform transform hover:scale-105'
        />
      </div>

      <div className='mt-10'>
        <h2 className='text-lg font-bold mb-2 text-teal-600'>Education</h2>
        {formData.education &&
          formData.education.map((edu, index) => (
            <div
              key={index}
              className='mt-4 bg-white shadow-md rounded-lg px-4 py-3 mb-4 transition-transform transform hover:scale-105'
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

        <div className='mb-4'>
          <TextField
            label='Institution'
            name='institution'
            variant='outlined'
            value={edu.institution}
            className='w-full'
            onChange={handleEduChange}
            sx={{
              mt: '1rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF6347',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6347',
                  boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
                },
              },
            }}
          />
          <TextField
            label='Degree'
            name='degree'
            variant='outlined'
            value={edu.degree}
            className='w-full'
            onChange={handleEduChange}
            sx={{
              mt: '1rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF6347',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6347',
                  boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
                },
              },
            }}
          />
          <TextField
            label='Field of Study'
            name='fieldOfStudy'
            variant='outlined'
            value={edu.fieldOfStudy}
            className='w-full'
            onChange={handleEduChange}
            sx={{
              mt: '1rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF6347',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6347',
                  boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
                },
              },
            }}
          />
          <TextField
            label='Start Date'
            name='startDate'
            type='date'
            variant='outlined'
            value={edu.startDate}
            className='w-full'
            InputLabelProps={{ shrink: true }}
            onChange={handleEduChange}
            sx={{
              mt: '1rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF6347',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6347',
                  boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
                },
              },
            }}
          />
          <TextField
            label='End Date'
            name='endDate'
            type='date'
            variant='outlined'
            value={edu.endDate}
            className='w-full'
            InputLabelProps={{ shrink: true }}
            onChange={handleEduChange}
            sx={{
              mt: '1rem',
              backgroundColor: 'white',
              borderRadius: '10px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF6347',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF6347',
                  boxShadow: '0px 6px 12px rgba(255, 99, 71, 0.3)',
                },
              },
            }}
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
