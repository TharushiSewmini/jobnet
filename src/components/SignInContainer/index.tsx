import React, { useEffect, useState } from "react";
import SignInTextField from "../SignInTextField";
import ReusableButton from "../ReusableButton";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import "./index.css";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { getDoc, setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db, provider } from "../../utils/firebaseConfig";
import Cookie from "universal-cookie";
import { Checkbox } from "antd";
import { useAuthContext } from "../../contexts/AuthContext";

interface SignInContainerProps {
  onChangeEmail: (e: any) => void;
  onChangePassword: (e: any) => void;
  onSubmit: (e: any) => void;
  useremail: string;
  password: string;
}

const SignInContainer = ({
  onChangeEmail,
  onChangePassword,
  useremail,
  password,
  onSubmit,
}: SignInContainerProps) => {
  const navigate = useNavigate();
  const [isUser, setUser] = useState(true);

  // google sign in function
  const cookies = new Cookie();

 

  // Updated handleGoogleSignIn function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Set the auth token as a cookie
      cookies.set("auth-token", result.user.refreshToken, { path: "/" });

     
      console.log("Google sign-in successful", result);
    } catch (error) {
      console.log("Error during Google sign-in:", error);
    }
  };
  return (
    <div className="sign-in-box-white-form">
      <div className="sign-in-big-word">Sign in</div>

      <div className="sign-up-enter-texts">
        Don't have an account ?
        <span
          className="sign-up-enter-login-text"
          onClick={() => navigate("/createAccount")}
        >
          Create and Account
        </span>
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

      
      <center>
        <div
          className="bg-[#F5F5F5] p-3 w-full text-center flex justify-center gap-3 items-center rounded-md cursor-pointer shadow-lg text-base text-[#0A65CC] font-medium"
          onClick={handleGoogleSignIn}
        >
          <span>
            <img src={google} />
          </span>
          <span> Sign in with Google</span>
        </div>
      </center>
    </div>
  );
};

export default SignInContainer;
