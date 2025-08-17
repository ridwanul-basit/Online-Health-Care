import React from 'react';
import {
    createBrowserRouter,
    Route,
    Router,
  } from "react-router";
import Root from './Root';
import Body from '../Header/Body';
import ErrorDoctor from '../pages/ErrorDoctor';
import Schedule from '../schedule/Schedule';
import Appoinment from '../Header/Appoinment';
import Loader from '../pages/Loader';
import ErrorHome from '../pages/ErrorHome';
import Authen from '../components/Authen';
import Login from '../components/Login';
import Register from '../components/Register';
import PrivateRoute from '../components/Privateroute';
import Profile from '../components/Profile';
import DoctorForm from '../components/DoctorForm';


export const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Root></Root>,
      hydrateFallbackElement: <Loader></Loader>,
      errorElement: <ErrorHome></ErrorHome>,
      children: [
        {
          path:"/",
          Component: Body,
          loader: ()=> fetch('../doctor.json'),
        },
        {
          path:"/appoinment/:id",
          element:(<PrivateRoute>
            <Appoinment></Appoinment>
            </PrivateRoute>),
         
          errorElement: <ErrorDoctor></ErrorDoctor>,
          loader: ()=> fetch('../doctor.json'),
        },
        {
          path:"/schedule",
          element:(<PrivateRoute>
            <Schedule></Schedule>
            </PrivateRoute>),
          loader: () => fetch('/doctor.json'),

        },
        {
          path:"/userDetails",
          element:(<PrivateRoute>
            <Profile></Profile>
            </PrivateRoute>),
         

        },
        {
          path:"/add-business",
          element:(<PrivateRoute>
            <DoctorForm></DoctorForm>
            </PrivateRoute>),
         
        },
        
      ] 
    },
    {
        path: "/auth",
        element: <Authen></Authen>,
        children:[
            {
                path: "/auth/login",
                element : <Login></Login>,
               },
               {
                path: "/auth/register",
                element : <Register></Register>,
               }
        ]

    }
    // {
    //   path:"/contact",
          
    //   Component: Working,
    // }
  ]);