import React, { useState } from "react";
import jobPost from "../../assets/jobpost.jpg";
import MaterPlusbtn from "../../components/MasterPlusButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { db } from "../../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const PostJob = () => {  
  const [formData, setFormData] = useState({
    jobTitle: "",
    salary: "",
    vacancies: "",
    Date: "",
    time: "",
    location: "",
    jobType: "",
    description: "",
    responsibilities: "",
  });

  const [click, setClick] = useState(false);
  const [buttonState, setButtonState] = useState<"Post A Job" | "Posting..." | "Posted">("Post A Job");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const onClick = () => setClick(!click);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePostJob = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setMessage("Please log in to post a job.");
      setMessageType("error");
      return;
    }

    const { jobTitle, salary, description } = formData;

    if (!jobTitle || !salary || !description) {
      setMessage("Please fill all required fields!");
      setMessageType("error");
      return;
    }

    try {
      // Change button text to 'Posting...'
      setButtonState("Posting...");

      const jobData = {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        postedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "jobs"), jobData);

      setButtonState("Posted");

      // Clear the form
      setFormData({
        jobTitle: "",
        salary: "",
        vacancies: "",
        Date: "",
        time: "",
        location: "",
        jobType: "",
        description: "",
        responsibilities: "",
      });

      setMessage("Job posted successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error posting job: ", error);
      setMessage("Failed to post the job. Try again!");
      setMessageType("error");

      // Revert button state to 'Post A Job'
      setButtonState("Post A Job");
    }
  };

  return (
    <div className="bg-[#3CB356] w-full h-screen flex">
      {/* Left Side - Form Section */}
      <div className="flex flex-col w-full h-screen px-4 overflow-y-auto lg:w-3/5 sm:px-20">
        <div className="pt-4">
          <div className="pb-2 text-3xl font-medium text-white">Post a Job</div>

          {/* Form Inputs */}
          {[{ label: "Job Title", name: "jobTitle", type: "text", placeholder: "Add job title..." },
            { label: "Salary", name: "salary", type: "text", placeholder: "Add salary per day" },
            { label: "Location", name: "location", type: "text", placeholder: "Enter job location" }].map((field) => (
            <div key={field.name}>
              <label className="block text-base text-white">{field.label}</label>
              <input
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full p-3 mt-2 mb-6 text-sm text-gray-900 bg-white rounded-md"
              />
            </div>
          ))}

          <div className="mt-16 mb-6 text-lg text-white">Advance Information</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Number Input for Vacancies */}
            <div>
              <label className="block text-base text-white">Vacancies</label>
              <input
                name="vacancies"
                type="number"
                min="1"
                value={formData.vacancies}
                onChange={handleChange}
                placeholder="Number of vacancies"
                className="w-full p-3 mt-2 text-sm text-gray-900 bg-white border rounded-md"
              />
            </div>

            {/* Dropdown Inputs */}
            <div>
              <label className="block text-base text-white">Date</label>
              <input
                name="Date"
                type="date"
                value={formData.Date}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-sm text-gray-900 bg-white border rounded-md"
              />
            </div>

            <div>
              <label className="block text-base text-white">Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-sm text-gray-900 bg-white border rounded-md"
              >
                <option value="">Select Time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            <div>
              <label className="block text-base text-white">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-sm text-gray-900 bg-white border rounded-md"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Description and Responsibility */}
          <div className="mt-16 mb-6 text-lg text-white">Description and Responsibility</div>
          <div>
            {["description", "responsibilities"].map((field) => (
              <div key={field}>
                <label className="block text-base text-white capitalize">{field}</label>
                <textarea
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 text-sm text-gray-900 bg-white rounded-md"
                  placeholder={`Add your job ${field}...`}
                  rows={5}
                />
              </div>
            ))}
          </div>

          {/* Button with dynamic text */}
          <div className="flex items-center mt-6 mb-4">
            <button
              onClick={handlePostJob}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center transition duration-300 transform hover:scale-105"
              type="button"
              disabled={buttonState === "Posting..."}
            >
              {buttonState}
            </button>

            {message && (
              <div className={`ml-4 text-center p-2 mt-6 mb-4 ${messageType === "success" ? "bg-green-300" : "bg-red-500"} text-white rounded-md font-normal text-sm`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden h-screen lg:block lg:w-2/5">
        <LazyLoadImage src={jobPost} alt="Job Post" effect="blur" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default PostJob;
