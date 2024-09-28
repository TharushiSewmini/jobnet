import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const LeftSection = () => {
  return (
    <div className="bg-white px-20 pt-10 lg:w-full w-full">
      {/* Header */}
      <div className="flex items-center gap-1 mt-3">
        <FaBriefcase className="text-2xl sm:text-xl lg:text-lg text-gray-700" />
        <h1 className="text-xl sm:text-xl lg:text-lg font-bold">JobNet</h1>
      </div>

      <div className="text-green-500 lg:mt-2  text-xl lg:text-lg font-bold">
        Part-Time Face Painter At Galle Face Hotel
      </div>
      <div className="text-gray-700 mt-4 lg:mt-2 text-lg lg:text-base">
        <p className='lg:text-lg'><strong>Location:</strong> Galle Face Hotel</p>
        <p className='lg:mt-3 mt-4 lg:text-lg'><strong>Position:</strong> Part-Time Face Painter</p>
      </div>
      <div className="text-gray-700 text-sm lg:text-base">
        <h2 className="font-semibold mt-2 text-lg lg:text-lg">Job Description</h2>
        <p className='lg:text-sm '>
          We are seeking enthusiastic and creative individuals to join our team as part-time face painters at the prestigious Galle Face Hotel...
        </p>
      </div>
      <div className="text-gray-700 text-sm lg:text-base mt-2">
        <h2 className="font-semibold text-lg lg:text-lg">Responsibilities</h2>
        <ul className="list-disc pl-7 lg:text-sm">
          <li>Create a variety of face painting designs for children and guests.</li>
          <li>Ensure a fun and safe environment for all participants.</li>
          <li>Manage time effectively to accommodate all guests within your shift.</li>
        </ul>
      </div>
      <div className="text-gray-700 text-lg lg:text-base mt-2">
        <p className='lg:text-lg'><strong>Salary:</strong> </p>
        <ul className='list-disc pl-7 text-sm lg:text-sm'>
          <li>
            LKR 2300 for 5 hours of work
          </li>
          </ul>
        <p className='mt-2 lg:text-lg text-lg'><strong>Shifts:</strong></p>
        <ul className='list-disc pl-7 text-sm lg:text-sm'>
          <li>
            Morning
          </li>
          </ul>
         
      </div>
      <div className="text-red-900 mt-10 lg:mt-5  text-sm lg:text-lg">
        Once You Applied, You Can Contact Job Provider And Job Provider Will Contact You
      </div>
    </div>
  );
};

export default LeftSection;

