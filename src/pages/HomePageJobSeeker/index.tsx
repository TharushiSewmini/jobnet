import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Seperator from "../../components/Seperator";
import JobPostsPage from "../../components/JobPostPage";
import fetchJobs from "../../controllers/user/fetchJobs";
import { Timestamp } from "firebase/firestore";
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
  const [click, setClick] = useState(false);
  const onClick = () => {
    setClick(!click);
  };
  return (
    <div className="bg-[#cdf4e1] h-screen">
      <MaterPlusbtn isClick={click} onClick={onClick} />
      <div className="bg-white px-2 py-5">
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <SearchBar onKeywordChange={handleKeywordChange} />
          </div>
        </div>
      </div>
      <div>
      <Seperator onCityChange={handleCityChange} onKeywordChange={handleKeywordChange} />
      </div>
      <div>
        <p className="text-gray-500 text-right px-20">Select Time and Date</p>
      </div>
      <div className="px-20">
      {loading ? (
          <p>Loading...</p>
        ) : (
          <JobPostsPage jobs={jobs} keyword={""} selectedCity={null} />
        )}
      
      </div>
    </div>
  );
};

export default HomePageJobSeeker;


