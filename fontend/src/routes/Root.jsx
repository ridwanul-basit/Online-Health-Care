import React from 'react';


import Navbar from '../Header/Navbar';
import Footer from '../Header/Footer';
import { Outlet } from 'react-router';
import Loader from '../pages/Loader';
import { useNavigation } from 'react-router';



const Root = () => {
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location) ;
    return (
        <div >
           <Navbar></Navbar>
           <div className='max-w-7xl mx-auto'>
            {isNavigating && <Loader></Loader>}
           <Outlet></Outlet>
           </div>
           <Footer></Footer>
          
           
        </div>
    );
};

export default Root;