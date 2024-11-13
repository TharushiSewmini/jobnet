import React, { useState } from 'react';

import jobPost from "../../assets/jobpost.jpg";


const EditJobPost: React.FC = () => {
    const [click, setClick] = useState(false);
    const onClick=()=>{
  setClick(!click);
    }
  return (
    <div className='flex w-full h-screen bg-slate-200 '>
<div className="w-full overflow-y-auto lg:w-3/5">
        <div className="h-full pt-4 mx-4 sm:mx-20">
          <div className="pb-2 text-3xl font-medium text-teal-700">
            Edit Job Post
          </div>

          <div className="">
            <label className="block text-base text-teal-700">Job Title </label>
            <input
              type="text"
              className="w-4/5 p-3 mt-2 mb-6 text-sm rounded-md "
              placeholder="Add job title, role, vacancies etc"
            />
          </div>

          <div className="">
            <label className="block text-base text-teal-700">Salary</label>
            <input
              type="text"
              className="w-4/5 p-3 mt-2 rounded-md"
              placeholder="Add Salary per day"
            />
          </div>

          <div className="mt-16 mb-6 text-lg text-teal-700 ">
            Advance Information
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-base text-teal-700">Vacancies</label>
              <select className="w-4/5 p-3 mt-2 text-sm border rounded-md ">
                <option value="" className="">
                  Select No of Vacancies
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div>
              <label className="block text-base text-teal-700">
                Expiration Date
              </label>
              <input
                type="date"
                className="w-4/5 p-3 mt-2 text-sm border rounded-md "
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-base text-teal-700">Time</label>
              <select className="w-4/5 p-3 mt-2 text-sm border rounded-md">
                <option value="">Select Noon</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div className="mt-16 mb-6 text-lg text-teal-700 ">
            Description and Responsibility
          </div>

          <div className="">
            <label className="block text-base text-teal-700">Description</label>
            <textarea
              className="w-11/12 p-3 mt-1 text-sm rounded-md"
              placeholder="Add your job description..."
              rows={5}
            />

            <label className="block mt-4 text-base text-teal-700">
              Responsibilities
            </label>
            <textarea
              className="w-11/12 p-3 mt-1 text-sm rounded-md"
              placeholder="Add your job responsibilities..."
              rows={5}
            />
          </div>

          <div className="flex space-x-4">
        <button type="submit" className="w-32 p-3 my-4 text-white bg-green-600 rounded-md hover:bg-green-700">
         Save
        </button>
        <button type="button" className="w-32 p-3 my-4 text-white bg-red-600 rounded-md hover:bg-red-700">
          Cancel
        </button>
      </div>

        </div>
      </div>

      <div className="relative invisible hidden w-2/5 h-full lg:visible lg:block ">
        <img src={jobPost} className="object-cover w-full h-full " />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
      </div>
    </div>
  );
};

export default EditJobPost;
