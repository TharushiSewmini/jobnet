import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { Spin } from "antd";
import MaterPlusbtn from "../../components/MasterPlusButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import jobPost from "../../assets/jobpost.jpg";
import JobNetTopBar from "../../components/JobNetTopBar";

const db = getFirestore();

interface JobPost {
  jobTitle: string;
  jobLocation: string;
  description: string;
  noOfVacancies: number;
  salary: string;
  expireDate: string;
}

const ViewJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPost | null>(null);
  const [updatedJob, setUpdatedJob] = useState<Partial<JobPost>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [click, setClick] = useState(false);

  const onClick = () => setClick(!click);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!jobId) return;
    try {
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, updatedJob);
      alert("Job updated successfully!");
      setIsEditing(false);
      navigate("/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-green-700">
      <JobNetTopBar />
      <div className="flex justify-center">
        
      <div className=" rounded-lg shadow-lg w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mt-14 p-8 mr-10 ml-10 mb-32 overflow-y-auto">
        <h2 className="text-3xl font-bold mt-10 mb-10 text-center text-white">
          {isEditing ? "Edit Job Details" : "Job Details"}
        </h2>

        {job ? (
          isEditing ? (
            <div className="space-y-5">
              {/* Job Title */}
              <div>
                <label className="block text- font-semibold mb-1">Job Title *</label>
                <input
                  name="jobTitle"
                  value={updatedJob.jobTitle || ""}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  />
              </div>

              {/* Job Location */}
              <div>
                <label className="block text- font-semibold mb-1">Location *</label>
                <input
                  name="jobLocation"
                  value={updatedJob.jobLocation || ""}
                  onChange={handleInputChange}
                  placeholder="Enter job location"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  />
              </div>

              {/* Number of Vacancies */}
              <div>
                <label className="block text- font-semibold mb-1">No. of Vacancies *</label>
                <input
                  name="noOfVacancies"
                  type="number"
                  min="1"
                  value={updatedJob.noOfVacancies || ""}
                  onChange={handleInputChange}
                  placeholder="Enter number of vacancies"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  />
              </div>

              {/* Salary */}
              <div>
                <label className="block text- font-semibold mb-1">Salary *</label>
                <input
                  name="salary"
                  value={updatedJob.salary || ""}
                  onChange={handleInputChange}
                  placeholder="Enter salary details (e.g., $5000/month)"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  />
              </div>

              {/* Expire Date */}
              <div>
                <label className="block text- font-semibold mb-1">Expire Date *</label>
                <input
                  name="expireDate"
                  type="date"
                  value={updatedJob.expireDate || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  />
              </div>

              {/* Description */}
              <div>
                <label className="block text- font-semibold mb-1">Description *</label>
                <textarea
                  name="description"
                  value={updatedJob.description || ""}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter job description"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  ></textarea>
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-black">Job Title</h3>
                <p className="text-white border-b pb-2">{job.jobTitle}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Location</h3>
                <p className="text-white border-b pb-2">{job.jobLocation}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Number of Vacancies</h3>
                <p className="text-white border-b pb-2">{job.noOfVacancies}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Salary</h3>
                <p className="text-white border-b pb-2">{job.salary}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Expire Date</h3>
                <p className="text-white border-b pb-2">{job.expireDate}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Description</h3>
                <p className="text-white border-b pb-2">{job.description}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                  Edit Job
                </button>
              </div>
            </div>
          )
        ) : (
          <p className="text-center text-gray-500"><Spin /></p>
        )}
      </div>

      <div className="w-full lg:w-1/3 xl:w-1/2 h-full hidden lg:block relative overflow-y-hidden">
        {/* Image Section */}
        <MaterPlusbtn isClick={click} onClick={onClick} />
        <LazyLoadImage
          src={jobPost}
          effect="blur"
          className="w-full h-full object-cover rounded-lg shadow-lg "
          alt="Job Post"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
      </div>
    </div>
    </div>
  );
};

export default ViewJobPage;
