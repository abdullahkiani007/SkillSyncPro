import React, { useState } from 'react'
import {
  FaBell,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaFileAlt,
} from 'react-icons/fa'

const NotificationsPanel = () => {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className='w-full h-full bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-700'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold text-gray-100'>
          Notifications & Resources
        </h2>
        <a
          href='#notifications'
          className='text-gray-100 text-3xl hover:text-gray-300 transition-colors duration-200'
        >
          <FaBell />
        </a>
      </div>
      <div>
        <h3 className='text-lg font-medium mb-2 text-gray-300'>
          Notifications
        </h3>
        <p className='text-gray-500'>No new notifications.</p>

        <h3 className='text-lg font-medium mt-4 mb-2 text-green-500'>
          Career Resources
        </h3>
        <ul
          className={`${
            showMore ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          } transition-all duration-500 overflow-hidden mb-2 text-gray-300`}
        >
          <li className='flex items-center mb-1'>
            <a
              href='https://example.com/resume'
              className='flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200'
            >
              <FaFileAlt className='text-green-500 mr-2' />
              How to Write a Great Resume
            </a>
          </li>
          <li className='flex items-center'>
            <a
              href='https://example.com/interview-tips'
              className='flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200'
            >
              <FaClipboardList className='text-green-500 mr-2' />
              Top 10 Interview Tips
            </a>
          </li>
        </ul>
        <button
          className='p-2 bg-gray-700 text-gray-100 rounded-lg mt-2 flex items-center justify-center hover:bg-gray-600 transition-colors duration-200 ease-in-out w-full'
          onClick={() => setShowMore(!showMore)}
          aria-expanded={showMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
          {showMore ? (
            <FaChevronUp className='ml-2' />
          ) : (
            <FaChevronDown className='ml-2' />
          )}
        </button>
      </div>
    </div>
  )
}

export default NotificationsPanel
