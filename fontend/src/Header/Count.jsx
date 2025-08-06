import React from 'react';

import doc from '../assets/success-doctor.png'
import rev from '../assets/success-review.png'
import pat from '../assets/success-patients.png'
import stuff from '../assets/success-staffs.png'
import CountUp from 'react-countup';


const Count = () => {
    return (
        <div className='w-10/12 mx-auto my-8'>
            <div className='text-center mb-7'>
                <h1 className='text-3xl pb-4 font-bold'>We Provide Best Medical Services</h1>
                <p className='text-gray-500'>Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. </p>
            </div>

            <div className='mb-4 lg:mb-0 grid grid-cols-2 lg:grid-cols-4 gap-8'>

                <div className='bg-white py-6 pl-8 pr-4 rounded-2xl '>
                    <img src={doc} alt="" className='w-10 pb-3' />
                    <h1 className='text-4xl font-extrabold pb-2'><CountUp end={199}  duration={10} /><span>+</span></h1>
                    <p className='text-gray-500'>Total Doctors</p>
                </div>
                <div className='bg-white py-6 pl-8 pr-4 rounded-2xl '>
                    <img src={rev} alt="" className='w-10 pb-3' />
                    <h1 className='text-4xl font-extrabold pb-2'><CountUp end={467} duration={10} /><span>+</span></h1>
                    <p className='text-gray-500'>Total Reviews</p>
                </div>
                <div className='bg-white py-6 pl-8 pr-4 rounded-2xl '>
                    <img src={pat} alt="" className='w-10 pb-3' />
                    <h1 className='text-4xl font-extrabold pb-2'><CountUp end={1900}  duration={10} /><span>+</span></h1>
                    <p className='text-gray-500'>Total Patients</p>
                </div>
                <div className='bg-white py-6 pl-8 pr-4 rounded-2xl '>
                    <img src={stuff} alt="" className='w-10 pb-3' />
                    <h1 className='text-4xl font-extrabold pb-2'><CountUp end={300}  duration={10} /><span>+</span></h1>
                    <p className='text-gray-500'>Total Stuffs</p>
                </div>
            </div>
        </div>
    );
};

export default Count;