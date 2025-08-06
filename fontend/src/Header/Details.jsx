
import { useEffect, useState } from 'react';
import DetailsBox from './DetailsBox';


const Details = ({data}) => {
    const [showData,setShowData]=useState([])
    const [showAll,setShowAll]=useState(false)
    useEffect(()=> {
        if (showAll){
            setShowData(data)
        } else {
            setShowData(data.slice(0,6))
        }
    },[data,showAll])
    
    return (
        <div className=''>
             <div className=' text-center mt-18 '>
                 <h1 className='text-3xl font-bold'>Our Best Doctors</h1>
            <p className=' text-gray-600 py-5'>Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a <br /> routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>
            </div>
           <div className='py-12 w-11/12 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                showData.map(data=>
                    (<DetailsBox key={data.id} data={data}></DetailsBox>)
                )
            }
           
            </div>
            <div className='text-center'>
            <button onClick={()=>{
                setShowAll(pre => !pre)
                if (showAll) window.scrollTo(0,600)
            }} className="btn rounded-3xl bg-[rgb(23,106,229)] text-white px-4 md:px-7 lg:px-10" >{showAll ?"View Less Doctors" : "View All Doctors"}</button>
            </div>
           </div>
            
        </div>
    );
};

export default Details;