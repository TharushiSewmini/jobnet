import React, { useEffect, useState } from "react";
import google from "../../assets/google.png";
import ReusableButton from "../ReusableButton";
import { useNavigate } from "react-router-dom";
import "./index.css";
import SignInTextField from "../SignInTextField";
import { Checkbox, Dropdown } from "antd";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db, provider } from "../../utils/firebaseConfig";
import { useAuthContext } from "../../contexts/AuthContext";
import Cookie from "universal-cookie";
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
  const [isUser, setUser] = useState(true);

  const {setUserType} = useAuthContext();
  // google sign in function
  const cookies = new Cookie();

  async function createUserWithGoogle(
    result: UserCredential,

    username: string
  ) {
    try {
      if (userType == null) {
        alert("Please select user type to log with google provider");
      }
      const user = result.user;

      // Check if the user already exists in the Firestore users collection
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If the user does not exist, create the user document
        await setDoc(userDocRef, {
          userEmail: user.email,
          userFullName: user.displayName,
          userName: username, // or custom logic for username
          userType: userType,
          createdAt: new Date().getTime(),
          timeStamp: Timestamp.fromDate(new Date()),
        });
        console.log("User created successfully in Firestore");
      } else {
        console.log("User already exists in Firestore");
      }
    } catch (error) {
      console.error("Error during Google sign-in user creation:", error);
    }
  }

  // Updated handleGoogleSignIn function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Set the auth token as a cookie
      cookies.set("auth-token", result.user.refreshToken, { path: "/" });

      // Call createUserWithGoogle to handle user storage in Firestore
      await createUserWithGoogle(result, " "); // Change "user" to "admin" if needed
      console.log("Google sign-in successful", result);
      setUserType(userType);
     // alert(userType + "user type");
      if (userType === "User") {
        navigate("/userHome");
      } else {
        navigate("/jobProviderDashboard");
      }
    } catch (error) {
      console.log("Error during Google sign-in:", error);
    }
  };

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

export default SignUpContainer;
