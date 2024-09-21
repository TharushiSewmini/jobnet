import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import fly from "../../assets/Illustration.png";
import lightbulb from "../../assets/light-bulb.png";
import happy from "../../assets/happy.png";
import happiest from "../../assets/happiest.png";
import love from "../../assets/love.png";
import SignInContainer from "../../components/SignInContainer";
import JobNetTopBar from "../../components/JobNetTopBar";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface User {
  useremail: string;
  password: string;
  userType?: string;
}

const SignInPage = () => {
  const { userType } = useAuthContext();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const user: User = {
    useremail: userEmail,
    password: password,
  };

  const auth = getAuth();

  const navigate = useNavigate();

  // handle sign

  const handleSignIn = async (user: User) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.useremail,
        user.password
      );
      if (!userCredential) {
        alert("you not logged in");
      }
      userType == "admin"
        ? navigate("/jobproviderdashboard")
        : navigate("/userHome");
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="sign-up-container">
      <JobNetTopBar />
      {/*  chnaging states */}

      <div className="sign-up-up-container">
        <div className="sign-up-up-img-main-container">
          <img src={fly} className="sign-up-container-image-fly" />
        </div>

        <div className="sign-up-main-forum-container">
          <SignInContainer
            onChangeEmail={(e) => setUserEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            useremail={userEmail}
            password={password}
            onSubmit={() => handleSignIn(user)}
          />
        </div>
        <div className="sign-up-rotate-box">
          <img src={lightbulb} />
        </div>
        <div className="signup-emojies">
          <img
            src={happy}
            className="sign-up-rotate-box-happy-emoj"
            id="sign-in-rotate-box-happy-emoj-1"
          />

          <img src={happiest} className="sign-up-rotate-box-happy-emoj-2" />

          <img src={love} className="sign-up-rotate-box-happy-emoj-3" />
          <img
            src={happy}
            className="sign-up-rotate-box-happy-emoj"
            id="sign-up-rotate-box-happy-emoj-1"
          />

          <img src={happiest} className="sign-up-rotate-box-happy-emoj-2" />

          <img src={love} className="sign-up-rotate-box-happy-emoj-3" />
        </div>
      </div>
      <div className="sign-down-conatiner"></div>
    </div>
  );
};

export default SignInPage;
