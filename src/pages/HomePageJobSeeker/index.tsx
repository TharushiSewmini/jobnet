// src/pages/HomePage.tsx
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import Seperator from "../../components/Seperator";
import JobPostsPage from "../../components/JobPostPage";
import { City } from "../../components/LocationSelector";
import MaterPlusbtn from "../../components/MasterPlusButton";

const HomePageJobSeeker = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const handleCityChange = (city: City | null) => {
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
        <Seperator
          onCityChange={handleCityChange}
          onKeywordChange={handleKeywordChange}
        />
      </div>
      <div>
        <p className="text-gray-500 text-right px-20">Select Time and Date</p>
      </div>
      <div className="px-20">
        <JobPostsPage selectedCity={selectedCity} keyword={keyword} />
      </div>
    </div>
  );
};

export default HomePageJobSeeker;
