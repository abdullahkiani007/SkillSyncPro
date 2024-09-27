import React, { useEffect, useState } from 'react'
import companyLogo from '../../../assets/companyLogo.png'
import jobseeker from '../../../API/jobseeker'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// Background for the page
const backgroundStyle = {
  backgroundImage: `url('https://source.unsplash.com/random?tech')`, // Use a relevant background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
}

const CompaniesList = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await jobseeker.getCompanies()
      if (response.status === 200) {
        setCompanies(response.data.data)
        localStorage.setItem(
          'companiesData',
          JSON.stringify(response.data.data)
        )
      } else {
        console.log('Error fetching companies data')
      }
    }
    fetchCompanies()
  }, [])

  return (
    <div
      style={backgroundStyle}
      className='flex flex-col justify-center items-center'
    >
      <Container maxWidth='lg' className='pt-20 pb-10'>
        <div className='bg-white rounded-lg shadow-md p-8 mb-10 relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-10 rounded-lg transform rotate-2'></div>
          <h1 className='font-extrabold text-4xl text-center text-gray-800 z-10 relative'>
            Featured Companies
          </h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn'>
          {companies.map((company) => {
            return (
              <div
                key={company._id}
                onClick={() => navigate(`../companies/${company._id}`)}
                className='bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300'
              >
                <div className='relative flex justify-center items-center'>
                  <img
                    className='rounded-full w-24 h-24 shadow-md border-4 border-gray-100 bg-white absolute -top-12'
                    src={company.logo || companyLogo}
                    alt={company.name}
                  />
                </div>
                <div className='pt-14 text-center'>
                  <h1 className='text-gray-800 text-lg font-semibold'>
                    {company.name}
                  </h1>
                  <a
                    href={company.website}
                    className='text-blue-500 text-sm underline hover:text-blue-600'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {company.website}
                  </a>
                  <h2 className='font-semibold text-gray-600 mt-4'>
                    Industry:{' '}
                    <span className='text-gray-500 font-normal'>
                      {company.industry}
                    </span>
                  </h2>
                  <h2 className='font-semibold text-gray-600 mt-2'>
                    Email:{' '}
                    <span className='text-gray-500 font-normal text-sm'>
                      {company.contactEmail}
                    </span>
                  </h2>
                  <h2 className='font-semibold text-gray-600 mt-2'>
                    Phone:{' '}
                    <span className='text-gray-500 font-normal text-sm'>
                      {company.contactPhone}
                    </span>
                  </h2>
                  <h2 className='font-semibold text-gray-600 mt-2'>
                    Address:{' '}
                    <span className='text-gray-500 font-normal text-sm'>
                      {company.address}
                    </span>
                  </h2>
                </div>
              </div>
            )
          })}
        </div>
      </Container>

      {/* Footer Section */}
    </div>
  )
}

export default CompaniesList
