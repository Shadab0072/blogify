import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import Container from '../components/Container'
import service from '../appwrite/db'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import inactive from '../assets/inactive.jpg'


const AllPost = () => {

    const [posts,setPosts] = useState([]);

    
     //console.log(posts ,"all post se value a rhi h")

    useEffect(()=>{
        service.getAllPost([]).then((AllPost)=>{
            if (AllPost) {
                setPosts(AllPost.documents)
            }

        })
    },[])


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

    <>  

<div className='bg-white w-full  flex flex-col items-center md:p-10 py-8 '>
  {/* Responsive Grid Layout for Posts */}
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:w-full  px-4       '>
    {[...posts].reverse().map((post) =>
      post.status === "active" ? (
        <div key={post.$id} className='p-2 w-full '>
          <PostCard {...post} />
        </div>
      ) : null
    )}
  </div>

  {/* Floating Button for Inactive Posts */}
        <Link to="/all-posts/inactive"> 
                <span className="floating-button">
                        <img className="floating-image" src={inactive} alt="Floating Button" />     
                </span>
        </Link>   


</div>



    
    
    </>


    

    

  )
}

export default AllPost