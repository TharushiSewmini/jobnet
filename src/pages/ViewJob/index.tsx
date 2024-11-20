
import React from "react";
import JobNetTopBar from "../../components/JobNetTopBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faClock,
  faUsers,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

const ViewJob = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-800 flex flex-col items-center justify-start ">
      {/* Top Navigation Bar */}
      <JobNetTopBar />

      {/* Unified Job Card Container */}
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-4xl mt-8">
        {/* Header Section with Background Image */}
        <div
          className="bg-cover bg-center p-8 relative">
          <div className="absolute inset-0 bg-green-500"></div>
          <div className="relative text-white space-y-6">
            {/* Job Title and Status */}
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold mb-5">UI/UX Designer</h2>
           
            {/* Job Details */}
            <div className="space-y-4 text-white">
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBriefcase} className="text-white" />
                <span className="px-6">XYZ Ltd</span>
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-white" />
                <span className="px-6">Full-Time</span>
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} className="text-white" />
                <span className="px-6">798 Applicants</span>
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
                <span className="px-6">Posted: Nov 1, 2024</span>
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-white" />
                <span className="px-6">Expires: Dec 1, 2024</span>
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-white" />
                <span className="px-6">17 days remaining</span>
              </p>
            </div>
            </div>
          </div>
        </div>

        {/* Job Description and Actions Section */}
        <div className="p-8 flex flex-col justify-center items-center space-y-6">
          {/* Job Description */}
          <h3 className="text-3xl font-semibold text-gray-800">Job Description</h3>
          <div className="text-gray-700 leading-relaxed">
            <p>
              We are looking for a skilled UI/UX Designer to join our team. The ideal candidate will be responsible for designing user interfaces and experiences for our products. You should be proficient in design software such as Figma, Adobe XD, and Sketch.
            </p>
            <p className="mt-4">
              Responsibilities include collaborating with the product team to define and implement innovative solutions for the product direction, visuals, and user experience.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              Edit Post
            </button>
            <button className="w-full md:w-auto bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              Delete Post
            </button>
            <button className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              View Applicants
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
