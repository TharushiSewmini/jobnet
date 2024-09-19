import React, { useEffect, useState } from "react";

import ReusableButton from "../ReusableButton";
import { useNavigate } from "react-router-dom";
import "./index.css";
import SignInTextField from "../SignInTextField";
const SignUpContainer = () => {
 

  return (
    <div className="sign-up-box-white-form">
      
      <div className="sign-up-big-word">Create Account</div>

      <div className="sign-up-enter-texts">
      Already have account?
      <span className="sign-up-enter-login-text">
        Log In
      </span>
      </div>

      
      <div className="sign-up-user-name-conatiner">
        <div className="sign-up-user-name-flow">
        

          <SignInTextField
            placeHolderValue={"Full Name"}
            value={""}
            onChange={() => {}}
          />
        </div>

        <div className="sign-up-user-name-flow">
        

          <SignInTextField
            placeHolderValue={"Username"}
            value={""}
            onChange={() => {}}
          />
        </div>
      </div>
      <SignInTextField
        placeHolderValue={"Email address"}
        value={""}
        onChange={() => {}}
      />

      
      <SignInTextField
        placeHolderValue={"Password"}
        value={""}
        onChange={() => {}}
      />
       <SignInTextField
        placeHolderValue={"Confirm Password"}
        value={""}
        onChange={() => {}}
      />
      <div className="sign-up-sign-up-btn">
        <ReusableButton buttonText={"Create account"} onClick={() => {}} />
      </div>
    </div>
  );
};

export default SignUpContainer;
