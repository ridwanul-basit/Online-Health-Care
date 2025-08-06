import React from 'react';
import { LuCalendarClock } from "react-icons/lu";

const Answer = ({questions}) => {
    const {question,answer,added_date} = questions

    return (
        <div>
            <div className='bg-white px-6 mb-6 py-6 rounded-2xl'>
            <div className='text-2xl font-bold mb-4 border-b border-dashed border-gray-300 pb-5'>
                {question}
            </div>
            <div className='mb-4 border-b border-dashed border-gray-300 pb-5'>
                <p className='text-blue-600'>Answer:</p>
                <p className='text-gray-500 font-medium'>{answer}</p>
            </div>
            <div className='flex gap-3 text-center place-items-center text-gray-500'>
            <LuCalendarClock />
                <p className=''> Added At {added_date}</p>
            </div>
        </div>
        </div>
    );
};

export default Answer;