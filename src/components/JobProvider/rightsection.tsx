import React from 'react'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'

const RightSection: React.FC = () => {
  return (
    <div className=  'bg-green-700 w-full  lg:w-1/3   lg:mt-0 lg:mb-0  p-7 items-center pl-20  text-white text-2xl '>
      <p className='pt-28'> <strong>Posted By: </strong>Dhanuka Ranasinghe</p>
      <h3 className='mt-12 font-bold'>Contact Details</h3>

      <div className='pl-48 mt-11 text-3xl'>
      <p className='flex    '><FaPhoneAlt className='mr-4 text-5xl' /><p className='pl-10'>0714565667</p></p>
      <p className='flex mt-12'><FaWhatsapp className='mr-4 text-5xl' /><p className='pl-10'>0714565667</p></p>
      </div>

      <button className='bg-white text-green-500 mt-96 p-5 px-28 pr-28 hover:text-black transition duration-300  '>Apply →</button>
    </div>
  )
}

export default RightSection
