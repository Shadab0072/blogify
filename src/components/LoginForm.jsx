import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./Index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importing FontAwesome Icons

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full h-auto bg-white px-4 py-6">
      <div className="flex flex-col gap-10 items-center mt-4 w-full max-w-md">
        {/* Logo */}
        <div>
          <Logo width="150px" />
        </div>

        {/* Sign-in Heading */}
        <div className="text-center">
          <h2 className="myfont text-2xl md:text-4xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-sm md:text-base text-black/60">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="w-full max-w-xs">
          {/* Error Message */}
          {error && <p className="text-red-600 my-4 text-center">Invalid Email or Password</p>}
          <div className="flex flex-col items-center gap-4"> 
            {/* Email Input */}
            <Input
              label="Email : "
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

            {/* Password Input with Toggle */}
            <div className="relative w-full">
              <Input
                label="Password :"
                type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
                {...register('password', { required: true })}
                className="pr-10" // Add padding to make space for the icon
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye} // Show eye or eye-slash icon
                onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black transition duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white px-4 py-2 font-light"
              disabled={loading}
            >
              Sign In
            </button>

            {/* Loading State */}
            <div className="text-xl">{loading ? <div className="loader"></div> : null}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
