import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Header/Navbar';
import Footer from '../Header/Footer';


const Authen = () => {
    return (
        <div className='bg-base-200'>
           <header className='w-11/12 py-3 mx-auto '>
           <Navbar></Navbar>

           </header>
           <main  className='w-11/12 mx-auto '>
           <Outlet></Outlet>
           </main>
           <Footer></Footer>
           

        </div>
    );
};

export default Authen;