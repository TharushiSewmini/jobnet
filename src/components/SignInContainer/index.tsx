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
  const { setUserType, setAuthenticated } = useAuthContext();
  // google sign in function
  const cookies = new Cookie();

  async function createUserWithGoogle(
    result: UserCredential,

    username: string
  ) {
    try {
      const user = result.user;

      // Check if the user already exists in the Firestore users collection
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If the user does not exist, create the user document
        await setDoc(userDocRef, {
          userEmail: user.email,
          userImage: user.photoURL,
          userFullName: user.displayName,
          userName: username, // or custom logic for username
          userType: isUser ? "User" : "Admin",
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
      setAuthenticated(true);
      setUserType(isUser ? "User" : "Admin");
      if (isUser) {
        navigate("/userHome");
      } else {
        navigate("/jobProviderDashboard");
      }
      const result = await signInWithPopup(auth, provider);

      // Set the auth token as a cookie
      cookies.set("auth-token", result.user.refreshToken, { path: "/" });

      // Call createUserWithGoogle to handle user storage in Firestore
      await createUserWithGoogle(result, ""); // Change "user" to "admin" if needed
      console.log("Google sign-in successful", result);

      // alert(userType + "user type");
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

      <div className="flex gap-4 bg-white p-2 rounded-md ">
        <div className="flex gap-2">
          <label> User </label>
          <Checkbox onClick={() => setUser(!isUser)} checked={isUser} />
        </div>
        <div className="flex gap-2">
          <label> Admin </label>
          <Checkbox checked={!isUser} onClick={() => setUser(!isUser)} />
        </div>
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
