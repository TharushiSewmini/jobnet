import React, { useEffect, useState } from "react";
import SignInTextField from "../SignInTextField";
import ReusableButton from "../ReusableButton";
import { useNavigate } from "react-router-dom";
import "./index.css";

interface SignInContainerProps {
 
  onChangeEmail: (e: any) => void;
  onChangePassword: (e: any) => void;
onSubmit:(e:any)=>void;
  useremail: string;
  password: string;

}

const SignInContainer = ({
  onChangeEmail,
  onChangePassword,
  useremail,
  password,
onSubmit
}: SignInContainerProps) => {
  const navigate = useNavigate();

  return (
    <div className="sign-in-box-white-form">
      <div className="sign-in-big-word">Sign in</div>

      <div className="sign-up-enter-texts">
        Don't have an account ?
        <span className="sign-up-enter-login-text" onClick={()=>navigate("/createAccount")}>Create and Account</span>
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

      <div className="signin-signin-btn">
        <ReusableButton buttonText={"Sign In"} onClick={onSubmit} />
      </div>
    </div>
  );
};

export default SignInContainer;
