// src/Components/LocationSelector.tsx
import React, { useState } from "react";
import Select from "react-select";
import marker from "../../assets/335079-200.png";


export interface City {
  value: string;
  label: string;
  lat: number;
  lon: number;
}

const cities: City[] = [
  { value: "colombo", label: "Colombo", lat: 6.9271, lon: 79.8612 },
  { value: "kandy", label: "Kandy", lat: 7.2906, lon: 80.6337 },
  { value: "galle", label: "Galle", lat: 6.0535, lon: 80.221 },
  { value: "jaffna", label: "Jaffna", lat: 9.6615, lon: 80.0255 },
  { value: "negombo", label: "Negombo", lat: 7.2083, lon: 79.8357 },
  { value: "anuradhapura", label: "Anuradhapura", lat: 8.3114, lon: 80.4037 },
  { value: "ratnapura", label: "Ratnapura", lat: 6.6828, lon: 80.3992 },
  { value: "trincomalee", label: "Trincomalee", lat: 8.5873, lon: 81.2152 },
];

interface LocationSelectorProps {
  onCityChange: (city: City | null) => void; // Callback to send city to parent component
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onCityChange }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCityChange = (selectedOption: City | null) => {
    setSelectedCity(selectedOption);
    onCityChange(selectedOption); // Pass selected city to parent component
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <Select
        options={cities}
        placeholder={
          <div className="flex items-center">
            <img
              src={marker}
              alt="Placeholder Icon"
              className="w-5 h-5 mr-2"
            />
            Select your city
          </div>
        }
        value={selectedCity}
        onChange={handleCityChange}
        className="w-80"
        isSearchable
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            "&:hover": { border: "none" },
          }),
          dropdownIndicator: (provided) => ({ ...provided, display: "none" }),
          indicatorSeparator: (provided) => ({ ...provided, display: "none" }),
          placeholder: (provided) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
            color: "#999",
          }),
        }}
      />
    </div>
  );
};

export default LocationSelector;



