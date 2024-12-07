import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader'
import JobSeekerChatBot from './Chatbot/JobSeekerChatbot'
import Header from './navbar/Header'
import Navbar from './navbar/Navbar'
import Sidebar from './navbar/Sidebar'
import Topbar from './navbar/Topbar'

const JobseekerRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!(user.auth && user.role === 'jobseeker')) {
      navigate('/login/jobseeker')
    }
  }, [user, navigate])
  if (user.auth && user.role === 'jobseeker') {
    return (
      <div className='flex h-full'>
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content: Apply margin when sidebar is open */}
        <div
          className={`flex flex-col flex-1 transition-all ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className=''>
            <Outlet className='bg-gray-200' />
            <JobSeekerChatBot />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default JobseekerRoutes
