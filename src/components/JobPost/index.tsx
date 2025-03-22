import { Button } from "antd";
import Card from "antd/es/card/Card";
import React, { useState } from "react";
import { FaCalendar, FaDollarSign, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { applyForTheJob } from "../../controllers/user/applyJob";

interface JobPostProps {
  id: string;
  jobTitle: string;
  salary: string;
  Date: string;
  location: string;
  userEmail: string;
  jobType: string;
}

const JobPost = ({
  id,
  userEmail,
  jobTitle,
  Date,
  salary,
  location,
  jobType,
}: JobPostProps) => {
  const [hasApplied, setHasApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasApplied) return;

    setIsLoading(true);
    try {
      // Mock function call - replace with actual implementation
      await applyForTheJob(id, userEmail); 
      setHasApplied(true);
      alert("Application successful!");
    } catch (error) {
      console.error("Failed to apply for the job:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = () => {
    navigate(`/job/${id}`); // Navigate to the job view page using the job ID
  };

  return (
    <Card className="group overflow-hidden border border-gray-200 bg-white p-4 transition-all duration-300 hover:shadow-lg  hover:scale-105">
      <div className="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        {/* Left section with job details */}
        <div className="flex-grow space-y-4">
          {/* Job title and type */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#3CB356] md:text-2xl">
              {jobTitle}
            </h3>
            <span className="inline-flex w-fit rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-black-800">
              {jobType}
            </span>
          </div>

          {/* Job metadata */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-gray-600">
              <FaLocationArrow className="mr-2 h-4 w-4" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaDollarSign className="mr-2 h-4 w-4" />
              <span className="text-sm">{salary}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaCalendar className="mr-2 h-4 w-4" />
              <span className="text-sm">{Date}</span>
            </div>
          </div>
        </div>

        {/* Right section with buttons */}
        <div className="flex flex-col gap-3  sm:gap-4">
          <Button
            className={`transform transition-all duration-200 hover:scale-105 ${
              hasApplied ? "bg-gray-400" : "bg-[#3CB356] hover:bg-blue-700"
            }`}
            disabled={hasApplied || isLoading}
            onClick={handleApply}
          >
            {isLoading ? (
              "Applying..."
            ) : hasApplied ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Applied
              </span>
            ) : (
              "Apply Now"
            )}
          </Button>
          <Button
            className="transform border-gray-300 transition-all duration-200 hover:scale-105 hover:bg-gray-50"
            onClick={handleView}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobPost;
