import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa6";
import jobPost from "../../assets/jobpost.jpg";
import { Flex, Spin } from "antd";
import MaterPlusbtn from "../../components/MasterPlusButton";

const PostJob: React.FC = () => {
  const [click, setClick] = useState(false);
  const onClick=()=>{
setClick(!click);
  }
  return(

    <div className=" bg-[#098023] w-full h-screen flex ">
     
      <div className=" w-full lg:w-3/5 overflow-y-auto ">
        <div className="pt-4 h-full sm:mx-20 mx-4">
          <div className="  text-3xl font-medium text-white pb-2">
            Post a Job
          </div>

          <div className=" ">
            <label className="block text-base text-white">Job Title </label>
            <input
              type="text"
              className=" w-4/5  mt-2 mb-6 text-sm p-3 rounded-md"
              placeholder="Add job title, role, vacancies etc"
            />
          </div>

          <div className=" ">
            <label className="block text-base text-white">Salary</label>
            <input
              type="text"
              className="w-4/5  mt-2 p-3 rounded-md"
              placeholder="Add Salary per day"
            />
          </div>

          <div className="mt-16 mb-6  text-lg text-white ">
            Advance Information
          </div>

          <div className="grid grid-cols-1 gap-4  md:grid-cols-3">
            <div>
              <label className="block text-base text-white">Vacancies</label>
              <select className=" mt-2 text-sm border p-3 rounded-md w-4/5 ">
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
                className=" mt-2 text-sm border w-4/5 p-3 rounded-md"
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-base text-white">Time</label>
              <select className="mt-2 text-sm border w-4/5 p-3 rounded-md">
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
              className="w-11/12  mt-1 text-sm p-3 rounded-md"
              placeholder="Add your job description..."
              rows={5}
            />

            <label className="block mt-4 text-base text-white">
              Responsibilities
            </label>
            <textarea
              className="w-11/12  mt-1 text-sm p-3 rounded-md"
              placeholder="Add your job responsibilities..."
              rows={5}
            />
          </div>

          <button className=" text-base font-bold text-white bg-amber-950 p-3 rounded-md my-4">
            Post A Job →
          </button>
        </div>
      </div>

      <div className="w-2/5 h-full invisible hidden lg:visible lg:block relative ">
      <  MaterPlusbtn isClick={click} onClick={onClick}/>
        <img src={jobPost} className="w-full h-full object-cover " />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
      </div>
    </div>
  );
};

export default PostJob;
