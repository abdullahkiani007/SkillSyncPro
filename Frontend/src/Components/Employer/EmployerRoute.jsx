import { Notification } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSocket } from '../../Context/SocketContext'

import employer from '../../API/employer'
import SignUpForm from '../Employer/Company/Signup'
import Loader from '../Loader/Loader'
import EmployerChatbot from './Chatbot/EmpChatbot'
import Header from './navbar/Header'
import Sidebar from './navbar/Sidebar'

const EmployerRoute = () => {
  // State Hooks
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [joinCompany, setJoinCompany] = useState(false)
  const [allClear, setAllClear] = useState(false)

  // Redux Selector
  const user = useSelector((state) => state.user)

  // React Router Navigation
  const navigate = useNavigate()

  // Socket Context
  const socket = useSocket()

  // Socket-related useEffect (Currently Commented Out)
  /*
  useEffect(() => {
    if (socket) {
      console.log("socket rooms ", socket);
      socket.emit("join_room", 1234);
      socket.on("notification", (notification) => {
        console.log(notification);
        alert("Notification received");
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);
  */

  // Fetch Company Data on Mount or When User ID Changes
  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem('accessToken')
      try {
        const response = await employer.getCompany(token)

        if (response.status === 200) {
          const company = response.data.data

          // Determine if User is Admin
          if (company.createdBy === user._id) {
            setAdmin(true)
          } else {
            setAdmin(false)
          }

          // Check Company Authorization
          if (!company.authorized) {
            setAllClear(false)
            setAlertMessage('Your company is not authorized yet')
            setAlert(true)
          } else {
            setAllClear(true)
          }
        }
      } catch (err) {
        setJoinCompany(true)
      } finally {
        setLoading(false)
      }
    }

    if (user._id) {
      // Ensure user data is loaded
      fetchCompany()
    }
  }, [user._id])

  // Show Loader While Fetching Data
  if (loading) {
    return <Loader />
  }

  // Show Notification if Company is Not Authorized
  if (alert) {
    return (
      <div className='fixed right-5 bottom-5 z-50'>
        <Notification
          withBorder
          title='Notification'
          onClose={() => setAlert(false)}
        >
          {alertMessage}
        </Notification>
      </div>
    )
  }

  // Render Employer Layout if User is Authenticated, Employer, and Company is Authorized
  if (user.auth && user.role === 'employer' && allClear) {
    return (
      <div className='flex h-screen overflow-hidden'>
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isAdmin={admin}
        />

        {/* Main Content Area */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content */}
          <main className='flex-1 min-h-screen overflow-auto'>
            <Outlet context={{ admin, setAdmin }} />
            <EmployerChatbot />
          </main>
        </div>
      </div>
    )
  }

  // Render SignUpForm if User Needs to Join a Company
  if (joinCompany) {
    return <SignUpForm />
  }

  // Redirect to Jobseeker Login if None of the Above Conditions are Met
  useEffect(() => {
    navigate('/login/jobseeker')
  }, [navigate])

  return null
}

export default EmployerRoute
