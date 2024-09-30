import React, { useState } from "react";
import plus from "../../assets/plus.png";
import logoutImage from "../../assets/user-logout.png";
import home from "../../assets/interface.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

interface MasterProps {
  isClick: boolean;
  onClick: (e: any) => void;
}

const MaterPlusbtn = ({ isClick, onClick }: MasterProps) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  return (
    <div className="master-plus">
      <button className="plus-button" onClick={onClick}>
        <img src={plus} alt="plus-icon" />
      </button>

      {isClick && (
        <div className="additional-buttons">
          <button className="additional-button-1" onClick={() => logout()}>
            {" "}
            <img src={logoutImage} alt="plus-icon" className="p-2.5" />
          </button>
          <button
            className="additional-button-2 "
            onClick={() => navigate("/JobProviderDashboard")}
          >
            {" "}
            <img src={home} alt="plus-icon" className="p-2.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MaterPlusbtn;
