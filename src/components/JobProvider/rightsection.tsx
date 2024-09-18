import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const RightSection: React.FC = () => {
  return (
    <div className="bg-green-700 w-full lg:w-1/3 h-screen flex flex-col justify-between items-center text-white text-lg md:text-xl lg:text-2xl p-5 md:p-7 relative">
      {/* Contact Info */}
      <div className="pt-8 md:pt-12 lg:pt-28 w-full text-center lg:text-left">
        <p>
          <strong>Posted By:</strong> Dhanuka Ranasinghe
        </p>
        <h3 className="mt-8 md:mt-12 lg:mt-16 font-bold text-lg md:text-xl lg:text-2xl">Contact Details</h3>

        <div className="flex flex-col h-full items-center lg:items-start mt-6 md:mt-32 sm:mt-32 text-xl md:text-2xl lg:text-3xl lg:pl-32">
          <div className="flex items-center mb-6 md:mb-8">
            <FaPhoneAlt className="mr-3 md:mr-4 text-3xl md:text-4xl lg:text-5xl" />
            <p>071 456 5667</p>
          </div>
          <div className="flex items-center">
            <FaWhatsapp className="mr-3 md:mr-4 text-3xl md:text-4xl lg:text-5xl" />
            <p>071 456 5667</p>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <button className="bg-white text-green-700 hover:text-black transition duration-300 p-4 md:p-5 md:px-20 lg:px-28 rounded-md">
          Apply →
        </button>
      </div>
    </div>
  );
};

export default RightSection;
