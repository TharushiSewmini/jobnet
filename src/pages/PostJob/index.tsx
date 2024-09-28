import React, { useState } from 'react'
import { FaBriefcase } from "react-icons/fa6";

 const PostJob: React.FC = () => {
 
  

return (

<div className="w-100% h-100% bg-green-600">


    <div className='w-full h-8 p-8 bg-white shadow-lg'>

    <div className="mb-8">
  <div className="-my-4 text-3xl font-semibold ms-20" >Jobnet</div>
  
    <FaBriefcase className='-my-8 text-2xl text-green-950 ms-12'/>
</div>

    <div className="mb-8">
    <button className="float-right p-2 mr-10 -my-8 text-base font-bold bg-white border-2 border-green-950">Post A Job</button>
        </div>
    </div>

<div className="m-20 mb-10 text-3xl font-medium text-white">Post a Job</div>

    <div className='ml-20 '>
      <label className="block text-base text-white">Job Title </label>
        <input
          type="text"
          className="w-11/12 p-1 mt-2 mb-6 text-sm " 
          placeholder="Add job title, role, vacancies etc" 
        />
    </div>

    <div className="ml-20 ">
      <label className="block text-base text-white">Salary</label>
        <input
            type="text"
            className="w-64 p-1 mt-2 "
          />
    </div>

    <div className="mt-16 mb-6 ml-20 text-lg text-white ">Advance Information</div>

        <div className="grid grid-cols-1 gap-4 ml-20 md:grid-cols-3">
         
            <div>
              <label className="block text-base text-white">Vacancies</label>
              <select
                className="p-1 mt-2 text-sm border w-80">
                <option value="">Select...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div>
              <label className="block text-base text-white" >Expiration Date</label>
              <input
                type="date"
                className="p-1 mt-2 text-sm border w-80"
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-base text-white">Time</label>
              <select
                className="p-1 mt-2 text-sm border w-80">
                <option value="">Select...</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
        </div>


    <div className='mt-16 mb-6 ml-20 text-lg text-white '>Description and Responsibility</div>
        
        <div className='ml-20'>
          <label className="block text-base text-white">Description</label>
          <textarea
            className="w-11/12 p-2 mt-1 text-sm" 
            placeholder="Add your job description..." 
            rows={5}
          />

          <label className="block mt-4 text-base text-white">Responsibilities</label>
          <textarea
            className="w-11/12 p-2 mt-1 text-sm" 
            placeholder="Add your job responsibilities..." 
            rows={5}
          />
        </div>
  

    <button className="p-2 m-20 text-base font-bold text-white bg-amber-950">Post A Job →</button>
   

    </div>




  
)

 }


export default PostJob