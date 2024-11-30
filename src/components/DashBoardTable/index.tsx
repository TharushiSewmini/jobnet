import React, { useEffect, useState } from "react";
import checkCircle from "../../assets/CheckCircle.svg";
import users from "../../assets/Users.svg";
import expireIcon from "../../assets/XCircle.svg";
import editIcon from "../../assets/DotsThreeVertical.svg";
import "./index.css";
import "../../comman.css";
import { Flex, Modal, Spin } from "antd";
import { fetchJobsFromAdminId } from "../../controllers/admin/fetchJobsFromAdminId";


interface JobPost {
  Time: string;
  description: string;
  expireDate: Date;
  jobLocation: string;
  jobTitle: string;
  noOfVacancies: 5;
  responsibilities: string[];
  salary: string;
  userEmail: string;
  userId: string;
}

const JobList = () => {
  const [jobs, setJobPosts] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false);
  

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await fetchJobsFromAdminId();
      if (jobs) {
        setJobPosts(jobs);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const isWithinFiveDays = (targetDateInput: Date | string): boolean => {
    const today = new Date();
    const targetDate = new Date(targetDateInput); // Ensure targetDate is a Date object

    // Set both dates to midnight to only compare dates, not times
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    // Calculate the difference in time (in milliseconds) between today and the target date
    const timeDifference = targetDate.getTime() - today.getTime();

    // Convert time difference to days
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Check if the difference is 5 days or less and return true or false
    return dayDifference <= 5 && dayDifference >= 0;
  };

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
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      {/* Header Row */}
      <div className="table-header">
        <div className="header-column">JOBS</div>
        <div className="header-column">STATUS</div>
        <div className="header-column">APPLICATIONS</div>
        <div className="header-column">ACTIONS</div>
      </div>
      <div className="job-list">
        {isLoading ? (
          <Flex
            align="center"
            gap="middle"
            className="w-screen h-screen flex justify-center items-center bg-transparent"
          >
            <Spin size="large" />
          </Flex>
        ) : jobs.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center lg:-scroll-mt-52 mt-32 lg:text-xl text-gray-500 text-sm">
            You Don't have posted any Job{" "}
          </div>
        ) : (
          jobs.map((job, index) => (
            <div key={job.userId} className="job-item">
              <div className="job-details">
                <strong>{job.jobTitle}</strong>
                <span>
                  {job.jobTitle} • {job.noOfVacancies}
                </span>
              </div>
              <div className="job-status">
                <img
                  src={
                    isWithinFiveDays(job.expireDate) ? checkCircle : expireIcon
                  }
                  className="job-status-icon"
                />

                <span
                  className={
                    isWithinFiveDays(job.expireDate)
                      ? "active-status"
                      : "expire-status"
                  }
                >
                  {isWithinFiveDays(job.expireDate) ? "Active" : "Expired"}
                </span>
              </div>
              <div className="job-applications">
                <img className="icon" src={users} />
                <span>{job.salary}</span>
              </div>
              <div className="job-actions">
                <button
                  className={
                    clicked[index] ? "view-post-notclick" : "view-post"
                  }
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
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
