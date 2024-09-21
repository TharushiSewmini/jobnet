// src/Components/Separator/index.tsx
import React from "react";
import { Divider, Button } from "antd";
import SearchBar from "../SearchBar";
import LocationSelector, { City } from "../LocationSelector";

// Custom Divider Style
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

const Separator: React.FC<{ onCityChange: (city: City | null) => void; onKeywordChange: (keyword: string) => void; }> = ({ onCityChange, onKeywordChange }) => {
  return (
    <div className="p-5 flex justify-center">
      <div className="bg-white flex items-center border border-slate-300 rounded-md pr-5 py-2">
        {/* SearchBar */}
        <div className="flex-shrink-0" style={{ maxWidth: '250px' }}>
          <SearchBar borderless={true} placeholder="Job Title, Keyword..." onKeywordChange={onKeywordChange} />
        </div>

        {/* Custom Divider */}
        <Divider type="vertical" style={customDividerStyle} />

        {/* LocationSelector */}
        <div className="flex-shrink-0" style={{ maxWidth: '320px' }}>
          <LocationSelector onCityChange={onCityChange} />
        </div>

        {/* Custom Divider */}
        <Divider type="vertical" style={customDividerStyle} />

        {/* Button */}
        <div className="flex-shrink-0" style={{ maxWidth: '200px' }}>
          <Button
            type="primary"
            style={buttonStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, buttonHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, buttonStyle);
            }}
          >
            Primary Button
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Separator;
