import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import employerController from '../../../API/employer'
import Loader from '../../Loader/Loader'
import JobPerformanceChart from './Charts/JobPerformanceChart'
import JobPerformanceChart2 from './Charts/JobPerformancechart2'
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useStore((state) => state.user).getState()
  const { admin, setAdmin } = useOutletContext()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const token = localStorage.getItem('token')

      try {
        const response = await employerController.getDashboard(token)
        if (response.status === 200) {
          setAdmin(response.data.company.createdBy == user._id)
          setDashboardData(response.data)
          localStorage.setItem('company', JSON.stringify(response.data.company))
        } else {
          console.log('Error fetching dashboard data:', response)
        }
      } catch (error) {
        navigate('/employer/company-profile')
        console.error('Error fetching dashboard data in catch block:', error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className='min-h-screen bg-slate-200 p-10'>
      <h1 className='text-4xl font-extrabold text-secondary-dark mb-10 text-center'>
        {admin ? 'Company Admin' : 'Employer'} Dashboard
      </h1>
      {dashboardData && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Company Info Card */}
          <div
            className='bg-secondary-dark text-white p-8 rounded-xl shadow-xl transition-transform transform hover:scale-105 cursor-pointer hover:shadow-2xl'
            onClick={() => navigate('../company-profile')}
          >
            <h2 className='text-3xl font-semibold mb-4'>Company Info</h2>
            <p className='text-lg mb-2'>Name: {dashboardData.company.name}</p>
            <p className='text-lg mb-4'>
              Industry: {dashboardData.company.industry}
            </p>
            <a
              href={dashboardData.company.website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-white text-lg underline hover:text-green-200'
            >
              Visit Website
            </a>
          </div>

          {/* Jobs Posted Card */}
          <div
            className='bg-slate-800 text-white p-8 rounded-xl shadow-xl transition-transform transform hover:scale-105 cursor-pointer hover:shadow-2xl'
            onClick={() => navigate('../job/job-listing')}
          >
            <h2 className='text-3xl font-semibold mb-4'>Jobs Posted</h2>
            <p className='text-lg mb-4'>
              Total Jobs: {dashboardData.jobs.length}
            </p>
            <ul className='list-disc list-inside'>
              {dashboardData.jobs.slice(0, 3).map((job) => (
                <li key={job._id} className='text-white text-lg'>
                  {job.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Applicants Card */}
          <div
            className='bg-black text-white p-8 rounded-xl shadow-xl transition-transform transform hover:scale-105 cursor-pointer hover:shadow-2xl'
            onClick={() => navigate('../applicant-list')}
          >
            <h2 className='text-3xl font-semibold mb-4'>Recent Applicants</h2>
            <p className='text-lg mb-4'>
              View the latest applicants and their statuses.
            </p>
          </div>
        </div>
      )}

      {/* Job Performance Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pb-10'>
        <div className='bg-gray-400 text-white p-8 rounded-xl shadow-xl hover:shadow-2xl'>
          <h2 className='text-3xl text-white font-semibold mb-4'>
            Job Performance
          </h2>
          <JobPerformanceChart />
        </div>
        <div className='bg-gray-400 text-white p-8 rounded-xl shadow-xl hover:shadow-2xl'>
          <h2 className='text-3xl text-white font-semibold mb-4 '>
            Overall Analytics
          </h2>
          <JobPerformanceChart2 />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
