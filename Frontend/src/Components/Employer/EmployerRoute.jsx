import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import Topbar from './navbar/Topbar'
import Sidebar from './navbar/Sidebar'
import Header from './navbar/Header'
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';


const EmployerRoute = () => {
  const user = useSelector((state)=>state.user);
  const navigate = useNavigate();

  if (user.auth && user.role === "employer"){
  return (
    <div className='flex h-full '>
      {/* <Navbar />
       */}
    <Sidebar  />  
      
      <div className='flex flex-col flex-1 ml-64 '>
        {/* <Topbar /> */}
        <Header/>
        <div className='py-4'>
          <Outlet className="bg-gray-200 "/>
        </div>
      </div>
    </div>
  )}
  else{
    navigate('/login/jobseeker');
    return null;
  }
}

export default EmployerRoute