/*import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const RightSection: React.FC = () => {
  return (
    <div className="bg-green-700 h-full lg:h-full overflow-hidden lg:w-1/3 items-center text-white text-lg md:text-xl lg:text-xl p-5 md:p-7 lg:p-7  lg:pt-10 ">
      {/* Contact Info 
      <div className="pt-4 md:pt-12 lg:pt-2  text-center lg:text-left">
        <p className="text-sm sm:text-base lg:text-2xl">
          <strong>Posted By :</strong> Dhanuka Ranasinghe
        </p>

        <h3 className="mt-8 md:mt-12 lg:mt-16 font-bold text-lg sm:text-xl lg:text-2xl">Contact Details</h3>

        <div className="flex flex-col  items-center lg:items-start mt-6 sm:mt-12 lg:mt-10 lg:mr-10 lg:px-14 text-base sm:text-xl lg:text-2xl">
          <div className="flex items-center mb-6">
            <FaPhoneAlt className="mr-2 sm:mr-3 lg:mr-4 text-2xl sm:text-3xl lg:text-4xl" />
            <p className="text-lg sm:text-xl lg:text-2xl">071 456 5667</p>
          </div>

          <div className="flex items-center">
            <FaWhatsapp className="mr-2 sm:mr-3 lg:mr-4 text-2xl sm:text-3xl lg:text-4xl" />
            <p className="text-lg sm:text-xl lg:text-2xl">071 456 5667</p>
          </div>
        </div>
      </div>

      {/* Apply Button 
      <div className='absolute bottom-10 w-full  justify-center'>
       <button className="bg-white text-green-700 hover:text-black transition duration-300 p-4 md:p-5 md:px-20 lg:px-28 rounded-md">
          Apply →
        </button>
        </div>
    

    </div>
  );
};

export default RightSection; */
// RightSection.tsx
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
      

      <button className=" mb-5 mt-4 sm:mt-48 sm:mb-44  sm:ml-24 bg-white text-green-600 px-5 py-3 pr-14 pl-14 font-semibold text-sm lg:text-xl">
        Apply →
      </button>
    </div>
  );
};

export default RightSection;

