import React, { useState, useEffect } from 'react'
import { Notification } from '@mantine/core'
import employer from '../../../API/employer'
import ImageUpload from '../../Uploader/ImageUploader'

const Signup = () => {
  const [option, setOption] = useState('join')
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('')
  const [notification, setNotification] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [newCompany, setNewCompany] = useState({
    name: '',
    description: '',
    industry: '',
    website: '',
    logo: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    backgroundPic: '',
  })

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await employer.getAllCompanyNames()
        setCompanies(response.data.companies)
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }
    fetchCompanies()
  }, [])

  const handleOptionChange = (e) => {
    setOption(e.target.value)
  }

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value)
  }

  const handleNewCompanyChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value })
  }

  const handleLogoUpload = (url) => {
    setNewCompany({ ...newCompany, logo: url })
  }

  const handleBackgroundUpload = (url) => {
    setNewCompany({ ...newCompany, backgroundPic: url })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('accessToken')

    try {
      let response
      if (option === 'join') {
        response = await employer.joinCompany(selectedCompany, token)
      } else {
        response = await employer.registerCompany(newCompany, token)
      }

      if (response.status === 200) {
        setNotification(
          option === 'join'
            ? 'You have successfully joined the company'
            : 'You have successfully registered the company'
        )
        setShowNotification(true)
      }
    } catch (err) {
      console.log(err.response.data.message)
      setNotification(err.response.data.message)
      setShowNotification(true)
    }
  }

  return (
    <div className='bg-secondary-dark h-full min-h-screen p-10 flex justify-center items-center '>
      {showNotification && (
        <div className='fixed right-5 bottom-5'>
          <Notification
            withBorder
            title='Notification'
            onClose={() => setShowNotification(false)}
            className='bg-primary-light text-primary-dark '
          >
            {notification}
          </Notification>
        </div>
      )}

      <div className='bg-white rounded-xl p-20 shadow-2xl transition duration-500 transform hover:scale-105 animate-fade-in'>
        <h1 className='font-bold mb-8 text-center text-primary text-4xl animate-slide-down'>
          {option === 'join' ? 'Join a Company' : 'Register a Company'}
        </h1>

        <form
          className='w-full max-w-2xl space-y-6 transition-all duration-300 ease-in-out'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-center mb-6'>
            <label className='mr-6 cursor-pointer'>
              <input
                type='radio'
                name='option'
                value='join'
                checked={option === 'join'}
                onChange={handleOptionChange}
                className='hidden'
              />
              <span className='inline-block text-white text-lg py-2 px-4 bg-primary-default bg-primary  rounded-full cursor-pointer hover:bg-secondary-dark transition-all duration-300 ease-in-out'>
                Join a Company
              </span>
            </label>
            <label className='cursor-pointer'>
              <input
                type='radio'
                name='option'
                value='register'
                checked={option === 'register'}
                onChange={handleOptionChange}
                className='hidden'
              />
              <span className='inline-block  text-white text-lg py-2 px-4 bg-primary rounded-full cursor-pointer hover:bg-secondary-dark transition-all duration-300 ease-in-out '>
                Register a Company
              </span>
            </label>
          </div>

          {option === 'join' ? (
            <div className='flex justify-center w-full'>
              <div className='w-full md:w-3/4'>
                <label className='text-secondary-dark'>Select Company</label>
                <select
                  className='w-full p-3 border border-secondary-dark rounded-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary-default focus:outline-none'
                  value={selectedCompany}
                  onChange={handleCompanyChange}
                >
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='text-secondary-dark'>Company Name</label>
                <input
                  type='text'
                  name='name'
                  className='w-full p-3 border border-primary-default rounded-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary-default focus:outline-none'
                  value={newCompany.name}
                  onChange={handleNewCompanyChange}
                />
              </div>
              <div>
                <label className='text-secondary-dark'>Industry</label>
                <input
                  type='text'
                  name='industry'
                  className='w-full p-3 border border-primary-default rounded-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary-default focus:outline-none'
                  value={newCompany.industry}
                  onChange={handleNewCompanyChange}
                />
              </div>
              <div>
                <label className='text-secondary-dark'>Website</label>
                <input
                  type='text'
                  name='website'
                  className='w-full p-3 border border-primary-default rounded-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary-default focus:outline-none'
                  value={newCompany.website}
                  onChange={handleNewCompanyChange}
                />
              </div>
              <div>
                <label className='text-secondary-dark'>Address</label>
                <input
                  type='text'
                  name='address'
                  className='w-full p-3 border border-primary-default rounded-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary-default focus:outline-none'
                  value={newCompany.address}
                  onChange={handleNewCompanyChange}
                />
              </div>
              <div>
                <label className='text-secondary-dark'>Contact Email</label>
                <input
                  type='email'
                  name='contactEmail'
                  className='w-full p-3 border border-primary-default rounded-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary-default focus:outline-none'
                  value={newCompany.contactEmail}
                  onChange={handleNewCompanyChange}
                />
              </div>
              <div>
                <label className='text-secondary-dark'>Contact Phone</label>
                <input
                  type='text'
                  name='contactPhone'
                  className='w-full p-3 border border-primary-default rounded-md transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary-default focus:outline-none'
                  value={newCompany.contactPhone}
                  onChange={handleNewCompanyChange}
                />
              </div>

              <div className='md:col-span-2'>
                <label className='text-secondary-dark'>
                  Upload Company Logo
                </label>
                <ImageUpload setimg={handleLogoUpload} />
              </div>
              <div className='md:col-span-2'>
                <label className='text-secondary-dark'>
                  Upload Background Picture
                </label>
                <ImageUpload setimg={handleBackgroundUpload} />
              </div>
            </div>
          )}

          <button
            type='submit'
            className='mt-6 w-full bg-primary text-white py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-secondary-dark shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
