import React from 'react';
import { useLoaderData } from 'react-router';
import Answer from './Answer';

const Questions = () => {
    const ques = useLoaderData()
    return (
        <div className='w-11/12 mx-auto my-12'>
            <div className='text-center mt-4'>
                <h1 className='text-4xl font-extrabold mb-10'>Blogs</h1>
                <p className='text-gray-500'>Let's explore some basic concepts that will make you a good developer</p>
            </div>

            <div className='mt-8'>
                {
                  ques.map(questions=> <Answer key={questions.id} questions={questions}></Answer> 
                  )  
                }
            </div>
            
        </div>
    );
};

export default Questions;