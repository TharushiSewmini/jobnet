import React, { useState } from "react";
import { Card, Typography, Button } from "antd";
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaBriefcase } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

const { Title, Text } = Typography;

const JobPost: React.FC<JobPostProps> = ({
  id,
  userEmail,
  jobTitle,
  Date,
  salary,
  location,
  jobType,
}) => {
  const [hasApplied, setHasApplied] = useState(false); // New state to track job application
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click propagation
    if (hasApplied) return; // Prevent duplicate submissions

    setIsLoading(true); // Show loading state on button
    try {
      await applyForTheJob(id, userEmail);
      setHasApplied(true); // Mark as applied after success
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
    <Card
      className="w-full"
      style={{
       
        transition: "border-color 0.2s",
      }}
    >
      <div className="flex flex-col items-center justify-between w-full gap-5 px-5 md:flex-row poppins">
        {/* Job Details */}
        <div className="flex-grow">
          <Title level={4}>{jobTitle}</Title>
          <div className="flex flex-wrap gap-4 text-gray-600 md:gap-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <Text>{location}</Text>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="mr-2" />
              <Text>{salary}</Text>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="mr-2" />
              <Text>{jobType}</Text>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <Text>{Date}</Text>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            className= "hover:scale-110"
            type="primary"
            style={{ backgroundColor: hasApplied ? "gray" : "black" }}
            loading={isLoading}
            disabled={hasApplied}
            onClick={handleApply}
          >
            {hasApplied ? "Applied" : "Apply Now"}
          </Button>
          <Button className= "hover:scale-110" type="default" onClick={handleView}>View</Button> {/* Added onClick for view button */}
        </div>
      </div>
    </Card>
  );
};

export default JobPost;