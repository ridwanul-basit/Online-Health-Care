import React from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router';
import { TbCircleLetterR } from "react-icons/tb";
import { addAppointment } from '../schedule'; 


const Appoinment = () => {
    const data = useLoaderData();
    const { id } = useParams();
    const navigate = useNavigate(); // ✅ FIXED: moved here from inside function

    const singleData = data.find(data => parseInt(data.id) === parseInt(id)) || [];
    const { image, name, education, registration, availability, fee, hospital } = singleData || {};

    const handleAppointment = () => {
        const added = addAppointment(singleData);
        if (added) {
            toast.success("Appointment Of `${name}`");
            navigate('/schedule'); // ✅ This will now work fine
        }
    };

    return (
        <div className='mx-5 lg:mx-0 mb-8'>
         <div className='text-center bg-white rounded-xl py-12 my-10 '>
                <h1 className='text-2xl font-bold '>Doctor’s Profile Details</h1>
                <p className='text-gray-500 pt-5'>Doctors are ready to help you. We serve to help people and try to save their life. If you ar facing any problem come to our consultation.</p>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-sm p-8 rounded-xl mb-10">
            <div >
                <img
                className='rounded-2xl w-100' 
                src={image}
                alt="Album" />
            </div>
            <div className="flex flex-auto flex-col ml-5 mt-5">
                <div class="border-b border-dashed border-gray-300 pb-4" >
                    <h2 className="card-title font-bold text-2xl ">{name}</h2>
                        <p className='text-gray-500 pb-5'>{education.join("-").replace(", -", "-")}</p>
                        <p className='text-gray-500 pb-4'>Working At</p>
                        <p className='text-xl font-bold'>{hospital}</p>
            </div>
            <div className='flex gap-3 py-4 border-b border-dashed border-gray-300'>
                      <TbCircleLetterR size={20} className='text-gray-500'/>
                      <p className='text-gray-500'> Reg No : {registration}</p>   
           
            </div>

            <div className='flex gap-3 my-4 '>
                <p className='font-bold'>Availability</p>
                <div className=" grid grid-cols-2 mb-4 md:flex gap-2">
                        {availability.map((day) => (
                            <small
                            key={day}
                            className="border  border-solid border-[rgba(255,160,0,0.1)] bg-[rgba(255,160,0,0.1)] rounded-2xl text-center py-1 px-3 text-[rgb(255,160,0)]"
                            >
                            {day}
                            </small>
                        ))}
              </div>
            </div>
                
            <div className="">
                <p > <span className='font-bold'>Consultation Fee:</span> <span className='text-[rgb(23,106,229)] font-bold'>Taka: {fee} <span className='text-gray-500'>(incl.vat)</span> Per Consultation</span></p>
                
                </div>
            </div>
            </div>

            <div className=' bg-white rounded-xl pt-6 pb-10 '>
            <div class="border-b border-dashed border-gray-300 pb-4 text-center justify-between place-items-center mx-4" >
                    <h2 className="card-title font-bold text-2xl ">Book an Appointment</h2>             
            </div>

            <div class="card-title border-b border-dashed border-gray-300 py-4 text-center justify-between place-items-center mx-4" >
                    <p>Avaibility</p>
                    <small className='border  border-solid border-[rgba(23,106,229,0.2)] bg-[rgba(23,106,229,0.1)] rounded-2xl text-center  px-3 text-[rgb(9,152,47)]'>Doctor Available Today</small>     

            </div>

            <div className='flex  mx-4 mt-4 '>
                
                <p className='border  border-solid border-[rgba(255,160,0,0.1)] bg-[rgba(255,160,0,0.1)] rounded-2xl text-center  px-3 text-[rgb(255,160,0)]' >Due to high patient volume, we are currently accepting appointments for today only. We appreciate your understanding and cooperation.</p>

            </div>

            <div className='mx-14 mt-10'>
            <button onClick={handleAppointment} className="btn rounded-3xl bg-[rgb(23,106,229)] w-full text-white px-4 md:px-7 lg:px-10 " >Book Appointment Now</button>
            </div>
            </div>

        </div>
    );
};

export default Appoinment;