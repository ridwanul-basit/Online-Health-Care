
import React from 'react';
import banner from '../assets/banner-img-1.png'
import banner2 from '../assets/doctors.png'




const Doctors = () => {
    
    return (
        <div className='lg:flex gap-5 justify-center pt-7 mx-5'>
            <div className='mb-8 lg:mb-0'><img src={banner} alt="" className='rounded-xl  ' /></div>
            <div><img src={banner2} alt="" className='rounded-xl w-full h-88' /></div>

            
        </div>
    );
};

export default Doctors;