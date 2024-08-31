import React, { useEffect, useState } from 'react'
//import Container from '../components/Container'
import service from '../appwrite/db'
import PostForm from '../components/PostForm'
import { useNavigate,  useParams } from 'react-router-dom';

const EditPost = () => {

    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate()

    // console.log(slug)
    // console.log(post)

    useEffect(()=>{
        if (slug) {
            service.getPost(slug).then((item)=>{
                setPost(item)
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])


  return post ?
                <div className=''>
                        {/* <Container> */}
                            <PostForm post={post} />
                        {/* </Container> */}
                </div>
                : <div className="w-full h-[50vh] flex justify-center items-center bg-white">
                          <div className="">
                                    <div className='loader'></div>
                         </div>
                  </div>
}

export default EditPost