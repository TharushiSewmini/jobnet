import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  borderless?: boolean;
  placeholder?: string;
  width?: string; // Allow parent to pass custom width
  onKeywordChange: (keyword: string) => void; // Add this line
}

const SearchBar: React.FC<SearchBarProps> = ({ borderless, placeholder, width, onKeywordChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(event.target.value); // Call the prop function
  };

  return (
    <div
      className={`relative ${borderless ? "" : "border border-slate-300 hover:border-slate-400"} rounded-md`}
      style={{ width: width || '100%' }} // Set the width dynamically
    >
      <CiSearch className="absolute text-[#3CB356] top-2 left-4 h-5 w-5" />
      <input
        placeholder={placeholder || "Job Title, Keyword, Company"}
        type="text"
        className={`bg-white h-10 w-full px-10 pl-14 rounded-lg focus:outline-none hover:cursor-pointer ${borderless ? "" : "border-none"}`}
        onChange={handleChange} // Add onChange handler
      />
    </div>
  );
};

export default SearchBar;
