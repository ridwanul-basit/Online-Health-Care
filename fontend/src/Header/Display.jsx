import React from 'react';
import Doctors from './Doctors';

const Display = () => {
    return (
        <div className=' text-center'>
           <div>
            <h1 className='text-3xl font-bold'>Dependable Care, Backed by Trusted <br /> Professionals.</h1>
            <p className=' text-gray-600 py-5'>Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a <br /> routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>
            <form action="" className='flex flex-col md:flex-row justify-center items-center '>
            <input type="text" name="" id="" placeholder='Search Any Doctor' className='px-3 rounded-2xl bg-white border border-gray-300 w-1/3 h-10 focus:outline-none focus:shadow-outline mr-3 mb-4 md:mb-0'   />
            <button><a className="btn rounded-3xl bg-[rgb(23,106,229)] text-white px-4 md:px-7 lg:px-10">Search Now</a></button>
            </form>
           </div>
        </div>
    );
};

export default Display;