import React from 'react';
import { TbCircleLetterR } from "react-icons/tb";
import { Link } from 'react-router';
const DetailsBox = ({data}) => {
    const {id,image,name,education,registration,experience} = data || {}
    
    return (
        <div className='mb-8 mx-3'>
                <div className="card bg-base-100 shadow-sm">
        <figure className="px-10 pt-10">
            <img
            src={image}
            alt="Shoes"
            className="rounded-xl w-full h-80" />
        </figure>
        <div className="card-body ml-5">
            <div className='flex gap-2'>
                <small className='border border-solid border-[rgba(9,152,47,0.2)] bg-[rgba(9,152,47,0.1)] font-bold rounded-2xl text-center py-1 px-3 text-green-500'>Available</small>
                <small className='border  border-solid border-[rgba(23,106,229,0.2)] bg-[rgba(23,106,229,0.1)] font-bold rounded-2xl text-center py-1 px-3 text-[rgb(23,106,229)]'>{experience}</small>
            </div>
           <div class="border-b border-dashed border-gray-300 pb-2" >
           <h2 className="card-title font-bold text-2xl ">{name}</h2>
            <p className='text-gray-500'>{education.join("-").replace(", -", "-")}</p>
           </div>
           <div className='flex gap-3 pb-2'>
           <TbCircleLetterR size={20} className='text-gray-500'/>
           <p className='text-gray-500'> Reg No : {registration}</p>   

           </div>
            
            <Link to={`/appoinment/${id}`} ><button className="btn btn-outline border-[rgb(23,106,229)] w-full rounded-xl text-[rgb(23,106,229)]">View Details</button></Link>
            
        </div>
        </div>
        </div>
    );
};

export default DetailsBox;