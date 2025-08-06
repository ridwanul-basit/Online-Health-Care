import React from 'react';

const List = ({total,handleDelete}) => {

    const {id,name,education,fee} = total || {}
   
    return (
        <div className='mb-8   '>
            <div className=' bg-white py-8 rounded-xl px-8'>
            <div className='flex justify-between place-items-center border-b border-dashed border-gray-300 pb-2 '>
                <div class="" >
                    <h2 className="card-title font-bold text-2xl ">{name}</h2>
                        <p className='text-gray-500'>{education.join("-").replace(", -", "-")}</p>
            </div>
            <div>
            <p className='text-gray-500' > Appointment Fee: {fee}Taka + Vat</p> 
            </div>

            
            </div>
            <div className='mt-5'>
            <button onClick={()=>handleDelete(id)}  className="btn rounded-3xl border-[rgb(255,0,0)] w-full text-[rgb(255,0,0)] px-4 md:px-7 lg:px-10 font-semibold" >Cancel Appointment</button>
            </div>
            </div>

        </div>
    );
};

export default List;