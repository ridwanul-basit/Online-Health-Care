import React from 'react';
import { Link } from 'react-router';

const NoDoctor = () => {
    return (
        <div className='justify-center place-items-center px-8'>

        <h1 className='mb-10 text-black font-bold text-3xl'>You have not Booked any appointment yet  </h1>
        <p className='mb-6'>Our platform connects you with verified, experienced doctors across various specialties — all at your convenience.</p>

       <Link to={`/`} > <button className="btn rounded-3xl bg-[rgb(23,106,229)] text-white px-4 md:px-7 lg:px-10" >Book An Appointment</button></Link>
        </div>
    );
};

export default NoDoctor;