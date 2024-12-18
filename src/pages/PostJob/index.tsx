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
  const [buttonState, setButtonState] = useState<"Post A Job" | "Posting..." | "Posted">("Post A Job");

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
      // Change button text to 'Posting...'
      setButtonState("Posting...");

      const jobData = {
        ...formData,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        postedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "jobs"), jobData);

      // Change button text to 'Posted'
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

      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job: ", error);
      alert("Failed to post the job. Try again!");

      // Revert button state to 'Post A Job'
      setButtonState("Post A Job");
    }
  };

  return (
    <div className="bg-[#098023] w-full h-screen flex">
      <div className="w-full overflow-y-auto lg:w-3/5">
        <div className="h-full pt-4 mx-4 sm:mx-20">
          <div className="pb-2 text-3xl font-medium text-white">Post a Job</div>

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
                className="w-4/5 p-3 mt-2 mb-6 text-sm rounded-md"
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
                className="w-4/5 p-3 mt-2 text-sm border rounded-md"
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
                className="w-4/5 p-3 mt-2 text-sm border rounded-md"
              />
            </div>

            <div>
              <label className="block text-base text-white">Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-4/5 p-3 mt-2 text-sm border rounded-md"
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
                className="w-4/5 p-3 mt-2 text-sm border rounded-md"
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
                  className="w-11/12 p-3 mt-1 text-sm rounded-md"
                  placeholder={`Add your job ${field}...`}
                  rows={5}
                />
              </div>
            ))}
          </div>

          {/* Button with dynamic text */}
          <button
  onClick={handlePostJob}
  className={`text-white m-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center transition duration-300 transform hover:scale-105`}
  type="button"
  disabled={buttonState === "Posting..."}
>
  {buttonState === "Posting..." ? (
    <>
      <svg
        aria-hidden="true"
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        ></path>
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        ></path>
      </svg>
      posting...
    </>
  ) : (
    buttonState
  )}
</button>

        </div>
      </div>

      {/* Image Section */}
      <div className="relative invisible hidden w-2/5 h-full overflow-y-hidden lg:visible lg:block">
        <MaterPlusbtn isClick={click} onClick={onClick} />
        <LazyLoadImage
          src={jobPost}
          effect="blur"
          className="object-cover w-full h-full"
          alt="Job Post"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
      </div>
    </div>
  );
};

export default PostJob;
