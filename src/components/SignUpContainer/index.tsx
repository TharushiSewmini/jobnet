import React, { useEffect, useState } from "react";

import ReusableButton from "../ReusableButton";
import { useNavigate } from "react-router-dom";
import "./index.css";
import SignInTextField from "../SignInTextField";
import { Dropdown } from "antd";
interface SignUpContainerProps {
  onChangeUserFullName: (e: any) => void;
  onChangeUserName: (e: any) => void;
  onChangeEmail: (e: any) => void;
  onChangePassword: (e: any) => void;
  onChangeConfirmPassword: (e: any) => void;
  onSubmit: (e: any) => void;
  userFullName: string;
  userName: string;
  useremail: string;
  password: string;
  confirmassword: string;
  userType: string;
  onSelevtUserType: (e: any) => void;
  options: string[];
}

const SignUpContainer = ({
  onChangeEmail,
  onChangePassword,
  onChangeUserName,
  onChangeUserFullName,
  onChangeConfirmPassword,
  onSubmit,
  confirmassword,
  userFullName,
  userName,
  userType,
  useremail,
  password,
  onSelevtUserType,
  options,
}: SignUpContainerProps) => {
  const navigate = useNavigate();

  return (
    <div className="sign-up-box-white-form">
      <div className="create-cpntainer-whole-row">
        <div className="create-container-left">
          <div className="sign-up-big-word">Create Account</div>

          <div className="sign-up-enter-texts">
            Already have account?
            <span
              className="sign-up-enter-login-text"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </div>
        </div>
        <div className="dropdown-container">
          <select
            value={userType}
            onChange={onSelevtUserType}
            className="dropdown"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sign-up-user-name-conatiner">
        <div className="sign-up-user-name-flow">
          <SignInTextField
            placeHolderValue={"Full Name"}
            value={userFullName}
            onChange={onChangeUserFullName}
          />
        </div>

        <div className="sign-up-user-name-flow">
          <SignInTextField
            placeHolderValue={"Username"}
            value={userName}
            onChange={onChangeUserName}
          />
        </div>
      </div>
      <SignInTextField
        placeHolderValue={"Email address"}
        value={useremail}
        onChange={onChangeEmail}
      />

      <SignInTextField
        placeHolderValue={"Password"}
        value={password}
        onChange={onChangePassword}
      />
      <SignInTextField
        placeHolderValue={"Confirm Password"}
        value={confirmassword}
        onChange={onChangeConfirmPassword}
      />
      <div className="sign-up-sign-up-btn">
        <ReusableButton buttonText={"Create account"} onClick={onSubmit} />
      </div>
    </div>
  );
};

export default SignUpContainer;
