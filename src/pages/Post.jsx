import React, { useEffect, useState } from 'react'
import {Button,Container } from '../components/Index'
import service from '../appwrite/db'
import { useSelector } from 'react-redux'
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";


const Post = () => {
    
    const [post,setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state)=> state.auth.userData)

       // console.log(slug)
        // console.log(userData)
        // console.log(post)

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    
    
    
    useEffect(()=>{
        

        if (slug) {
           
            service.getPost(slug).then((item)=>{
                setPost(item)
            })

        }else{
            navigate('/')
        }
    },[slug,navigate])


    const deletePost = ()=>{
        service.deletePost(post.$id).then(
            (item)=>{
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        )
    }

   

    if (!post) {
        return ( <div className="w-full h-[50vh] flex justify-center items-center bg-white">
              
            <div className="">
                
                <div className='loader'></div>
                
            </div>
            </div>)
    }

  return  post ? ( 
    <div className='flex items-center justify-center'>

                    <div className="flex flex-col    md:flex-row mx-auto px-6 md:px-24 py-10 gap-10 bg-white w-full md:w-fit m-5 md:m-10">
                                    {/* Image Section */}
                                    <div className="w-full md:max-w-[400px] flex justify-center">
                                    <img
                                        src={service.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full max-w-full h-auto rounded-md"
                                    />
                                    </div>
                                
                                    {/* Content Section */}
                                    <div className="flex flex-col gap-6 justify-evenly w-full md:w-auto">
                                    <h1 className="text-lg md:text-2xl font-semibold border w-full md:w-fit p-4">
                                        <span className="myfont">Title: </span>
                                        {post.title}
                                    </h1>
                                
                                    <div className="browser-css text-base md:text-xl border w-full md:w-fit p-4">
                                        <span className="myfont">Content: </span>
                                        {parse(post.content)}
                                    </div>
                                
                                    {/* Edit and Delete Buttons for Author */}
                                    {isAuthor && (
                                        <div className="flex gap-3">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button bgColor="bg-green-500" className="mr-3">
                                            Edit
                                            </Button>
                                        </Link>
                                        <Button bgColor="bg-red-500" onClick={deletePost}>
                                            Delete
                                        </Button>
                                        </div>
                                    )}
                                    </div>
                    </div>
    </div>
    
  
    ) : null;
}

export default Post