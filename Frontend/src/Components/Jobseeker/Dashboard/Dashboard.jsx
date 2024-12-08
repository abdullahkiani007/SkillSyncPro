import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import userController from '../../../API/index'
import JobApplicationAnalytics from './JobApplicationAnalytics'
import JobManagementCard from './JobManagementCard'
import JobSuggestions from './JobSuggestions'
import NotificationsPanel from './NotificationsPanel'
import ProfileToolsCard from './ProfileToolsCard'
import SkillsEndorsement from './SkillsEndorsement'

const Dashboard = () => {
  const user = useSelector((state) => state.user)
  const [userData, setUserData] = useState(user)
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await userController.getProfile(token)
        if (response.status === 200) {
          setUserData(response.data.response.user)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
      setLoading(false)
    }
    fetchUserData()

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className='min-h-screen w-full p-8'
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <h1 className='text-4xl font-bold text-black font-poppins mb-12'>
        {userData && userData.firstName
          ? `Welcome Back! ${userData.firstName}`
          : 'Welcome to Your Dashboard'}
      </h1>

      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <ClipLoader size={60} color={'#000'} loading={loading} />
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Side: Job Management and Chart */}
          <div
            className={`lg:col-span-2 transform transition-transform duration-700 ${
              isLoaded
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
            }`}
          >
            <JobSuggestions
              className={`transform transition-all duration-700 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            />

            <JobApplicationAnalytics
              className={`transform transition-all duration-700 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            />
          </div>

          {/* Right Side: Notifications and Profile Tools */}
          <div
            className={`lg:col-span-1 transform transition-transform duration-700 ${
              isLoaded
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0'
            }`}
          >
            <div className='bg-white text-black rounded-xl shadow-lg mb-8 border border-black w-full'>
              <NotificationsPanel />
            </div>

            <div className='bg-white text-black rounded-xl shadow-lg border border-black mb-8'>
              <ProfileToolsCard />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
