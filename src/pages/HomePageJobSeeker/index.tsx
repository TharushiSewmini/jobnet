import React, { useState, useEffect } from "react";
import Seperator from "../../components/Seperator";
import JobPostsPage from "../../components/JobPostPage";
import fetchJobs from "../../controllers/user/fetchJobs";
import { Spin } from "antd";
import MaterPlusbtn from "../../components/MasterPlusButton";
import JobNetTopBar from "../../components/JobNetTopBar";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  jobTitle: string;
  salary: string;
  Date: string;
  location: string;
  userEmail: string;
  jobType: string;
}

const HomePageJobSeeker: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);

  // Fetch jobs from Firestore
  useEffect(() => {
    const getJobs = async () => {
      try {
        const data: Job[] = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, []);

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/userProfile"); // Navigate to user profile page
  };

  const handleCityChange = (city: string | null) => {
    setSelectedCity(city);
  };

  const handleKeywordChange = (text: string) => {
    setKeyword(text);
  };

  const onClick = () => setClick(!click);

  // Filter jobs based on the selected city and keyword
  const filteredJobs = jobs.filter((job) => {
    const matchesCity = selectedCity ? job.location && job.location.toLowerCase().includes(selectedCity.toLowerCase()) : true;
    const matchesKeyword = job.jobTitle && job.jobTitle.toLowerCase().includes(keyword.toLowerCase());
    return matchesCity && matchesKeyword;
  });

  return (
    <div className="min-h-screen bg-[#3CB356] ">
      
      <div className="fixed right-0 bottom-4">
      <MaterPlusbtn isClick={click} onClick={onClick} />
    </div>

      {/* Top bar section with reduced height and adjusted user icon */}
      <div className="relative px-4 py-2 bg-white md:px-8 md:py-2 ">
        {/* JobNetTopBar */}
        <JobNetTopBar />

        {/* User Icon */}
        <button
          className="absolute text-gray-600 right-20 top-2 sm:top-4 hover:text-green-700"
          onClick={handleProfileClick}
        >
          <FaUserCircle size={30} />
        </button>
      </div>

      {/* Search and filter section */}
      <div className="w-full ">
        <Seperator onCityChange={handleCityChange} onKeywordChange={handleKeywordChange} />
      </div>

      {/* Job posts section */}
      <div className="px-4 py-4 sm:px-8 md:px-16">
        {loading ? (
          <Spin />
        ) : (
          <JobPostsPage jobs={filteredJobs} keyword={keyword} selectedCity={selectedCity} />
        )}
      </div>
    </div>
  );
};

export default HomePageJobSeeker;
