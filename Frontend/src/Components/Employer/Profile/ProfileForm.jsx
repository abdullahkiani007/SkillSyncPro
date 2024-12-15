import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import Controller from '../../../API/index'
import placeholderImage_person from '../../../assets/placeholderImage_person.jpg'
import ImageUpload from '../../Uploader/ImageUploader'

const ProfileForm = () => {
  const [formData, setFormData] = useState({})
  const [user, setUser] = useState({})
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

  const formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy/MM/dd') : ''
  }

  const handleSubmit = async () => {
    user.profilePicture =
      img ||
      user.profilePicture ||
      'https://res.cloudinary.com/ddl8sa4zy/image/upload/v1722860252/placeholderImage_person_tvhrx5.jpg'
    const token = localStorage.getItem('token')

    try {
      let updatedData = {
        ...formData,
        user,
      }

      const response = await Controller.updateEmpProfile(token, updatedData)
      if (response.status === 200) {
        navigate('/employer/profile')
      } else {
        console.log(response)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full min-h-screen p-5 mb-10 bg-slate-400 flex flex-col items-center justify-center'>
      <div className='w-full lg:w-2/3 bg-white shadow-2xl rounded-3xl px-8 pt-10 pb-8 mb-4'>
        <div className='flex items-center'>
          <img
            src={img || placeholderImage_person}
            alt='profile'
            className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg'
          />
          <div className='ml-10'>
            <ImageUpload setimg={setImg} />
          </div>
        </div>

        <TextField
          label='First Name'
          name='firstName'
          variant='outlined'
          value={user.firstName}
          className='w-full'
          onChange={handleUserChange}
          sx={{ mt: '2rem', backgroundColor: 'white' }}
        />

        <TextField
          label='Last Name'
          name='lastName'
          variant='outlined'
          value={user.lastName}
          className='w-full'
          onChange={handleUserChange}
          sx={{ mt: '2rem', backgroundColor: 'white' }}
        />

        <TextField
          label='Phone'
          name='phone'
          variant='outlined'
          value={user.phone}
          className='w-full'
          onChange={handleUserChange}
          sx={{ mt: '2rem', backgroundColor: 'white' }}
        />

        <TextField
          label='Address'
          name='address'
          variant='outlined'
          value={user.address}
          className='w-full'
          onChange={handleUserChange}
          sx={{ mt: '2rem', backgroundColor: 'white' }}
        />

        <div className='mt-10 text-center'>
          <Button
            className='w-1/2 bg-slate-400 text-white rounded-full shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:from-secondary-dark hover:to-primary'
            variant='contained'
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => navigate('/employer/profile')}
            sx={{ ml: '1rem' }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
