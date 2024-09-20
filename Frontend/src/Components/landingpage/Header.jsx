import { useLocation, useNavigate } from 'react-router-dom'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { HashLink as Link } from 'react-router-hash-link'

import { skillSync } from '../../assets'
import { navigation } from '../../constants'
import Button from './Button'
import MenuSvg from '../../assets/svg/MenuSvg'
import { HamburgerMenu } from './design/Header'
import { useState, useEffect } from 'react'

const Header = () => {
  const pathname = useLocation() // Get current path (hash and route info)
  const navigate = useNavigate() // For programmatic navigation
  const [openNavigation, setOpenNavigation] = useState(false) // State for toggling the mobile navigation menu

  // Toggle the mobile navigation and lock/unlock page scroll
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false)
      enablePageScroll() // Enable scrolling when the menu is closed
    } else {
      setOpenNavigation(true)
      disablePageScroll() // Disable scrolling when the menu is open
    }
  }

  // Key combination listener for admin login (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        navigate('/login/admin') // Redirect to the admin login page
      }
    }

    // Add the keydown event listener
    window.addEventListener('keydown', handleKeyDown)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  // Handle click on navigation link (close menu and enable scroll)
  const handleClick = () => {
    if (!openNavigation) return

    enablePageScroll()
    setOpenNavigation(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
      }`}
    >
      <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
        {/* Logo */}
        <Link to={'/#hero'} className='block w-[12rem] xl:mr-8'>
          <img src={skillSync} width={190} height={40} alt='SkillSync' />
        </Link>

        {/* Navigation Menu */}
        <nav
          className={`${
            openNavigation ? 'flex' : 'hidden'
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative  text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? 'lg:hidden' : ''
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? 'z-2 lg:text-n-1'
                    : 'lg:text-n-1/50'
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {/* Button to Toggle Mobile Navigation */}
        <Button
          className='ml-auto lg:hidden'
          px='px-3'
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  )
}

export default Header
