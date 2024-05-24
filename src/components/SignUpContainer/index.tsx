import React, { useEffect, useState } from "react";
import SignInTextField from "../SignInTextField";
import ReusableButton from "../ReusableButton";
import { useNavigate } from "react-router-dom";
import "./index.css";
interface SignUpContainerProps {
  onChange: (e: any) => void;
}
const SignUpContainer = ({ onChange }: SignUpContainerProps) => {
 

  return (
    <div className="sign-in-box-white-form">
      <div className="signin-welcome-full-container">
        <div className="sign-in-form-welcome">
          Welcome to <span className="sign-in-welcome-lorem">JobNet</span>
        </div>
        <div className="sign-in-no-account">
          <span className="sign-in-no-account-first">Have an Account ? </span>
          <span
            className="sign-in-no-account-second"
            onClick={onChange}
          >
            Sign in
          </span>
        </div>
      </div>

      <div className="sign-in-big-word">Sign Up</div>

      <div className="sign-in-enter-texts">
        Enter your username or email address
      </div>
      <SignInTextField
        placeHolderValue={"Username or email address"}
        value={""}
        onChange={() => {}}
      />

      <div className="sign-up-user-name-conatiner">
        <div className="sign-up-user-name-flow">
          <div className="sign-in-enter-texts">Enter your Password</div>

          <SignInTextField
            placeHolderValue={"Password"}
            value={""}
            onChange={() => {}}
          />
        </div>

        <div className="sign-up-user-name-flow">
          <div className="sign-in-enter-texts">Enter your Password</div>

          <SignInTextField
            placeHolderValue={"Password"}
            value={""}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="sign-in-enter-texts">
        Enter your username or email address
      </div>
      <SignInTextField
        placeHolderValue={"Username or email address"}
        value={""}
        onChange={() => {}}
      />
      <div className="sign-in-forget-password">Forgot Password</div>
      <div className="signin-signin-btn">
        <ReusableButton buttonText={"Sign Up"} onClick={() => {}} />
      </div>
    </div>
  );
};

export default SignUpContainer;
