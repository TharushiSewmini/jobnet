import React, { useState } from "react";
import checkCircle from "../../assets/CheckCircle.svg";
import users from "../../assets/Users.svg";
import expireIcon from "../../assets/XCircle.svg";
import editIcon from "../../assets/DotsThreeVertical.svg";
import "./index.css";
import "../../comman.css";
import { Modal } from "antd";

const jobs = [
  {
    title: "UI/UX Designer",
    type: "Full Time",
    remaining: "27 days remaining",
    status: "Active",
    applications: "798 Applications",
  },
  {
    title: "Senior UX Designer",
    type: "Internship",
    remaining: "8 days remaining",
    status: "Active",
    applications: "185 Applications",
  },
  {
    title: "Technical Support Specialist",
    type: "Part Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: "556 Applications",
  },
  {
    title: "Junior Graphic Designer",
    type: "Full Time",
    remaining: "24 days remaining",
    status: "Active",
    applications: "583 Applications",
  },
  {
    title: "Front End Developer",
    type: "Full Time",
    remaining: "Dec 7, 2019",
    status: "Expire",
    applications: "740 Applications",
  },
  {
    title: "Technical Support Specialist",
    type: "Part Time",
    remaining: "4 days remaining",
    status: "Active",
    applications: "556 Applications",
  },
  {
    title: "Junior Graphic Designer",
    type: "Full Time",
    remaining: "24 days remaining",
    status: "Active",
    applications: "583 Applications",
  },
  {
    title: "Front End Developer",
    type: "Full Time",
    remaining: "Dec 7, 2019",
    status: "Expire",
    applications: "740 Applications",
  },
];

const JobList = () => {
  // Create an array of false values initially, corresponding to each job
  const [clicked, setClicked] = useState(Array(jobs.length).fill(false));

  // Function to handle button click
  const handleButtonClick = (index: number) => {
    // Create a new array, changing only the value of the clicked index
    const newClicked = [...clicked];
    newClicked[index] = true; // Update clicked state for this button
    setClicked(newClicked);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="jobs-container">
      <Modal
        styles={{}}
        style={{}}
        centered
        closable
        okText="EDIT POST"
        cancelText="DELETE POST"
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      ></Modal>
      {/* Header Row */}
      <div className="table-header">
        <div className="header-column">JOBS</div>
        <div className="header-column">STATUS</div>
        <div className="header-column">APPLICATIONS</div>
        <div className="header-column">ACTIONS</div>
      </div>
      <div className="job-list">
        {jobs.map((job, index) => (
          <div key={index} className="job-item">
            <div className="job-details">
              <strong>{job.title}</strong>
              <span>
                {job.type} • {job.remaining}
              </span>
            </div>
            <div className="job-status">
              <img
                src={job.status === "Active" ? checkCircle : expireIcon}
                className="job-status-icon"
              />

              <span
                className={
                  job.status === "Active" ? "active-status" : "expire-status"
                }
              >
                {job.status}
              </span>
            </div>
            <div className="job-applications">
              <img className="icon" src={users} />
              <span>{job.applications}</span>
            </div>
            <div className="job-actions">
              <button
                className={clicked[index] ? "view-post-notclick" : "view-post"}
                onClick={() => handleButtonClick(index)}
              >
                View Post
              </button>
              <img
                className="view-post-edit-icon"
                src={editIcon}
                onClick={showModal}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
