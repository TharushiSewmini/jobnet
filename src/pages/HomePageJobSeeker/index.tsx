import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Seperator from "../../components/Seperator";
import JobPostsPage from "../../components/JobPostPage";
import fetchJobs from "../../controllers/user/fetchJobs";
import { Spin } from "antd";
import MaterPlusbtn from "../../components/MasterPlusButton";

interface Job {
  id: string;
  jobTitle: string;
  salary: string;
  noOfVacancies: number;
  expireDate: string;
  Time: string;
  description: string;
  responsibilities: string;
  jobLocation: string;
  userEmail: string;
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
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, []);

  const handleCityChange = (city: { value: string } | null) => {
    setSelectedCity(city ? city.value : null);
  };

  const handleKeywordChange = (text: string) => {
    setKeyword(text);
  };

  const onClick = () => setClick(!click);

  return (
    <div className="bg-[#cdf4e1] h-screen">
      <MaterPlusbtn isClick={click} onClick={onClick} />
      <div className="px-2 py-5 bg-white">
        <div className="max-w-md mx-auto overflow-hidden rounded-lg md:max-w-xl">
          <div className="md:flex">
            <SearchBar onKeywordChange={handleKeywordChange} />
          </div>
        </div>
      </div>
      <div>
        <Seperator onCityChange={handleCityChange} onKeywordChange={handleKeywordChange} />
      </div>
      <div className="px-20">
        {loading ? (
          <Spin />
        ) : (
          <JobPostsPage jobs={jobs} keyword={keyword} selectedCity={selectedCity} />
        )}
      </div>
    </div>
  );
};

export default HomePageJobSeeker;
