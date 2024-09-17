import React, { useState, useEffect } from 'react'
import userController from '../../../API/index'
import { useSelector } from 'react-redux'
import ProfileCard from './ProfileCard'
import JobSearchCard from './JobSearchCard'
import SavedJobsCard from './SavedJobsCard'
import ApplicationStatusCard from './ApplicationStatusCard'
import ResumeManagementCard from './ResumeManagementCard'
import SkillsAssessmentCard from './SkillsAssessmentCard'
import NetworkingCard from './NetworkingCard'
import CareerResourcesCard from './CareerResourcesCard'
import NotificationsCard from './NotificationsCard'
import SettingsCard from './SettingsCard'

const Dashboard = () => {
  const user = useSelector((state) => state.user)

  const [userData, setUserData] = useState(user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await userController.getProfile(token)
        if (response.status === 200) {
          console.log(response.data.response)
          setUserData(response.data.response.user)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchUserData()
  }, [])

  return (
    <div className='h-screen w-full p-10 bg-gray-100'>
      <h1 className='text-3xl font-bold mb-10'>Dashboard</h1>

      <ProfileCard userData={userData} />
      <JobSearchCard />
      <SavedJobsCard />
      <ApplicationStatusCard />
      <ResumeManagementCard />
      <SkillsAssessmentCard />
      <NetworkingCard />
      <CareerResourcesCard />
      <NotificationsCard />
      <SettingsCard />
    </div>
  )
}

export default Dashboard
