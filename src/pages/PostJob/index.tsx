import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { FaBriefcase } from "react-icons/fa6";

=======
>>>>>>> 01e232947e6bdaa38d6d135979e6448704bd40ac
import jobPost from "../../assets/jobpost.jpg";
import MaterPlusbtn from "../../components/MasterPlusButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PostJob: React.FC = () => {
  const [click, setClick] = useState(false);
  const onClick = () => {
    setClick(!click);
  };
  return (
    <div className=" bg-[#098023] w-full h-screen flex ">
<<<<<<< HEAD
     
      <div className="w-full overflow-y-auto lg:w-3/5">
        <div className="h-full pt-4 mx-4 sm:mx-20">
          <div className="pb-2 text-3xl font-medium text-white ">
=======
      <div className=" w-full lg:w-3/5 overflow-y-auto ">
        <div className="pt-4 h-full sm:mx-20 mx-4">
          <div className="  text-3xl font-medium text-white pb-2">
>>>>>>> 01e232947e6bdaa38d6d135979e6448704bd40ac
            Post a Job
          </div>

          <div className="">
            <label className="block text-base text-white">Job Title </label>
            <input
              type="text"
              className="w-4/5 p-3 mt-2 mb-6 text-sm rounded-md "
              placeholder="Add job title, role, vacancies etc"
            />
          </div>

          <div className="">
            <label className="block text-base text-white">Salary</label>
            <input
              type="text"
              className="w-4/5 p-3 mt-2 rounded-md"
              placeholder="Add Salary per day"
            />
          </div>

          <div className="mt-16 mb-6 text-lg text-white ">
            Advance Information
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-base text-white">Vacancies</label>
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
              <label className="block text-base text-white">
                Expiration Date
              </label>
              <input
                type="date"
                className="w-4/5 p-3 mt-2 text-sm border rounded-md "
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-base text-white">Time</label>
              <select className="w-4/5 p-3 mt-2 text-sm border rounded-md">
                <option value="">Select Noon</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div className="mt-16 mb-6 text-lg text-white ">
            Description and Responsibility
          </div>

          <div className="">
            <label className="block text-base text-white">Description</label>
            <textarea
              className="w-11/12 p-3 mt-1 text-sm rounded-md"
              placeholder="Add your job description..."
              rows={5}
            />

            <label className="block mt-4 text-base text-white">
              Responsibilities
            </label>
            <textarea
              className="w-11/12 p-3 mt-1 text-sm rounded-md"
              placeholder="Add your job responsibilities..."
              rows={5}
            />
          </div>

          <button className="p-3 my-4 text-base font-bold text-white rounded-md bg-amber-950">
            Post A Job →
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="relative invisible hidden w-2/5 h-full lg:visible lg:block ">
      <  MaterPlusbtn isClick={click} onClick={onClick}/>
        <img src={jobPost} className="object-cover w-full h-full " />
=======
      <div className="w-2/5 h-full invisible hidden lg:visible lg:block relative overflow-y-hidden ">
        <MaterPlusbtn isClick={click} onClick={onClick} />
        <LazyLoadImage

          src={jobPost}
          effect="blur"
          className="w-full h-full object-cover"
          alt="Job Post"
        />
>>>>>>> 01e232947e6bdaa38d6d135979e6448704bd40ac
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
      </div>
    </div>
  );
};

export default PostJob;
