import React from 'react'

const JobSearchCard = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-5'>
      <h2 className='text-xl font-semibold mb-3'>Job Search</h2>
      <input
        type='text'
        placeholder='Search for jobs...'
        className='w-full p-2 border border-gray-300 rounded-lg'
      />
    </div>
  )
}

export default JobSearchCard
