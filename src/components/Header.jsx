// Header.jsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import LogoutBtn from './LogoutBtn'
import Logo from './Logo'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate() // Hook for navigation

  const navItems = [
    { name: 'Home', url: '/', active: true },
    { name: 'Login', url: '/login', active: !authStatus },
    { name: 'Signup', url: '/signup', active: !authStatus },
    { name: 'All Posts', url: '/all-posts', active: authStatus },
    { name: 'Add Post', url: '/add-post', active: authStatus },
  ]

  
  const handleLogout = () => {
    setIsOpen(false) // Close the menu
    navigate('/') // Navigate to the home screen
  }

  return (
    <header className='w-[100vw] overflow-x-hidden myfont px-4 bg-white relative shadow-[0_1px_0_rgba(0,0,0,0.2)]'>
      <nav className='flex  items-center justify-between px-4 py-3'>
        {/* Logo Section */}
        <div className='w-[100px] sm:w-[150px] sm:ml-8 sm:mb-3'>
          <NavLink to='/'>
            <Logo width='150px' />
          </NavLink>
        </div>

        {/* Hamburger Button for Smaller Screens */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)} // Toggle menu state
            className='text-gray-700 hover:text-black focus:outline-none'
          >
            <FontAwesomeIcon icon={faBars} className='sm:text-lg text-md mt-5' />
          </button>
        </div>

        {/* Nav Items Section */}
        <ul
          className={`fixed inset-0 bg-white flex flex-col items-center 
            justify-center transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:flex md:flex-row md:ml-auto md:space-x-4 md:translate-x-0`}
        >
          {/* Close Icon for Small Screens */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)} // Close menu on button click
              className='absolute top-12 right-4 text-gray-700 hover:text-black focus:outline-none md:hidden'
            >
              <FontAwesomeIcon className='px-4' icon={faTimes} size='lg' />
            </button>
          )}

          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name} className='py-2 md:py-0 text-xl'>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? 'inline-block px-6 py-2 font-bold rounded-full'
                        : 'inline-block px-6 py-2 hover:font-bold rounded-full'
                    }
                    onClick={() => setIsOpen(false)} // Close menu on link click
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
          )}

          {authStatus && (
            <li className='py-6 md:py-0 text-xl'>
              <LogoutBtn onLogout={handleLogout} /> {/* Pass the callback */}
            </li>
          )}

        </ul>
      </nav>
    </header>
  )
}

export default Header
