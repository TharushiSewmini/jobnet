import React, { useEffect, useState } from "react";
import checkCircle from "../../assets/CheckCircle.svg";
import users from "../../assets/Users.svg";
import expireIcon from "../../assets/XCircle.svg";
import editIcon from "../../assets/DotsThreeVertical.svg";
import "./index.css";
import "../../comman.css";
import { Flex, message, Modal, Spin } from "antd";
import { fetchJobsFromAdminId } from "../../controllers/admin/fetchJobsFromAdminId";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

interface JobPost {
  id: string;
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
  applicants: {
    userId: string;
    status: string;
    timeStamp: number;
  }[];
}

interface Applicant {
  userId: string;
  status: string;
  timeStamp: number;
}

const JobList = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [applicants, setApplicants] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await fetchJobsFromAdminId();
        const normalizedJobs = (fetchedJobs || []).map(
          (job: Partial<JobPost>) => ({
            ...job,
            applicants: job.applicants || [], // Ensure applicants is always an array
          })
        );
        setJobs(normalizedJobs as JobPost[]);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const isWithinFiveDays = (targetDateInput: string | Date): boolean => {
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

  const handleDeletePost = async () => {
    if (selectedJobId) {
      try {
        await deleteDoc(doc(db, "jobs", selectedJobId));
        message.success("Post deleted successfully!");
        setJobs(jobs.filter((job) => job.id !== selectedJobId));
        closeModal();
      } catch (error) {
        console.error("Error deleting post:", error);
        message.error("Failed to delete the post.");
      }
    }
  };

  // Fetch applicants for a specific job from Firestore
  // const handleViewApplicants = async (jobId: string) => {
  //   try {
  //     const applicantsRef = collection(db, "jobs", jobId, "applicants");
  //     const querySnapshot = await getDocs(applicantsRef);
  //     const applicantsList = querySnapshot.docs.map((doc) => doc.data());
  //     setApplicants(applicantsList);
  //     setIsApplicantsModalOpen(true);
  //   } catch (error) {
  //     console.error("Error fetching applicants:", error);
  //   }
  // };

  const handleViewApplicants = async (jobId: string) => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      const jobDoc = await getDoc(jobRef);
      console.log("::jobs list" , jobDoc.data());
      
      
      if (jobDoc.exists()) {
        const jobData = jobDoc.data() as JobPost;
        console.log("::jobs data" , jobData.applicants);
        if (jobData.applicants && Array.isArray(jobData.applicants)) {
          setApplicants(jobData.applicants);
          setIsApplicantsModalOpen(true);
        } else {
          setApplicants([]);
          setIsApplicantsModalOpen(true);
        }
      } else {
        console.error("Job document not found");
        setApplicants([]);
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setApplicants([]);
    }
  };
  
  return (
    <div className="jobs-container">
      <div className="table-header">
        <div className="header-column">JOBS</div>
        <div className="header-column">STATUS</div>
        <div className="header-column">APPLICATIONS</div>
        <div className="header-column">APPLICANTS</div>
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
                  src={
                    isWithinFiveDays(job.expireDate) ? checkCircle : expireIcon
                  }
                  className="job-status-icon"
                  alt="status"
                />
                <span
                  className={
                    isWithinFiveDays(job.expireDate) ? "active" : "expired"
                  }
                >
                  {isWithinFiveDays(job.expireDate) ? "Active" : "Expired"}
                </span>
              </div>
              <div className="job-applications">
                <img className="icon" src={users} alt="applications" />
                <span>Salary: {job.salary}</span>
              </div>
              <div className="job-actions">
                <button
                  className="view-post"
                  onClick={() => handleViewPost(job.id)}
                >
                  View Post
                </button>
                <button
                  className="view-applicants"
                  onClick={() => handleViewApplicants(job.id)}
                >
                  View Applicants
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
        title="Applicants List"
        centered
        open={isApplicantsModalOpen}
        onCancel={() => setIsApplicantsModalOpen(false)}
        footer={null}
      >
        {applicants.length > 0 ? (
          <ul>
            {applicants.map((applicant, index) => (
              <li key={index} className="border p-4 rounded-lg">
                <p>User ID: {applicant.userId}</p>
                <p>Status: {applicant.status}</p>
                <p>Applied on: {new Date(applicant.timeStamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applicants found.</p>
        )}
      </Modal>

      {/* Modal for editing/deleting jobs */}
      {/* <Modal
        title="Edit/Delete Job"
        centered
        open={isModalOpen}
        onCancel={closeModal}
        footer={[...]}
      >
        <p className="text-gray-600">
          Do you want to edit or delete this job post?
        </p>
      </Modal> */}
    </div>
  );
};

export default JobList;
