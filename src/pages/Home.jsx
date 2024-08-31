import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import service from '../appwrite/db'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import img1 from '../assets/photo.webp'

const Home = () => {

    const [posts,setPosts] = useState([])

    const authStatus = useSelector((state)=>state.auth.status)

    useEffect(()=>{
        service.getAllPost().then((AllPost)=>{
            if (AllPost) {
                setPosts(AllPost.documents)
            }
        })
    },[])

    

    if ( authStatus==false) {
        return (
            <>      
            <div className="w-[100vw] overflow-x-hidden flex flex-col gap-5 items-center bg-custom-image h-[85vh] bg-cover bg-center px-4 md:px-8">
          
              {/* Heading Section */}
              <h1 className="text-black text-5xl md:text-6xl myfont my-8 text-center">
                Publish your passions, your way
              </h1>
              <h3 className="text-black text-2xl md:text-3xl myNewFont text-center">
                Create a unique and beautiful blog easily.
              </h3>
            </div>
          
            {/* Content Section */}
            <div className='bg-white'>
              <div className='p-10 md:p-28 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 myNewfont w-full'>
                
                {/* Image Container */}
                <div className='w-48 md:w-72'>
                  <img src={img1} alt="" className="w-full" />
                </div>
          
                {/* Button Container */}
                <Link to={'/login'}>
                  <button className='w-full md:w-fit bg-black text-white hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white px-6 py-3 md:px-8 md:py-4 text-xl md:text-2xl font-light'>
                    Login To Read Posts
                  </button>
                </Link>
              </div>
            </div>
          </>
          
        )
    }

    if (posts.length === 0 ) {
        return (
            <div className="w-full  h-[60vh] flex justify-center items-center bg-white">
              
            <div className="">
                
                <div className='loader'></div>
                
            </div>
        
    </div>
        )
    }

    return (
      <div className='w-full bg-white'>
       <div className="w-[100vw] overflow-x-hidden flex flex-col gap-5 items-center bg-custom-image h-[85vh] bg-cover bg-center px-4 md:px-8">
          
          {/* Heading Section */}
          <h1 className="text-black text-5xl md:text-6xl myfont my-8 text-center">
            Publish your passions, your way
          </h1>
          <h3 className="text-black text-2xl md:text-3xl myNewFont text-center">
            Create a unique and beautiful blog easily.
          </h3>
        </div>
    
      <div className='flex flex-col items-center p-4'>
        {posts.slice(0, 4).map((post) => (
          <div key={post.$id} className='p-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2'>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    
      <div className='flex flex-row items-center justify-center h-40'>
        <Link to='/all-posts'>
          <button className='myfont w-fit bg-black text-white hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white px-6 py-2 sm:px-8 md:px-12 font-light'>
            View All Posts
          </button>
        </Link>
      </div>
    </div>
    
    )
}

export default Home