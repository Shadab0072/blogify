import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'

const LogoutBtn = ({ onLogout }) => {  // Accept onLogout as a prop
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    setLoading(true)  // Set loading state

    try {
      await authService.logout()  // Call authService logout function
      dispatch(logout())  // Dispatch logout action
      if (onLogout) {
        onLogout()  // Call the parent component's onLogout function
      }
    } catch (error) {
      console.error('Logout failed:', error)  // Log any error that occurs during logout
    } finally {
      setLoading(false)  // Reset loading state
    }
  }

  return (
    <button
      onClick={logoutHandler}  // Attach logoutHandler to the button
      className='w-fit bg-black text-white hover:bg-slate-300 hover:text-slate-800 
      transition delay-100 border border-white px-6 py-2 font-light'
      disabled={loading}  // Disable button when loading
    >
      {loading ? 'Logging Out ...' : 'Logout'} {/* Display loading text */}
    </button>
  )
}

export default LogoutBtn
