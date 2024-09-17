import React from 'react'

const ApplicationStatusCard = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-5'>
      <h2 className='text-xl font-semibold mb-3'>Application Status</h2>
      <ul>
        <li className='mb-2'>Google - Pending</li>
        <li className='mb-2'>Facebook - Interview Scheduled</li>
      </ul>
    </div>
  )
}

export default ApplicationStatusCard
