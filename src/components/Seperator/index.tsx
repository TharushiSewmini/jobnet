import React from "react";
import { Divider, Button } from "antd";
import SearchBar from "../SearchBar";
import LocationSelector, { City } from "../LocationSelector";

const customDividerStyle = {
  backgroundColor: '#d1d5db',
  height: '30px',
  width: '1px',
};

const buttonStyle = {
  backgroundColor: 'black',
  padding: "15px",
  color: 'white',
  border: 'none',
  width: '100%',
  transition: 'background-color 0.3s, color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor: '#098023',
  color: 'white',
};

const Separator: React.FC<{
  onCityChange: (city: City | null) => void;
  onKeywordChange: (keyword: string) => void;
}> = ({ onCityChange, onKeywordChange }) => {
  return (
    <div className="p-5 flex justify-center">
      <div className="bg-white flex items-center border border-slate-300 rounded-md pr-5 py-2">
        <div className="flex-shrink-0" style={{ maxWidth: '250px' }}>
          <SearchBar borderless={true} placeholder="Job Title, Keyword..." onKeywordChange={onKeywordChange} />
        </div>
        <Divider type="vertical" style={customDividerStyle} />
        <div className="flex-shrink-0" style={{ maxWidth: '320px' }}>
          <LocationSelector onCityChange={onCityChange} />
        </div>
      </div>
    </div>
  );
};

export default Separator;
