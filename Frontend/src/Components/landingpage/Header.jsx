import { useLocation, useNavigate } from 'react-router-dom'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { HashLink as Link } from 'react-router-hash-link'

import { skillSync } from '../../assets'
import { navigation } from '../../constants'
import Button from './Button'
import MenuSvg from '../../assets/svg/MenuSvg'
import { useState, useEffect } from 'react'

const Header = () => {
  const pathname = useLocation()
  const navigate = useNavigate()
  const [openNavigation, setOpenNavigation] = useState(false)

  // Function to toggle the navigation menu
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false)
      enablePageScroll()
    } else {
      setOpenNavigation(true)
      disablePageScroll()
    }
  }

  // Admin login shortcut with key combination (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        navigate('/login/admin')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  // Close navigation when a link is clicked
  const handleClick = () => {
    if (!openNavigation) return

    enablePageScroll()
    setOpenNavigation(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all border-b border-gray-200 lg:bg-opacity-90 lg:backdrop-blur-sm ${
        // ? 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-500' // Option 1: Vibrant Sunset
        'bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-700' // Option 2: Cool Blue
        // :// ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" // Option 3: Warm Glow
        //   'bg-gradient-to-r from-orange-500 via-red-500 to-purple-500/90' // Adjust transparency for closed state
      }`}
    >
      <div className='flex items-center justify-between px-5 py-4 lg:px-8'>
        {/* Logo */}
        <Link to={'/#hero'} className='block w-48 lg:w-[12rem]'>
          <img src={skillSync} width={190} height={40} alt='SkillSync' />
        </Link>

        {/* Navigation */}
        <nav
          className={`${
            openNavigation ? 'flex' : 'hidden'
          } fixed inset-0 top-16  to-purple-500 lg:relative lg:flex lg:top-0 lg:bg-transparent lg:w-auto lg:mx-auto transition-all`}
        >
          <div className='flex flex-col lg:flex-row items-center justify-center w-full lg:w-auto'>
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block text-center text-lg lg:text-lg uppercase font-semibold text-white transition-colors duration-300 hover:text-yellow-500 px-4 py-6 lg:py-0 lg:px-6 ${
                  item.onlyMobile ? 'lg:hidden' : ''
                } ${
                  item.url === pathname.hash ? 'text-yellow-500' : 'text-white'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Hamburger Menu */}
        <Button
          className='ml-auto lg:hidden'
          px='px-3'
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </header>
  )
}

export default Header
