import React from "react";
import letterBlue from "../../assets/icon_blue.svg";
const JobNetTopBar = () => {
  return (
    <div className="w-full bg-white h-10  flex justify-center items-center lg:pl-72 lg:justify-start pl-0">
    <div className="w-10 font-semibold text-sm flex justify-items-center items-center z-10">
      <img src={letterBlue} className="w-8 h-8 object-cover mr-2" />
      <span>Jobnet</span>
    </div>
  </div>
  );
};

export default JobNetTopBar;
