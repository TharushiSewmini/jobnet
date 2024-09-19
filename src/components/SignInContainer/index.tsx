import React, { useEffect, useState } from "react";
import SignInTextField from "../SignInTextField";
import ReusableButton from "../ReusableButton";
import { useNavigate } from "react-router-dom";
import "./index.css";

interface SignInContainerProps {
  onChange: (e: any) => void;
}

const SignInContainer = ({ onChange }: SignInContainerProps) => {
  const navigate = useNavigate();

  return (
    <div className="sign-in-box-white-form">
      <div className="sign-in-big-word">Sign in</div>

      <div className="sign-up-enter-texts">
     Don't have an account ?
      <span className="sign-up-enter-login-text">
   Create and Account 
      </span>
      </div>

      <SignInTextField
        placeHolderValue={"Username or email address"}
        value={""}
        onChange={() => {}}
      />

      <div className="sign-in-enter-texts">Enter your Password</div>

      <SignInTextField
        placeHolderValue={"Password"}
        value={""}
        onChange={() => {}}
      />
    
      <div className="signin-signin-btn">
        <ReusableButton
          buttonText={"Sign In"}
          onClick={() => {
            navigate("./jobproviderdashboard");
          }}
        />
      </div>
    </div>
  );
};

export default SignInContainer;
