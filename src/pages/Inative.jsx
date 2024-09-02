import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import service from '../appwrite/db'
import { Link } from 'react-router-dom'
import img1 from '../assets/photo.webp'
import { useSelector } from 'react-redux'


const Inative = () => {
    const [posts,setPosts] = useState([]);

    const userData = useSelector((state)=> state.auth.userData)
    //console.log(userData.$id )
    //console.log(posts.userId)


    posts.map((post) => console.log(post.userId))



    const authStatus = useSelector((state)=>state.auth.status)
    


    useEffect(()=>{
        service.getAllPost([]).then((AllPost)=>{
            if (AllPost) {
                setPosts(AllPost.documents)
            }

        })
    },[])


    if (posts.length === 0 ) {
      return (
          <div className="w-full h-[80vh] flex justify-center items-center bg-white">
              
                  <div className="">
                      
                      <div className='loader'></div>
                      
                  </div>
              
          </div>
      )
  }

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

    <>  

<div className='bg-white w-full  flex flex-col items-center justify-center px-12 pb-10'>
  {/* Title Section */}
  <h1 className='text-2xl md:text-4xl myfont font-bold my-6 md:my-10'>Inactive Posts</h1>


  {/* Posts Grid Section */}
  <div className='grid grid-cols-1  lg:grid-cols-2 gap-4  w-full '>

    {[...posts].reverse().map((post) =>
      post.status === "inactive" && post.userId === userData.$id ? (
        <div key={post.$id} className='w-full'>
          <PostCard {...post} />
        </div>
      ) : null
    )}

    
  </div>

</div>



    
    
    </>


    

    

  )
}

export default Inative