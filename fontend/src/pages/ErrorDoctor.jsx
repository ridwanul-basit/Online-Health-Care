import React from 'react';
import { Link, useLocation, useRouteError, useParams } from 'react-router-dom';


const ErrorDoctor = () => {
    const error =useRouteError()
    const location = useLocation();
    const { id } = useParams();
    return (
        <div>
            <div className='py-18 text-center bg-white rounded-2xl mb-8'>

                <h1 className='text-4xl font-bold pb-8'>No Doctor Found!!</h1>
                <p className='pb-5 text-gray-500'>No Doctor Found With this registration No-</p>
                <p className='pb-8  text-gray-500'>{id}</p>
                <Link to={`/`} > <button className="btn rounded-3xl bg-[rgb(23,106,229)] text-white px-4 md:px-7 lg:px-10" >View All Doctors</button></Link>

            </div>
        </div>
    );
};

export default ErrorDoctor;