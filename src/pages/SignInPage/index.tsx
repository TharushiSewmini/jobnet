import React, { useState, useEffect } from "react";
import "./index.css";
import fly from "../../assets/Illustration.png";
import lightbulb from "../../assets/light-bulb.png";
import happy from "../../assets/happy.png";
import happiest from "../../assets/happiest.png";
import love from "../../assets/love.png";
import SignInContainer from "../../components/SignInContainer";
import JobNetTopBar from "../../components/JobNetTopBar";
import { Flex, Spin } from "antd";
import { useAuthContext } from "../../contexts/AuthContext";

import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../controllers/auth/loginUser";

interface User {
  userEmail: string;
  userPassword: string;
}

const SignInPage = () => {
  const { userType } = useAuthContext();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const user: User = {
    userEmail: userEmail,
    userPassword: password,
  };

  //handling sign function
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      //login user function
      LoginUser(user, userType, navigate);
      setIsLoading(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return !isLoading ? (
    <div className="sign-up-container">
      <JobNetTopBar />
      <div className="sign-up-up-container">
        <div className="sign-up-up-img-main-container">
          <img src={fly} className="sign-up-container-image-fly" alt="Fly" />
        </div>
        <div className="sign-up-main-forum-container">
          <SignInContainer
            onChangeEmail={(e) => setUserEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            useremail={userEmail}
            password={password}
            onSubmit={handleSignIn}
          />
        </div>
        <div className="sign-up-rotate-box">
          <img src={lightbulb} alt="Lightbulb" />
        </div>
        <div className="signup-emojies">
          <img
            src={happy}
            className="sign-up-rotate-box-happy-emoj"
            id="sign-in-rotate-box-happy-emoj-1"
            alt="Happy"
          />
          <img
            src={happiest}
            className="sign-up-rotate-box-happy-emoj-2"
            alt="Happiest"
          />
          <img
            src={love}
            className="sign-up-rotate-box-happy-emoj-3"
            alt="Love"
          />
          <img
            src={happy}
            className="sign-up-rotate-box-happy-emoj"
            id="sign-up-rotate-box-happy-emoj-1"
            alt="Happy"
          />
          <img
            src={happiest}
            className="sign-up-rotate-box-happy-emoj-2"
            alt="Happiest"
          />
          <img
            src={love}
            className="sign-up-rotate-box-happy-emoj-3"
            alt="Love"
          />
        </div>
      </div>
      <div className="sign-down-conatiner"></div>
    </div>
  ) : (
    <Flex
      align="center"
      gap="middle"
      className="w-screen h-screen flex justify-center items-center bg-transparent"
    >
      <Spin size="large" />
    </Flex>
  );
};

export default SignInPage;
