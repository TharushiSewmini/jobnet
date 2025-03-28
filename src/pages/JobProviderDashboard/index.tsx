import React, { useState } from "react";
import "./index.css";
import JobNetSymbol from "../../components/JobNetSymbol";
import signOut from "../../assets/signout.svg";
import OpenBoxContainer from "../../components/OpenBoxContainer";
import JobList from "../../components/DashBoardTable";
import { Button, Modal } from "antd";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";
import MaterPlusbtn from "../../components/MasterPlusButton";

const JobProviderDashboard = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const NavigationToJobPost = () => {
    navigate("/postjob");
  };

  const userName = auth.currentUser?.displayName;
  const [click, setClick] = useState(false);
  const onClick = () => setClick(!click);

  return (
    <div className="job-provider-dashboard">
      <div className="job-provider-dshboard-top-row">
        <JobNetSymbol onClick={function (e: any): void {}} />
        <button
          className="job-provider-dshboard-top-row-button"
          onClick={NavigationToJobPost}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Post a Job
        </button>
      </div>
      <div className="job-provider-dshboard-bottom-container">
        <div className="job-provider-dshboard-bottom-container-left">
          <div className="job-provider-dshboard-bottom-container-left-edit-details">
            <JobNetSymbol
              imageIcon={signOut}
              textColor="#767F8C"
              tileText="Edit details"
              onClick={() => navigate("/userprofile")}
            />
            <JobNetSymbol
              imageIcon={signOut}
              textColor="#767F8C"
              tileText="Logout"
              onClick={function (e: any): void {
                logout();
              }}
            />
          </div>
        </div>
        <div className="job-provider-dshboard-bottom-container-middle ">
          <div className="flex lg:flex-row flex-col w-full lg:justify-between ">
            <div>
              <h2 className="job-provider-dshboard-bottom-container-middle-helllo">
                Hello , {userName}
              </h2>
              <h5 className="job-provider-dshboard-bottom-container-middle-helllo-under">
                Here is your daily activities and applications
              </h5>
            </div>{" "}
            <OpenBoxContainer />
          </div>

          <div className="job-provider-dshboard-bottom-container-middle-recent-row">
            <span className="job-provider-dshboard-bottom-container-middle-recent-left">
              Recently post jobs
            </span>
            {/*<span className="job-provider-dshboard-bottom-container-middle-recent-right">
              View All
            </span> */}
          </div>
          <JobList />
          <MaterPlusbtn isClick={click} onClick={onClick} />
        </div>
        <div className="job-provider-dshboard-bottom-container-right"></div>
      </div>
    </div>
  );
};

export default JobProviderDashboard;
