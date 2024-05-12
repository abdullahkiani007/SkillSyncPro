import React from 'react'
import Navbar from './Components/landingpage/Navbar'
import { Outlet } from 'react-router-dom'
import Header from './Components/landingpage/Header'

const RootLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default RootLayout