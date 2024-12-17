import React, { useState } from "react";
import { Card, Typography, Button } from "antd";
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from "react-icons/fa"; // Importing the required icons
import { applyForTheJob } from "../../controllers/user/applyJob";

interface JobPostProps {
  id: string;
  userEmail: string;
  image: string;
  title: string;
  uploadDate: string;
  remainingTime: string;
  salary: string;
  location: string;
}

const { Title, Text } = Typography;

const JobPost: React.FC<JobPostProps> = ({
  id,
  userEmail,
  image,
  title,
  uploadDate,
  remainingTime,
  salary,
  location,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const buttonStyle = {
    backgroundColor: isClicked ? "#e7f0fa" : "black", // Change button background color based on click state
    padding: "20px",
    color: isClicked ? "black" : "white", // Change text color based on click state
    border: "none",
    width: "100%",
    transition: "background-color 0.1s, color 0.1s",
  };

  // Toggle the clicked state when card or button is clicked
  const handleClick = () => {
    setIsClicked(!isClicked);
    applyForTheJob(id, userEmail);
  };

  return (
    <Card
      className="w-full"
      style={{
        border: `2px solid ${isClicked ? "black" : "#f0f0f0"}`, // Change border color based on click state
        transition: "border-color 0.2s", // Smooth transition for border color change
      }}
      onClick={handleClick} // Handle the card click
    >
      {/* Display the job image and details in a responsive layout */}
      <div className="flex flex-col items-center justify-between w-full gap-20 px-10 md:flex-row">
        {/* Image */}
        <div>
          <img
            src={image}
            alt={title}
            className="object-cover w-20 h-20 rounded-md "
          />
        </div>

        {/* Job details */}
        <div className="flex-grow">
          {/* Title and upload date */}
          <div className="flex items-center justify-between mb-3 md:justify-start md:gap-4">
            <Title level={4} className="mb-0">
              {title}
            </Title>
            <Text className="rounded-full bg-[#e7f0fa] text-black px-3 py-1 inline-block">
              {uploadDate}
            </Text>
          </div>

          {/* Location, salary, and remaining time with icons */}
          <div className="flex flex-wrap gap-5 md:gap-10">
            {/* Location */}
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />{" "}
              {/* Location Icon */}
              <Text>{location}</Text>
            </div>

            {/* Salary */}
            <div className="flex items-center">
              <FaDollarSign className="mr-2 text-gray-400" />{" "}
              {/* Dollar Icon */}
              <Text>{salary}</Text>
            </div>

            {/* Remaining Time */}
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-400" />{" "}
              {/* Calendar Icon */}
              <Text>{remainingTime}</Text>
            </div>
          </div>
        </div>

        {/* Button to apply */}
        <div>
          <div className="flex-shrink-0" style={{ maxWidth: "200px" }}>
            <Button
              type="primary"
              style={buttonStyle}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling to the card's onClick
                handleClick();
              }}
            >
              {isClicked ? "Apply Now" : "Apply Now"}{" "}
              {/* You can modify this if needed */}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobPost;
