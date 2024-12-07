import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import React, { useEffect, useRef, useState } from 'react'
import { FaCode } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { NavLink, useLocation } from 'react-router-dom'
import codeIcon from '../../../assets/svg/vsCodeIcon.svg'

import SidebarLinkGroup from './SidebarLinkGroup'

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation()
  const { pathname } = location

  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded)
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded')
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      {/* <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div> */}

      {/* Sidebar */}
      <div
        id='sidebar'
        ref={sidebar}
        className={`sticky flex flex-col z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
        style={{
          position: 'fixed', // Fixed position to prevent scrolling
        }}
      >
        {/* Sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          {/* Close button */}
          <button
            ref={trigger}
            className='lg:hidden text-slate-500 hover:text-slate-400'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
          >
            <span className='sr-only'>Close sidebar</span>
            <svg
              className='w-6 h-6 fill-current'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to='/admin/Dashboard' className='block'>
            <p className='text-white font-bold text-xl text-center'>
              Dashboard
            </p>
          </NavLink>
        </div>

        {/* Links */}
        <div className='space-y-8'>
          {/* Pages group */}
          <div>
            <h3 className='text-xs uppercase text-slate-500 font-semibold pl-3'>
              <span
                className='hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6'
                aria-hidden='true'
              >
                •••
              </span>
              <span className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                Pages
              </span>
            </h3>
            <ul className='mt-3'>
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === '/' || pathname.includes('dashboard')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className='shrink-0 h-6 w-6'
                              viewBox='0 0 24 24'
                            >
                              <path
                                className={`fill-current ${
                                  pathname === '/' ||
                                  pathname.includes('dashboard')
                                    ? 'text-indigo-500'
                                    : 'text-slate-400'
                                }`}
                                d='M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z'
                              />
                              <path
                                className={`fill-current ${
                                  pathname === '/' ||
                                  pathname.includes('dashboard')
                                    ? 'text-indigo-600'
                                    : 'text-slate-600'
                                }`}
                                d='M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z'
                              />
                              <path
                                className={`fill-current ${
                                  pathname === '/' ||
                                  pathname.includes('dashboard')
                                    ? 'text-indigo-200'
                                    : 'text-slate-400'
                                }`}
                                d='M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z'
                              />
                            </svg>
                            <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='./Dashboard'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Main
                              </span>
                            </NavLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='dashboard/analytics'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='/dashboard/fintech'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Fintech
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>

              {/* Job Board */}
              <SidebarLinkGroup activecondition={pathname.includes('job')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('job')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className='shrink-0 h-6 w-6'
                              viewBox='0 0 24 24'
                            >
                              <path
                                className={`fill-current ${
                                  pathname.includes('job')
                                    ? 'text-indigo-600'
                                    : 'text-slate-700'
                                }`}
                                d='M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z'
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes('job')
                                    ? 'text-indigo-500'
                                    : 'text-slate-600'
                                }`}
                                d='M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z'
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes('job')
                                    ? 'text-indigo-300'
                                    : 'text-slate-400'
                                }`}
                                d='M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z'
                              />
                            </svg>
                            <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Job Board
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='job/listings'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                View Jobs
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* User management */}
              <SidebarLinkGroup activecondition={pathname.includes('user')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('user')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <PersonIcon />
                            <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              User Management
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='users/jobseekers'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                View JobSeekers
                              </span>
                            </NavLink>
                          </li>

                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='users/employees'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                View Employees
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Manage Companies */}
              <SidebarLinkGroup
                activecondition={pathname.includes('companies')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('questionBank')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <BusinessIcon />
                            <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Manage Companies
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='./companies'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Manage Companies
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Manage Question bank */}
              <SidebarLinkGroup
                activecondition={pathname.includes('questionBank')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('companies')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            {/* <img className='w-8' src={codeIcon} alt='codeIcon' /> */}
                            <FaCode />
                            <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Manage Question Bank
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='./create/questionBank'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Create Question Bank
                              </span>
                            </NavLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='./view/questionBank'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                View Question Bank
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Manage Skill Development resources*/}
              <SidebarLinkGroup
                activecondition={pathname.includes('skillDevelopment')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href='#0'
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('skillDevelopment')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <GiSkills />
                            <span className='text-xs font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Skill Development Resources
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='./create/skillDevelopment'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Create Skill Development Resources
                              </span>
                            </NavLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <NavLink
                              end
                              to='./manage/skillDevelopment'
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Manage Skill Development Resources
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* Messages */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('messages') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='messages'
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('messages')
                      ? 'hover:text-slate-200'
                      : 'hover:text-white'
                  }`}
                >
                  <div className='flex items-center justify-between'>
                    <div className='grow flex items-center'>
                      <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                        <path
                          className={`fill-current ${
                            pathname.includes('messages')
                              ? 'text-indigo-500'
                              : 'text-slate-600'
                          }`}
                          d='M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z'
                        />
                        <path
                          className={`fill-current ${
                            pathname.includes('messages')
                              ? 'text-indigo-300'
                              : 'text-slate-400'
                          }`}
                          d='M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z'
                        />
                      </svg>
                      <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                        Messages
                      </span>
                    </div>
                    {/* Badge */}
                    <div className='flex flex-shrink-0 ml-2'>
                      <span className='inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded'>
                        4
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              {/* Inbox */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('inbox') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='inbox'
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox')
                      ? 'hover:text-slate-200'
                      : 'hover:text-white'
                  }`}
                >
                  <div className='flex items-center'>
                    <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                      <path
                        className={`fill-current ${
                          pathname.includes('inbox')
                            ? 'text-indigo-500'
                            : 'text-slate-600'
                        }`}
                        d='M16 13v4H8v-4H0l3-9h18l3 9h-8Z'
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes('inbox')
                            ? 'text-indigo-300'
                            : 'text-slate-400'
                        }`}
                        d='m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z'
                      />
                    </svg>
                    <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                      Inbox
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Calendar */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('calendar') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='/calendar'
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('calendar')
                      ? 'hover:text-slate-200'
                      : 'hover:text-white'
                  }`}
                >
                  <div className='flex items-center'>
                    <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                      <path
                        className={`fill-current ${
                          pathname.includes('calendar')
                            ? 'text-indigo-500'
                            : 'text-slate-600'
                        }`}
                        d='M1 3h22v20H1z'
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes('calendar')
                            ? 'text-indigo-300'
                            : 'text-slate-400'
                        }`}
                        d='M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z'
                      />
                    </svg>
                    <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                      Calendar
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className='pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto'>
          <div className='px-3 py-2'>
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className='sr-only'>Expand / collapse sidebar</span>
              <svg
                className='w-6 h-6 fill-current sidebar-expanded:rotate-180'
                viewBox='0 0 24 24'
              >
                <path
                  className='text-slate-400'
                  d='M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z'
                />
                <path className='text-slate-600' d='M3 23H1V1h2z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
