import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { Spin } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import jobPost from "../../assets/jobpost.jpg";
import JobNetTopBar from "../../components/JobNetTopBar";
import { useAuthContext } from "../../contexts/AuthContext"; // User Authentication Context
import MaterPlusbtn from "../../components/MasterPlusButton";

const db = getFirestore();

interface JobPost {
  jobTitle: string;
  location: string;
  description: string;
  vacancies: number;
  salary: string;
  Date: string;
  time: string;
  responsibilities: string;
  jobType: string;
}

const ViewJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedJob, setUpdatedJob] = useState<Partial<JobPost>>({});
    const [click, setClick] = useState(false);
  const { authenticated, userType } = useAuthContext(); // User Authentication Context

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authenticated) {
      navigate("/login"); // Redirect to login page
    }
  }, [authenticated, navigate]);

  // Fetch Job Data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRef = doc(db, "jobs", jobId as string);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          setJob(jobSnap.data() as JobPost);
          setUpdatedJob(jobSnap.data() as Partial<JobPost>);
        } else {
          console.error("No such job found!");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [jobId]);

  // Handle Input Change during Edit
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedJob((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save after Editing
  const handleSave = async () => {
    if (!jobId) return;
    try {
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, updatedJob);
      alert("Job updated successfully!");
      setIsEditing(false);
      setJob(updatedJob as JobPost); // Update UI
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Handle Delete Job
  const handleDelete = async () => {
    if (!jobId) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
    if (!confirmDelete) return;

    try {
      const jobRef = doc(db, "jobs", jobId);
      await deleteDoc(jobRef);
      alert("Job deleted successfully!");
      navigate("/jobs"); // Redirect to Job List
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const onClick = () => setClick(!click);

  return (
    <div className="items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-700">
       <div className="relative px-4 py-2 bg-white md:px-8 md:py-2"></div>
      <JobNetTopBar />
      <div className="flex justify-center">
        <div className="rounded-lg shadow-lg w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mt-14 p-8 mr-10 ml-10 mb-20 overflow-y-auto">
          <h2 className="mt-10 mb-10 text-3xl font-bold text-center text-white">
            {isEditing ? "Edit Job Details" : "Job Details"}
          </h2>

          {job ? (
            isEditing ? (
              <div className="space-y-5">
                {/* Editable Fields */}
                <div>
                  <label className="block mb-1 font-semibold">Job Title *</label>
                  <input
                    name="jobTitle"
                    value={updatedJob.jobTitle || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Location *</label>
                  <input
                    name="location"
                    value={updatedJob.location || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Salary *</label>
                  <input
                    name="salary"
                    value={updatedJob.salary || ""}
                    onChange={handleInputChange}
                    placeholder="Enter salary details (e.g., RS:5000/month)"
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Date *</label>
                  <input
                    name="Date"
                    type="date"
                    value={updatedJob.Date || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Job Type *</label>
                  <input
                    name="jobType"
                    value={updatedJob.jobType || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Vacancies *</label>
                  <input
                    name="vacancies"
                    value={updatedJob.vacancies || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Description *</label>
                  <textarea
                    name="description"
                    value={updatedJob.description || ""}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter job description"
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Responsibilities *</label>
                  <textarea
                    name="responsibilities"
                    value={updatedJob.responsibilities || ""}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Responsibilities"
                    className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Job Details */}
                <div>
                  <h3 className="text-lg font-semibold text-black">Job Title</h3>
                  <p className="pb-2 text-white border-b">{job.jobTitle}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Location</h3>
                  <p className="pb-2 text-white border-b">{job.location}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Salary</h3>
                  <p className="pb-2 text-white border-b">{job.salary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Date</h3>
                  <p className="pb-2 text-white border-b">{job.Date}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Job Type</h3>
                  <p className="pb-2 text-white border-b">{job.jobType}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Vacancies</h3>
                  <p className="pb-2 text-white border-b">{job.vacancies}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Description</h3>
                  <p className="pb-2 text-white border-b">{job.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Responsibilities</h3>
                  <p className="pb-2 text-white border-b">{job.responsibilities}</p>
                </div>

                {/* Buttons */}

                {userType?.toLowerCase() === "admin" && (
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 text-white bg-blue-500 rounded-md hover:scale-110"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2 text-white bg-red-500 rounded-md hover:scale-110"
                  >
                    Delete
                  </button>
                </div>
                )}
              </div>
            )
          ) : (
            <div className="flex justify-center">
              <Spin />
            </div>
          )}
        </div>

        {/* Job Image Section */}
        <div className="relative hidden w-full lg:w-1/3 xl:w-1/2 lg:block">
  <div className="absolute left-0 w-full px-4 bottom-24">
    <LazyLoadImage
      src={jobPost}
      effect="blur"
      className="object-cover w-full h-auto rounded-lg shadow-lg"
      alt="Job Post"
    />
  </div>
</div>

         <div className="fixed right-0 bottom-4">
      <MaterPlusbtn isClick={click} onClick={onClick} />
    </div>
        </div>
      </div>
  );
};

export default ViewJobPage;
