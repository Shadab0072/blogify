import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/authLayout.jsx'
//import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import React from 'react'
import LoginForm from './components/LoginForm.jsx'
import Inative from './pages/Inative.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false} >
               <LoginForm />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false} >
               <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication >
               {" "}
               <AllPost />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element:  <AddPost /> 
        //  (
        //   <AuthLayout authentication >
        //        {" "}
        //        <AddPost />
        //   </AuthLayout>
        // )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication >
               {" "}
               <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />,
    },
    {
      path: '/all-posts/inactive',
      element: <AuthLayout authentication >
                   <Inative/>
               </AuthLayout> 
    },
      

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
           <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,
  
)
