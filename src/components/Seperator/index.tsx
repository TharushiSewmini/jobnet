import React from "react";
import { Divider } from "antd";
import SearchBar from "../SearchBar";
import LocationSelector from "../LocationSelector";  // No need to import City anymore

const customDividerStyle = {
  backgroundColor: '#d1d5db',
  height: '30px',
  width: '1px',
};

const Separator: React.FC<{
  onCityChange: (city: string | null) => void;  // Expecting string now
  onKeywordChange: (keyword: string) => void;
}> = ({ onCityChange, onKeywordChange }) => {
  return (
    <div className="p-4 sm:p-5  flex justify-center lg:overflow-auto overflow-hidden">
      <div className="bg-white flex lg:flex-row flex-col items-center border border-slate-300 rounded-md px-3 py-2 sm:px-4 md:px-5">
        <div className="flex-shrink-0 w-full sm:w-64 md:w-80 lg:w-96">
          <SearchBar
            borderless={true}
            placeholder="Job Title, Keyword..."
            onKeywordChange={onKeywordChange}
          />
        </div>
        <Divider type="vertical" className="lg:visible hidden" style={customDividerStyle} />
        <div className="flex-shrink-0 w-full sm:w-72 md:w-80 lg:w-96">
          <LocationSelector onCityChange={onCityChange} />  {/* Passing the string */}
        </div>
      </div>
    </div>
  );
};

export default Separator;
