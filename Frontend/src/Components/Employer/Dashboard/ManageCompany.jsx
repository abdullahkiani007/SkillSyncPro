import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    // Fetch company data from the backend
    const fetchCompanyData = async () => {
      const response = await employer.getCompany(
        localStorage.getItem('accessToken')
      )
      console.log(response.data.data)
      setCompany(response.data.data)
    }

    fetchCompanyData()
  }, [])

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await employer.updateCompany(company, localStorage.getItem('accessToken'))
      alert('Company details updated successfully')
    } catch (error) {
      console.error('Failed to update company details', error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-primary to-secondary-dark flex items-center justify-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl'>
        <h2 className='text-3xl font-bold text-white mb-6 text-center'>
          Manage Company
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col'>
              <label className='font-semibold text-primary'>Company Name</label>
              <input
                type='text'
                name='name'
                value={company.name}
                onChange={handleChange}
                className='bg-gray-700 border border-primary p-3 rounded-md text-white transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-primary'>Industry</label>
              <input
                type='text'
                name='industry'
                value={company.industry}
                onChange={handleChange}
                className='bg-gray-700 border border-primary p-3 rounded-md text-white transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-primary'>Website</label>
              <input
                type='text'
                name='website'
                value={company.website}
                onChange={handleChange}
                className='bg-gray-700 border border-primary p-3 rounded-md text-white transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-primary'>
                Contact Email
              </label>
              <input
                type='email'
                name='contactEmail'
                value={company.contactEmail}
                onChange={handleChange}
                className='bg-gray-700 border border-primary p-3 rounded-md text-white transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-primary'>
                Contact Phone
              </label>
              <input
                type='text'
                name='contactPhone'
                value={company.contactPhone}
                onChange={handleChange}
                className='bg-gray-700 border border-primary p-3 rounded-md text-white transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-primary'>Address</label>
              <input
                type='text'
                name='address'
                value={company.address}
                onChange={handleChange}
                className='bg-gray-700 border border-primary p-3 rounded-md text-white transition duration-300 ease-in-out hover:border-orange-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300'
              />
            </div>
          </div>
          <div className='mt-6 flex justify-end'>
            <button
              type='submit'
              className='px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-orange-600 hover:to-blue-700'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ManageCompany
