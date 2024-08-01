import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userSlice';
import { HamburgerMenu } from '../../landingpage/design/Header';
// import {MenuSvg}

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDash,setOpenDash] = useState(false);

  return (
    <>
    {/* <HamburgerMenu /> */}
    <aside className='fixed h-screen bg-secondary-dark w-52 text-white hidden md:block'>
      <div className="px-4 pt-4">
        <h1 className='font-bold text-3xl my-7'>Dashboard</h1>
        <div className="nav-links">
          <ul className='text-center'>
            <Link to={"Dashboard"}>
              <li className='w-full hover:bg-white hover:text-black rounded-lg p-3 my-2'>
                Home
              </li>
            </Link>
            <Link to={"Jobs"}>    
              <li className='w-full hover:bg-white hover:text-black rounded-lg p-3 my-2'>
                Jobs
              </li>
            </Link>
            <Link to={"profile"}>    
              <li className='w-full hover:bg-white hover:text-black rounded-lg p-3 my-2'>
                Profile
              </li>
            </Link>
            <Button 
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              variant="contained" 
              color="primary" 
              className="my-2 w-full hover:bg-white hover:text-black transition-colors rounded-lg p-3">
              Logout
            </Button>
          </ul>
        </div>
      </div>
    </aside>
    </>
  );
}

export default Navbar;
