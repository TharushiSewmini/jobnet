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
    <div className="bg-green-700 h-screen">
      <MaterPlusbtn isClick={click} onClick={onClick} />
      <div className="bg-white px-4 py-4 md:px-8 md:py-6 relative">
        {/* JobNetTopBar */}
        <JobNetTopBar />
        
        {/* User Icon - Added Only on This Page */}
        <button
          className="absolute right-4 top-4 sm:right-8 sm:top-8 text-gray-600 hover:text-green-700"
          onClick={handleProfileClick}
        >
          <FaUserCircle size={30} />
        </button>
      </div>
      <div>
        <Seperator onCityChange={handleCityChange} onKeywordChange={handleKeywordChange} />
      </div>
      <div className="px-4 sm:px-8 md:px-16 py-4">
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
