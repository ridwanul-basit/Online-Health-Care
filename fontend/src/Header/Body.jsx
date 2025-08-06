import React from 'react';

import Doctors from './Doctors';

import { useLoaderData } from 'react-router';
import Details from './Details';
import Count from './Count';
import Display from './Display';



const Body = () => {
    const data= useLoaderData();
    
    return (
        <div >
            <div className='bg-[linear-gradient(180deg,rgba(255,255,255,0),rgb(255,255,255)_100%)] py-16 border-b border-l border-r border-solid border-white border-t-0 rounded-xl'>
            <Display></Display>
            <Doctors ></Doctors>
            </div>
            <Details data={data}></Details>
            <Count ></Count>
            
        </div>
    );
};

export default Body;