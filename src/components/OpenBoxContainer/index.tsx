import React from "react";
import letter from "../../assets/lettergreen.svg";
import "./index.css"
const OpenBoxContainer = () => {
  return (
    <div className="open-box-container">
      <div className="open-box-container-left">
        <h2 className="open-box-container-no">589</h2>
        <h2 className="open-box-container-tetx">Open Jobs</h2>
      </div>
      <div className="open-box-container-right">
        <img src={letter} />
      </div>
    </div>
  );
};

export default OpenBoxContainer;
