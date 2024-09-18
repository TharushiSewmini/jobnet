import React from 'react'
import {FaBriefcase} from "react-icons/fa";
import "../../index.css"

const LeftSection: React.FC = ()=> {
  return (
    <div className='bg-white w-full  lg:w-2/3 pl-6 pr-6 p-8 overflow-hidden lg:pl-16 lg:pr-10'>
      {/*icon and title*/}
      <div className='flex items-center p-4 overflow-y-hidden'>
      <FaBriefcase className="text-3xl sm:text-2xl  text-gray-700 mr-2" />
      <h1 className='text-xl sm:text-xl lg:text-3xl px-2 font-bold'>JobNet</h1>
      </div>

      {/*Job Details*/}
      <header className='text-green-500 mt-5 '>
        <h1 className='text-xl sm:text-2xl lg:text-3xl  font-bold'>Part-Time Face Painter At Galle Face Hotel</h1>
      </header>

      {/*sections*/}

      <section className='mt-10 '>
        <div className='flex items-center'>
        <h3 className='font-bold text-xl sm:text-2xl lg:text-3xl mr-2'>Location :</h3>
        <p className='text-lg sm:text-xl lg:text-2xl'>Galle Face Hotel</p>
        </div>

      <div className='flex items-center mt-5'>
        <h3 className='font-bold text-xl sm:text-2xl lg:text-3xl mr-2'>Position :</h3>
        <p className='text-lg sm:text-xl lg:text-2xl'>Part-Time Face Painter</p>
        </div>
      </section>

      <section className='mt-5'> 
        <h3 className=' text-xl sm:text-2xl lg:text-3xl  font-bold'>Job Description :</h3>
        <p className='text-base sm:text:lg lg:text-xl mt-2'>We Are Seeking Enthusiastic And Creative Individuals To Join Our Team
          As Part-Time Face Painters At The Prestigious Galle Face Hotel.This Role is Perfect For Those Who Love Working With Children And Have A Passion For Art.
          As A Face Painter, You Will Bring Joy And Excitement To Our Guests By Creating Beautiful And Imaginative Face Paintings.</p>
       </section>

       <section>
        <div className=' mt-5 '>
        <h3 className=' text-xl sm:text-2xl lg:text-3xl font-bold'> Responsibilites :</h3>
        <ul className='list-disc px-10  text-base sm:text-lg lg:text-xl'>
            <li>Create a variety of face painting design for children and guest</li>
            <li>Ensure a fun and safe environment for all participants.</li>
            <li>Manage time effectively to accommodate all guests within your shift.</li>
            <li>Maintain cleanliness and organization of your face painting station</li>
            <li>Engage with guests to enhance their overall experience at the hotel.</li>
        </ul>
      </div>
      </section>

      <section className='mt-5'>
        <h3 className=' text-xl sm:text-2xl lg:text-3xl font-bold '>Salary :</h3>
        <ul className='list-disc px-10 text-base sm:text-lg lg:text-xl'>
          <li>LKR 2300 For 5 Hours Of Work.</li>
        </ul>
      </section>

      <section className='mt-5'>
        <h3 className=' text-xl sm:text-2xl lg:text-3xl font-bold'>Shift:</h3>
        <ul className='list-disc px-10 text-base sm:text-lg lg:text-xl'>
          <li>Morning</li>
        </ul>
      </section>

      <footer className='mt-14 text-red-800  text-xl sm:text-2xl lg:text-3xl '>
        <p>Once You Applied, You Can Contact Job Provider And Job Provider Will
        Contact You</p>
      </footer>
    </div>
  )
}

export default LeftSection
