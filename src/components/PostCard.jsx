import React from 'react'
import service from '../appwrite/db'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import parse from "html-react-parser";





const PostCard = ({$id,featuredImage,title,content}) => {



  return (
<Link to={`/post/${$id}`}>
  <div className='flex flex-col sm:flex-row gap-2 justify-center sm:justify-evenly w-full  h-auto sm:h-[40vh] p-4 sm:p-5 bg-white border rounded-md border-gray-400'>
    {/* Image Section */}
    <div className='my-auto flex justify-center sm:block '>
      <img
        src={service.getFilePreview(featuredImage)}
        alt="error in loading img"
        className='w-[60vw] h-auto sm:w-auto sm:max-w-60 sm:max-h-60  rounded-xl'
      />
    </div>

    {/* Text and Button Section */}
    <div className='flex flex-col gap-3 justify-center items-center text-center  myfont'>
      <h2 className='text-lg sm:text-xl font-light text-gray-600'>
        {title}
      </h2>
      <button className='w-fit bg-black text-white hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white px-6 sm:px-8 py-2 font-light'>
        Read Full Blog
      </button>
    </div>
  </div>
</Link>

  )
}

export default PostCard