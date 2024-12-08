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
    expirationDate: "",
    time: "",
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
        expirationDate: "",
        time: "",
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
            {/* Dropdown Inputs */}
            {[
              { label: "Vacancies", name: "vacancies", options: ["1", "2", "3", "4", "5"] },
              { label: "Expiration Date", name: "expirationDate", type: "date" },
              { label: "Time", name: "time", options: ["Morning", "Afternoon", "Evening"] },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-base text-white">{field.label}</label>
                {field.options ? (
                  <select
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-2 text-sm border p-3 rounded-md w-4/5"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-2 text-sm border p-3 rounded-md w-4/5"
                  />
                )}
              </div>
            ))}
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
