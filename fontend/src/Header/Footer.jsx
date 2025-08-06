import React from 'react';
import { Link, NavLink } from 'react-router';
import icon from '../assets/logo.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
const Footer = () => {
      const links= <>
        <NavLink  to="/" className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}> Home
        </NavLink>
            <NavLink to={`/schedule`} className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}>My-Bookings</NavLink>
            <NavLink to={`/questions`} className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}>Blogs</NavLink>
            <NavLink to={`/user`} className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}>User Details</NavLink>
        </>
    return (
        <div className=' bg-white px-5 md:px-12 py-16'>
       <div className='text-center justify-center place-items-center'>
       <div className=' lg:w-2/3 mx-auto border-b border-dashed border-gray-300 pt-8'>
        <div className='flex justify-around place-items-center mb-5'>
            <Link to={`/`} ><div className='flex gap-3  '>
        <img src={icon} className='w-10' alt="" />
        <h1 className='text-3xl font-bold'>Online Health Care</h1>
        </div></Link>
        <div className='justify-center place-items-center my-5'>{links}</div>

         </div>
         
        </div>
        <div className='mt-8 flex gap-4'>
            <button className=''   onClick={() => window.open('https://www.facebook.com/ridwanul.basit')} ><FaFacebook size={30} color="#1877F2"  /></button>
            <button className=''   onClick={() => window.open('https://www.instagram.com/ridwanul_basit/')}> <FaInstagram size={30} color="#E1306C" /></button>
            <button className=''onClick={() => window.open('https://www.linkedin.com/in/md-ridwanul-basit/')} > <FaLinkedin size={30} color="#0A66C2" /></button>

          </div>

       </div>
       

        </div>  
    );
};

export default Footer;