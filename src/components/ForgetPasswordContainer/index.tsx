import React from "react";
import ReusableButton from "../ReusableButton";
import SignInTextField from "../SignInTextField";
import "./index.css"

const ForgetPasswordContainer = () => {
  return (
    <div className="sign-up-box-white-form">
      <div className="sign-up-big-word">Forget Password</div>

      <div className="sign-up-enter-texts">
        Go back to
        <span className="sign-up-enter-login-text">Sign In</span>
      </div>
      <div className="sign-up-enter-texts">
        Don’t have account
        <span className="sign-up-enter-login-text">Create Account</span>
      </div>

      <SignInTextField
        placeHolderValue={"Email address"}
        value={""}
        onChange={() => {}}
      />

      <div className="sign-up-sign-up-btn">
        <ReusableButton buttonText={"Reset Password"} onClick={() => {}} />
      </div>
    </div>
  );
};

export default ForgetPasswordContainer;
