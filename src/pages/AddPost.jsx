import React from 'react'
import PostForm from '../components/PostForm'
import Container from '../components/Container'
import { useSelector } from 'react-redux'
import img1 from '../assets/photo.webp'
import { Link } from 'react-router-dom'

const AddPost = () => {

   const authStatus = useSelector((state)=>state.auth.status)
   if ( authStatus==false) {
      return (
        <>      
        <div className="flex flex-col gap-5 items-center bg-custom-image   h-[85vh] bg-cover bg-center">

            <h1 className="text-black text-6xl myfont mt-10">Publish your passions, your way </h1>
            <h3  className="text-black text-3xl myNewFont">  Create a unique and beautiful blog easily.</h3>
        </div>

        <div className=' bg-white'>
        <div className='p-28  flex  justify-center items-center gap-20 myNewfont  w-full '>
            <div className='w-72 '>
                <img src={img1} alt="" />
            </div>
            <Link to={'/login'}>
            <button className='w-fit bg-black text-white  hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white px-8 py-4  text-2xl font-light'>
                Login To Read Posts
            </button>
            </Link>
        </div>
        </div>
</> 
      )
  }
  

  return (

     <div className=''>
       

             <PostForm/>

        
     </div>

  )
}

export default AddPost
