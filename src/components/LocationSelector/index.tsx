import React, { useState } from "react";

interface LocationSelectorProps {
  onCityChange: (city: string | null) => void; // Changed from City to string
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onCityChange }) => {
  const [inputCity, setInputCity] = useState<string>("");

  const handleCityChange = (selectedCity: string) => {
    setInputCity(selectedCity);
    onCityChange(selectedCity); // Send dynamic input as city
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <input
        type="text"
        placeholder="Enter city or location"
        value={inputCity}
        onChange={(e) => handleCityChange(e.target.value)}
        className="w-80 p-2 border rounded"
      />
    </div>
  );
};

export default LocationSelector;
