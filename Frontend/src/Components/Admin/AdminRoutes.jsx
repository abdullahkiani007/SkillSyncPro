import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import Sidebar from './navbar/Sidebar'
import Header from './navbar/Header'

const AdminRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  if (user.auth && user.role === 'admin') {
    return (
      <div className='flex h-full'>
        {/* <Navbar /> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='flex flex-col flex-1 md:ml-64 '>
          {/* <Topbar /> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div>
            <Outlet className='bg-gray-200 ' />
          </div>
        </div>
      </div>
    )
  } else {
    navigate('/login/admin')
    return null
  }
}

export default AdminRoutes
