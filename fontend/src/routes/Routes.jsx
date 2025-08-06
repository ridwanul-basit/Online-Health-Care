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
          Component: Appoinment,
          errorElement: <ErrorDoctor></ErrorDoctor>,
          loader: ()=> fetch('../doctor.json'),
        },
        {
          path:"/schedule",
          Component: Schedule,
          loader: () => fetch('/doctor.json'),

        },
        
      ] 
    },
    // {
    //   path:"/contact",
          
    //   Component: Working,
    // }
  ]);