import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const RightSection = () => {
  return (
    <div className="bg-green-600 w-full pl-20  lg:w-full  h-full   text-white">
      <div className=" mt-12 lg:mt-24 ">
        <p className="font-bold text-lg  sm:text-xl sm:mt-8 lg:text-xl ">Posted By : Dhanuka Ranasinghe</p>
        <p className="font-semibold mt-7 text-lg lg:text-xl">Contact Details</p>
      </div>
      <div className="flex flex-col  items-center lg:items-start mt-6 sm:mt-12 lg:mt-20  lg:px-40 text-base sm:text-xl lg:text-xl">
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2 sm:mr-3 lg:mr-4 text-2xl sm:text-3xl lg:text-4xl" />
            <p className="text-lg sm:text-xl lg:text-2xl">071 456 5667</p>
          </div>

          <div className="flex items-center">
            <FaWhatsapp className="mr-2 sm:mr-3 lg:mr-4 text-2xl sm:text-3xl lg:mt-4 lg:text-4xl" />
            <p className="text-lg sm:text-xl lg:mt-4 lg:text-2xl">071 456 5667</p>
          </div>
        </div>
      

      <button className=" mb-5  mt-4 sm:mt-48 sm:mb-44  sm:ml-24 bg-white text-green-600 px-5 py-3 pr-14 pl-14 font-semibold text-sm lg:text-xl">
        Apply →
      </button>
    </div>
  );
};

export default RightSection;

