
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { Spin } from "antd";
import MaterPlusbtn from "../../components/MasterPlusButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import jobPost from "../../assets/jobpost.jpg";
import JobNetTopBar from "../../components/JobNetTopBar";

const db = getFirestore();

interface JobPost {
  jobTitle: string;
  location: string;
  description: string;
  vacancies: number;
  salary: string;
  Date: string;
  time:string;
  responsibilities: string;
  jobType:string;
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

  const handleDelete = async () => {
    if (!jobId) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
    if (!confirmDelete) return;

    try {
      const jobRef = doc(db, "jobs", jobId);
      await deleteDoc(jobRef);
      alert("Job deleted successfully!");
      navigate("/jobs"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-700">
      <JobNetTopBar />
      <div className="flex justify-center">
        
      <div className=" rounded-lg shadow-lg w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mt-14 p-8 mr-10 ml-10 mb-32 overflow-y-auto">
        <h2 className="mt-10 mb-10 text-3xl font-bold text-center text-white">
          {isEditing ? "Edit Job Details" : "Job Details"}
        </h2>

        {job ? (
          isEditing ? (
            <div className="space-y-5">
              {/* Job Title */}
              <div>
                <label className="block mb-1 font-semibold text-">Job Title *</label>
                <input
                  name="jobTitle"
                  value={updatedJob.jobTitle || ""}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
              </div>

              {/* Job Location */}
              <div>
                <label className="block mb-1 font-semibold text-">Location *</label>
                <input
                  name="location"
                  value={updatedJob.location || ""}
                  onChange={handleInputChange}
                  placeholder="Enter job location"
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
              </div>

              {/* Number of Vacancies */}
              <div>
                <label className="block mb-1 font-semibold text-">No. of Vacancies *</label>
                <input
                  name="vacancies"
                  type="number"
                  min="1"
                  value={updatedJob.vacancies || ""}
                  onChange={handleInputChange}
                  placeholder="Enter number of vacancies"
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
              </div>

              {/* Salary */}
              <div>
                <label className="block mb-1 font-semibold text-">Salary *</label>
                <input
                  name="salary"
                  value={updatedJob.salary || ""}
                  onChange={handleInputChange}
                  placeholder="Enter salary details (e.g., $5000/month)"
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
              </div>

              {/*Date */}
              <div>
                <label className="block mb-1 font-semibold text-">Date *</label>
                <input
                  name="Date"
                  type="date"
                  value={updatedJob.Date || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-">Job Type *</label>
                <input
                  name="jobType"
                  type=""
                  value={updatedJob.jobType || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-semibold text-">Description *</label>
                <textarea
                  name="description"
                  value={updatedJob.description || ""}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter job description"
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
              </div>
               {/* Responsibilites */}
               <div>
                <label className="block mb-1 font-semibold text-">Responsibilites *</label>
                <textarea
                  name="responsibilities"
                  value={updatedJob.responsibilities || ""}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Responsibilites"
                  className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
              </div>

              {/* Save and Cancel Buttons */}
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
              <div>
                <h3 className="text-lg font-semibold text-black">Job Title</h3>
                <p className="pb-2 text-white border-b">{job.jobTitle}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Location</h3>
                <p className="pb-2 text-white border-b">{job.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Number of Vacancies</h3>
                <p className="pb-2 text-white border-b">{job.vacancies}</p>
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
                <h3 className="text-lg font-semibold text-black">Description</h3>
                <p className="pb-2 text-white border-b">{job.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Responsibilites</h3>
                <p className="pb-2 text-white border-b">{job.responsibilities}</p>
              </div>
              <div className="flex justify-end">
                <button
  onClick={() => setIsEditing(true)}
  className="px-4 py-2 text-white transition duration-300 transform bg-blue-500 rounded-md hover:scale-110"
  type="button"
>
  Edit Post
</button>
<button
  onClick={handleDelete}
  className="px-4 py-2 ml-2 text-white transition duration-300 transform bg-red-500 rounded-md hover:scale-110"
  type="button"
>
  Delete Post
</button>
              </div>
            </div>
          )
        ) : (
          <p className="text-center text-gray-500"><Spin /></p>
        )}
      </div>

      <div className="relative hidden w-full h-full overflow-y-hidden lg:w-1/3 xl:w-1/2 lg:block">
        {/* Image Section */}
        <MaterPlusbtn isClick={click} onClick={onClick} />
        <LazyLoadImage
          src={jobPost}
          effect="blur"
          className="object-cover w-full h-full rounded-lg shadow-lg "
          alt="Job Post"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
      </div>
    </div>
    </div>
  );
};

export default ViewJobPage;
