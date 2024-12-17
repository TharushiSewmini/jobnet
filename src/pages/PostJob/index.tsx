import React, { useState } from "react";
import jobPost from "../../assets/jobpost.jpg";
import MaterPlusbtn from "../../components/MasterPlusButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { db } from "../../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const PostJob: React.FC = () => {
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

  const onClick = () => setClick(!click);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePostJob = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("Please log in to post a job.");
      return;
    }

    const { jobTitle, salary, description } = formData;

    if (!jobTitle || !salary || !description) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const jobData = {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        postedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "jobs"), jobData);
      alert("Job posted successfully!");
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
    } catch (error) {
      console.error("Error posting job: ", error);
      alert("Failed to post the job. Try again!");
    }
  };

  return (
    <div className="bg-[#098023] w-full h-screen flex">
      <div className="w-full lg:w-3/5 overflow-y-auto">
        <div className="pt-4 h-full sm:mx-20 mx-4">
          <div className="text-3xl font-medium text-white pb-2">Post a Job</div>
          
          {/* Form Inputs */}
          {[
            { label: "Job Title", name: "jobTitle", type: "text", placeholder: "Add job title..." },
            { label: "Salary", name: "salary", type: "text", placeholder: "Add salary per day" },
            { label: "Location", name: "location", type: "text", placeholder: "Enter job location" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-base text-white">{field.label}</label>
              <input
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                type={field.type}
                placeholder={field.placeholder}
                className="w-4/5 mt-2 mb-6 text-sm p-3 rounded-md"
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
                className="mt-2 text-sm border p-3 rounded-md w-4/5"
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
                className="mt-2 text-sm border p-3 rounded-md w-4/5"
              />
            </div>

            <div>
              <label className="block text-base text-white">Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-2 text-sm border p-3 rounded-md w-4/5"
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
                className="mt-2 text-sm border p-3 rounded-md w-4/5"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="mt-16 mb-6 text-lg text-white">Description and Responsibility</div>
          <div>
            {["description", "responsibilities"].map((field) => (
              <div key={field}>
                <label className="block text-base text-white capitalize">{field}</label>
                <textarea
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-11/12 mt-1 text-sm p-3 rounded-md"
                  placeholder={`Add your job ${field}...`}
                  rows={5}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handlePostJob}
            className="text-base font-bold text-white bg-amber-950 p-3 rounded-md my-4"
          >
            Post A Job →
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-2/5 h-full invisible hidden lg:visible lg:block relative overflow-y-hidden">
        <MaterPlusbtn isClick={click} onClick={onClick} />
        <LazyLoadImage
          src={jobPost}
          effect="blur"
          className="w-full h-full object-cover"
          alt="Job Post"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
      </div>
    </div>
  );
};

export default PostJob;
