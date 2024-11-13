import React, { useEffect, useState } from "react";
import letter from "../../assets/lettergreen.svg";
import "./index.css";
import { adminPostedJobsYet } from "../../controllers/admin/fetchJobsFromAdminId";
const OpenBoxContainer = () => {
  const [jobsCount, setJobsCount] = useState(0);

  useEffect(() => {
    const fetchingJobsCount = async () => {
      const jobsCount = await adminPostedJobsYet();
      setJobsCount(jobsCount);
    };
    fetchingJobsCount();
  }, [jobsCount]);
  return (
    <div className="open-box-container">
      <div className="open-box-container-left">
        <h2 className="open-box-container-no">{jobsCount}</h2>
        <h2 className="open-box-container-tetx"> Jobs you have posted</h2>
      </div>
      <div className="open-box-container-right">
        <img src={letter} />
      </div>
    </div>
  );
};

export default OpenBoxContainer;
