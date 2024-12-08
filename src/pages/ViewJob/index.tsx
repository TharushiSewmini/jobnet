import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobNetTopBar from "../../components/JobNetTopBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import MaterPlusbtn from "../../components/MasterPlusButton";

const ViewJob = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const onClick = () => setClick(!click);

  // Dummy job data
  const job = {
    jobTitle: "Frontend Developer",
    description: "Develop and maintain web applications using React.js.",
    Time: "Full-Time",
    expireDate: new Date().toISOString(),
    responsibilities: [
      "Build reusable code and libraries.",
      "Optimize applications for maximum speed and scalability.",
      "Collaborate with team members to define project requirements.",
    ],
    jobLocation: "Colombo, Sri Lanka",
    salary: "Rs. 150,000 - 200,000",
    noOfVacancies: 3,
    userEmail: "recruiter@example.com",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-800 flex flex-col items-center justify-start">
      <JobNetTopBar />
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-4xl mt-8">
        {/* Job Header Section */}
        <div className="bg-cover bg-center p-8 relative">
          <div className="relative text-black space-y-6">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold mb-5">{job.jobTitle}</h2>
              <div className="space-y-4 text-black">
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBriefcase} className="text-black" />
                  <span className="px-6">{job.description}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-black" />
                  <span className="px-6">{job.Time}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-black"
                  />
                  <span className="px-6">
                    Expires: {new Date(job.expireDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="p-8 flex flex-col justify-center items-center space-y-6">
          <h3 className="text-3xl font-semibold text-gray-800">
            Job Description
          </h3>
          <div className="text-gray-700 leading-relaxed">
            <p><strong>Responsibilities:</strong></p>
            <ul className="list-disc list-inside">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
            <p className="mt-4"><strong>Location:</strong> {job.jobLocation}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Number of Vacancies:</strong> {job.noOfVacancies}</p>
            <p><strong>Posted By:</strong> {job.userEmail}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              Edit Post
            </button>
            <button
              className="w-full md:w-auto bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              Delete Post
            </button>
            <button
              className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              View Applicants
            </button>
          </div>

          <MaterPlusbtn isClick={click} onClick={onClick} />
          
        </div>
      </div>
    </div>
  );
};

export default ViewJob;

