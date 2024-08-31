import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./Index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const [error , setError] = useState("");
    const [loading, setLoading] = useState(false);




    const create = async(data) => {
        setLoading(true);

        setError("")
        try {

            const session =await authService.createAccount(data);
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData));
                    navigate('/')
                }
            }
            
        } catch (error) {
            setError(error.message)
        }finally {
            setLoading(false); // Set loading to false after login is complete
          }
    }

  return (
    <div className=" flex justify-center w-full h-auto bg-white p-4">
    <div className="flex flex-col gap-10 items-center mt-4 w-full max-w-md ">
      {/* Logo */}
      <div>
        <Logo width="150px" />
      </div>
  
      {/* Heading and Subheading */}
      <div className="flex flex-col items-center text-center">
        <h2 className="myfont text-2xl md:text-4xl font-bold">Create a Blogify Account</h2>
        <p className="mt-2 text-sm md:text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
  
      {/* Form */}
      <form onSubmit={handleSubmit(create)} className="w-full ">
         {/* Error Message */}
      {error && (
<<<<<<< HEAD
        <p className="text-red-600  text-center">
          {error}Password must be between 8 and 265 characters long
=======
        <p className="text-red-600  text-center">{error}
          Password must be between 8 and 265 characters long
>>>>>>> cd1fd0fd85afc27869ad9b7c1be3cc181e29b5ee
        </p>
      )}
        <div className="flex flex-col md:px-12 items-center gap-4">
            
     
          {/* Full Name Input */}
          <Input
            label="Full Name:"
            placeholder=""
            {...register("name", {
              required: true,
            })}
          />
  
          {/* Email Input */}
          <Input
            label="Email:"
            type="email"
            {...register('email', {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />
  
          {/* Password Input */}
          <Input
            label="Password:"
            type="password"
            {...register('password', {
              required: true,
            })}
          />
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white px-4 py-2 font-light"
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
  
        {/* Loading Spinner */}
        <div className="text-lg flex justify-center mt-3">
          {loading ? <div className="loader"></div> : null}
        </div>
      </form>
  
    </div>
  </div>
  
  )
}

export default SignupForm
