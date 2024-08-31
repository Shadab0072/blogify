import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  const [loading,setLoading] = useState(true)

  console.log(loading)
  
  const dispatch = useDispatch()

  useEffect(()=>{
          authService.getCurrentUser().then((userData)=>{
            if (userData) {
              dispatch(login(userData))
            } else {
              dispatch(logout())
            }
          }).finally(
            setLoading(false)
          )
  },[])
 return !loading ? (<div>
  <div className=''>
      <div className='w-full block'>
        <Header />
        <main>
          
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
 </div>): null

}

export default App





