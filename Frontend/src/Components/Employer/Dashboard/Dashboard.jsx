import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import Loader from '../../Loader/Loader'
import employerController from '../../../API/employer'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false) // Control visibility for transition
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
          setAdmin(response.data.company.createdBy === user._id)
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

      // Delay to allow the data to load, then trigger the visibility for transition
      setTimeout(() => {
        setIsVisible(true)
      }, 100) // Adjust delay as needed
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loader />
  }

  // Example data for charts
  const data = [
    { name: 'Jan', views: 4000, applications: 2400 },
    { name: 'Feb', views: 3000, applications: 1398 },
    { name: 'Mar', views: 2000, applications: 9800 },
    { name: 'Apr', views: 2780, applications: 3908 },
    { name: 'May', views: 1890, applications: 4800 },
    { name: 'Jun', views: 2390, applications: 3800 },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10 ${
        isVisible ? 'transition-fade-in' : 'opacity-0'
      }`}
    >
      <h1 className='text-4xl font-extrabold text-gray-900 mb-10 text-center'>
        {admin ? 'Admin' : 'Employer'} Dashboard
      </h1>

      {dashboardData && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Company Info Card */}
          <div
            className={`bg-gradient-to-r from-teal-400 to-teal-600 text-white p-8 rounded-2xl shadow-xl transition-transform transform ${
              isVisible ? 'hover:scale-105' : 'scale-95'
            } cursor-pointer hover:shadow-2xl transition-all duration-700`}
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
              className='text-white text-lg underline hover:text-teal-200'
            >
              Visit Website
            </a>
          </div>

          {/* Jobs Posted Card */}
          <div
            className={`bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-8 rounded-2xl shadow-xl transition-transform transform ${
              isVisible ? 'hover:scale-105' : 'scale-95'
            } cursor-pointer hover:shadow-2xl transition-all duration-700`}
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
            className={`bg-gradient-to-r from-purple-400 to-purple-600 text-white p-8 rounded-2xl shadow-xl transition-transform transform ${
              isVisible ? 'hover:scale-105' : 'scale-95'
            } cursor-pointer hover:shadow-2xl transition-all duration-700`}
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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
        {/* Bar Chart - Job Performance with gray-900 background */}
        <div
          className={`bg-gray-900 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform ${
            isVisible ? 'hover:scale-105' : 'scale-95'
          } transition-all duration-700`}
        >
          <h2 className='text-3xl font-semibold mb-4'>Job Performance</h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
              <XAxis dataKey='name' stroke='#E2E8F0' />{' '}
              {/* Light gray axis for contrast */}
              <YAxis stroke='#E2E8F0' />
              <Tooltip />
              {/* Bars in lighter shades for contrast */}
              <Bar
                dataKey='views'
                fill='#A0AEC0'
                radius={[10, 10, 0, 0]}
              />{' '}
              {/* gray-400 */}
              <Bar
                dataKey='applications'
                fill='#CBD5E0'
                radius={[10, 10, 0, 0]}
              />{' '}
              {/* gray-200 */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Overall Analytics with gray-700 background */}
        <div
          className={`bg-gray-700 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform ${
            isVisible ? 'hover:scale-105' : 'scale-95'
          } transition-all duration-700`}
        >
          <h2 className='text-3xl font-semibold mb-4'>Overall Analytics</h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />{' '}
              {/* Light gray grid for contrast */}
              <XAxis dataKey='name' stroke='#E2E8F0' />
              <YAxis stroke='#E2E8F0' />
              <Tooltip />
              {/* Lines in lighter shades for contrast */}
              <Line
                type='monotone'
                dataKey='views'
                stroke='#A0AEC0'
                strokeWidth={3}
                dot={{ r: 5 }}
              />{' '}
              {/* gray-400 */}
              <Line
                type='monotone'
                dataKey='applications'
                stroke='#CBD5E0'
                strokeWidth={3}
                dot={{ r: 5 }}
              />{' '}
              {/* gray-200 */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
