import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import Sidebar from './navbar/Sidebar';
import Header from './navbar/Header';

const AdminRoutes = () => {
  const user = useSelector((state)=>state.user);
  const navigate = useNavigate();

  if (user.auth && user.role === "admin"){
  return (
    <div className='flex h-full'>
      {/* <Navbar /> */}
      <Sidebar />
      <div className='flex flex-col flex-1 ml-64'>
        {/* <Topbar /> */}
        <Header/>
        <div className='py-4'>
          <Outlet className="bg-gray-200 "/>
        </div>
      </div>
    </div>
  );}else{
    navigate('/login/admin');
    return null;
  }
}

export default AdminRoutes;
