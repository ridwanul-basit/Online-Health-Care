import React, { useEffect, useState } from 'react';

import List from './List';
import { getAppointment, removeAppointment } from '.';
import Chart from '../pages/Chart';
import NoDoctor from './NoDoctor';



const Schedule = () => {
    const [total,setTotal] = useState([])
    useEffect( () => {
        const item = getAppointment()
        setTotal(item)
    },[]

    )
    const handleDelete = id =>{
        removeAppointment(id)
        setTotal(getAppointment())
    }
    return (
        <div>
             <div className='bg-white px-8 rounded-2xl mt-14'>
        {total.length > 0 &&    <Chart total={total} />}
      </div> 
            <div className='py-12'>
                {total.length===0 ? '' : (
                     <div className='py-10 text-center'>
                     <h1 className='text-3xl font-bold mb-4'>My Today Appointments</h1>
                     <p className='text-gray-500'>Our platform connects you with verified, experienced doctors across various specialties — all at your convenience.</p>
                 </div>
                )}

                <div className='mx-3 lg:mx-0' >     
                {total.length === 0 ? (
                    
                        <NoDoctor></NoDoctor>
                    ) : (
       
                        total.map(total => (
                            <List key={total.id} total={total} handleDelete={handleDelete}></List>
                        ))
                    )}

                </div>


            </div>
        </div>
    );
};

export default Schedule;