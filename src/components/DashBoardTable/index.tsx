import React, { useEffect, useState } from "react";
import checkCircle from "../../assets/CheckCircle.svg";
import users from "../../assets/Users.svg";
import expireIcon from "../../assets/XCircle.svg";
import editIcon from "../../assets/DotsThreeVertical.svg";
import "./index.css";
import "../../comman.css";
import { Flex, Modal, Spin } from "antd";
import { fetchJobsFromAdminId } from "../../controllers/admin/fetchJobsFromAdminId";
import { useNavigate } from "react-router-dom";

interface JobPost {
  id: string; // Include the document ID for unique identification
  Time: string;
  description: string;
  expireDate: Date;
  jobLocation: string;
  jobTitle: string;
  noOfVacancies: number;
  responsibilities: string[];
  salary: string;
  userEmail: string;
  userId: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await fetchJobsFromAdminId();
        setJobs(fetchedJobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const isWithinFiveDays = (targetDateInput: string|Date): boolean => {
    const today = new Date();
    const targetDate = new Date(targetDateInput);
    const diffInTime = targetDate.getTime() - today.getTime();
    return diffInTime >= 0 && diffInTime <= 5 * 24 * 60 * 60 * 1000;
  };

  const handleViewPost = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  const handleEditModal = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };

  return (
    <div className="jobs-container">
      <div className="table-header">
        <div className="header-column">JOBS</div>
        <div className="header-column">STATUS</div>
        <div className="header-column">APPLICATIONS</div>
        <div className="header-column">ACTIONS</div>
      </div>

      <div className="job-list">
        {isLoading ? (
          <Flex align="center" justify="center" className="loading-container">
            <Spin size="large" />
          </Flex>
        ) : jobs.length === 0 ? (
          <div className="empty-message">You don't have any posted jobs.</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-item">
              <div className="job-details">
                <strong>{job.jobTitle}</strong>
                <span>
                  {job.jobTitle} • {job.noOfVacancies}
                </span>
              </div>
              <div className="job-status">
                <img
                  src={isWithinFiveDays(job.expireDate)? checkCircle : expireIcon}
                  className="job-status-icon"
                  alt="status"
                />
                <span
                  className={isWithinFiveDays(job.expireDate) ?"active" : "expired"}
                >
                  {isWithinFiveDays(job.expireDate) ? "Active" : "Expired"}
                </span>
              </div>
              <div className="job-applications">
                <img className="icon" src={users} alt="applications" />
                <span>Salary: {job.salary}</span>
              </div>
              <div className="job-actions">
                <button className="view-post" onClick={() => handleViewPost(job.id)}>
                  View Post
                </button>
                <img
                  src={editIcon}
                  className="edit-icon"
                  alt="edit"
                  onClick={() => handleEditModal(job.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        title="Edit/Delete Job"
        centered
        visible={isModalOpen}
        okText="Edit Post"
        cancelText="Delete Post"
        onOk={() => navigate(`/edit-job/${selectedJobId}`)}
        onCancel={closeModal}
      />
    </div>
  );
};

export default JobList;
