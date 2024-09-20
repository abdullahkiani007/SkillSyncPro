import React from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaIndustry,
  FaUserTie,
} from 'react-icons/fa'

const ModalContent = ({ company }) => {
  return (
    <div className='space-y-8 p-6 bg-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 ease-out'>
      {/* Company Logo */}
      <div className='flex justify-center'>
        <img
          src={company.logo || '/default-logo.png'}
          alt={company.name}
          className='w-48 h-48 object-cover rounded-full shadow-lg border-4 border-teal-500 hover:border-teal-700 transition-colors duration-300'
        />
      </div>

      {/* Company Name & Description */}
      <div className='text-center space-y-4'>
        <h2 className='text-4xl font-extrabold text-teal-600 hover:text-teal-700 transition-all duration-300'>
          {company.name}
        </h2>
        <p className='text-gray-700 text-lg leading-relaxed'>
          {company.description}
        </p>
      </div>

      {/* Company Details */}
      <div className='flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0'>
        <div className='flex-1 space-y-6 bg-teal-50 p-6 rounded-lg shadow-inner transition-all duration-300 hover:shadow-lg'>
          <p className='text-sm text-gray-600 flex items-center'>
            <FaIndustry className='mr-3 text-teal-500' />
            <span className='font-semibold'>Industry:</span> {company.industry}
          </p>
          <p className='text-sm text-gray-600 flex items-center'>
            <FaGlobe className='mr-3 text-teal-500' />
            <span className='font-semibold'>Website:</span>{' '}
            <a
              href={company.website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-teal-600 hover:underline hover:text-teal-800 transition-all'
            >
              {company.website}
            </a>
          </p>
          <p className='text-sm text-gray-600 flex items-center'>
            <FaEnvelope className='mr-3 text-teal-500' />
            <span className='font-semibold'>Email:</span> {company.contactEmail}
          </p>
          <p className='text-sm text-gray-600 flex items-center'>
            <FaPhone className='mr-3 text-teal-500' />
            <span className='font-semibold'>Phone:</span> {company.contactPhone}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold'>Address:</span> {company.address}
          </p>
        </div>

        {/* Company Creator */}
        {company.createdBy && (
          <div className='flex-1 p-6 bg-white border border-teal-100 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <p className='text-lg font-semibold text-teal-600 mb-4 flex items-center'>
              <FaUserTie className='mr-3' />
              Created By
            </p>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold'>Name:</span>{' '}
              {company.createdBy.name}
            </p>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold'>Email:</span>{' '}
              {company.createdBy.email}
            </p>
          </div>
        )}
      </div>

      {/* Employees, Jobs & Unauthorized Employees */}
      <div className='space-y-6'>
        {company.employees.length > 0 && (
          <div className='p-4 bg-white border-l-4 border-teal-500 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md'>
            <p className='text-lg font-semibold text-teal-600'>Employees:</p>
            <ul className='list-disc list-inside pl-4 space-y-2'>
              {company.employees.map((emp) => (
                <li key={emp._id} className='text-sm text-gray-600'>
                  {emp.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {company.jobs.length > 0 && (
          <div className='p-4 bg-white border-l-4 border-teal-500 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md'>
            <p className='text-lg font-semibold text-teal-600'>
              Available Jobs:
            </p>
            <ul className='list-disc list-inside pl-4 space-y-2'>
              {company.jobs.map((job) => (
                <li key={job._id} className='text-sm text-gray-600'>
                  {job.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {company.unAuthEmployees.length > 0 && (
          <div className='p-4 bg-white border-l-4 border-red-500 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md'>
            <p className='text-lg font-semibold text-red-600'>
              Unauthorized Employees:
            </p>
            <ul className='list-disc list-inside pl-4 space-y-2'>
              {company.unAuthEmployees.map((emp) => (
                <li key={emp._id} className='text-sm text-gray-600'>
                  {emp.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalContent
