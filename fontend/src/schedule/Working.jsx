import React from 'react';
import { Link } from 'react-router';
import Navbar from '../Header/Navbar';

const Working = () => {
    return (
        <div>

            <Navbar></Navbar>
            <div className='py-18 text-center my-18'>

            <h1 className='text-4xl text-pink-600 pb-8'>Page Not Found</h1>
            <p className='pb-8'>We are working to fixed it soon. Stay Connected</p>
            <Link to={`/`} > <button className="btn rounded-3xl bg-[rgb(23,106,229)] text-white px-4 md:px-7 lg:px-10" >Go Back To Home</button></Link>
            
        </div>
        </div>
    );
};

export default Working;