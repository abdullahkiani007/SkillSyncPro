import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import employer from '../../../API/employer'

const ManageCompany = () => {
  const [company, setCompany] = useState({
    name: '',
    description: '',
    industry: '',
    website: '',
    logo: '',
    background: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
  })
  const [isDirty, setIsDirty] = useState(false)
  const [openModal, setOpenModal] = useState(false) // Modal state

  useEffect(() => {
    // Fetch company data from the backend
    const fetchCompanyData = async () => {
      const response = await employer.getCompany(
        localStorage.getItem('accessToken')
      )
      setCompany(response.data.data)
    }

    fetchCompanyData()
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])

  const handleChange = (e) => {
    setIsDirty(true)
    setCompany({ ...company, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await employer.updateCompany(company, localStorage.getItem('accessToken'))
      setOpenModal(true) // Open the modal after a successful update
      setIsDirty(false) // Reset the dirty state after saving
    } catch (error) {
      console.error('Failed to update company details', error)
    }
  }

  const handleClose = () => {
    setOpenModal(false) // Close the modal
  }

  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <div className=' p-8 rounded-lg bg-secondary-dark shadow-lg w-full max-w-4xl'>
        <h2 className='text-3xl font-bold text-white mb-6 text-center'>
          Manage Company
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col'>
              <label className='font-semibold text-white'>Company Name</label>
              <input
                type='text'
                name='name'
                value={company.name}
                onChange={handleChange}
                className='bg-white border border-black p-3 rounded-md text-black transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-white'>Industry</label>
              <input
                type='text'
                name='industry'
                value={company.industry}
                onChange={handleChange}
                className='bg-white border border-black p-3 rounded-md text-black transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-white'>Website</label>
              <input
                type='text'
                name='website'
                value={company.website}
                onChange={handleChange}
                className='bg-white border border-black p-3 rounded-md text-black transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-white'>Contact Email</label>
              <input
                type='email'
                name='contactEmail'
                value={company.contactEmail}
                onChange={handleChange}
                className='bg-white border border-black p-3 rounded-md text-black transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-white'>Contact Phone</label>
              <input
                type='text'
                name='contactPhone'
                value={company.contactPhone}
                onChange={handleChange}
                className='bg-white border border-black p-3 rounded-md text-black transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-white'>Address</label>
              <input
                type='text'
                name='address'
                value={company.address}
                onChange={handleChange}
                className='bg-white border border-black p-3 rounded-md text-black transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
          </div>
          <div className='mt-6 flex justify-end'>
            <button
              type='submit'
              class='px-6 py-3 text-white font-semibold rounded-md shadow-lg bg-black hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* MUI Modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            borderRadius: '10px',
          }}
        >
          <CheckCircleOutlineIcon
            color='success'
            sx={{ fontSize: 50, mb: 2 }}
          />
          <Typography id='modal-title' variant='h6' component='h2'>
            Success!
          </Typography>
          <Typography id='modal-description' sx={{ mt: 2 }}>
            Company details updated successfully.
          </Typography>
          <Button
            onClick={handleClose}
            sx={{ mt: 2, backgroundColor: '#e65100' }}
            variant='contained'
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default ManageCompany
