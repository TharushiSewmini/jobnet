import React, { useEffect, useState } from "react";
import "./index.css";
import fly from "../../assets/flying.png";
import SignInTextField from "../../components/SignInTextField";
import ReusableButton from "../../components/ReusableButton";
import lightbulb from "../../assets/light-bulb.png";
import happy from "../../assets/happy.png";

import happiest from "../../assets/happiest.png";
import love from "../../assets/love.png";
import { transform } from "typescript";
import { useNavigate } from "react-router-dom";
import SignUpContainer from "../../components/SignUpContainer";
import SignInContainer from "../../components/SignInContainer";
const SignInPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {}, []);

  const changingContainers = () => {
    setIsLogin(!isLogin);
  };
  const signUpText = isLogin ? "up" : "in";
  const navigate = useNavigate();
  return (
    <div className="sign-in-container">
      {/*  chnaging states */}

      <div
        className="sign-in-main-forum-container"
        style={
          isLogin
            ? {
                left: "3rem",
              }
            : {
                right: "3rem",
              }
        }
      >
        {isLogin ? (
          // <SignInContainer/>
          <SignUpContainer onChange={changingContainers} />
        ) : (
          // sign up container
          <SignInContainer onChange={changingContainers} />
        )}
      </div>
      <div
        className="sign-in-up-container"
        style={
          isLogin
            ? {
               justifyContent: 'flex-end',
              
              }
            : {
                left: 0,
              }
        }
      >
        <div className="sign-in-up-left-container">
          <div className="sign-in-text-section-Sign-in-to">
            Sign {signUpText} to
          </div>
          <div className="sign-in-text-lorem">
            Job net for your part time job
          </div>
          <div className="sign-in-paragraph">
            Jobnet aims to revolutionize the part-time job market for university
            students in Sri Lanka by providing a dedicated platform that
            connects them with potential employers. By facilitating easy job
            search and application processes, Jobnet will help students gain
          </div>
        </div>

        <img src={fly} className="sign-in-up-right-container-img" />
      </div>
      <div className="sign-down-conatiner">
        <div className="sign-in-rotate-box">
          <img src={lightbulb} />
        </div>
        <div className="signin-emojies">
          <img
            src={happy}
            className="sign-in-rotate-box-happy-emoj"
            id="sign-in-rotate-box-happy-emoj-1"
          />

          <img src={happiest} className="sign-in-rotate-box-happy-emoj-2" />

          <img src={love} className="sign-in-rotate-box-happy-emoj-3" />
          <img
            src={happy}
            className="sign-in-rotate-box-happy-emoj"
            id="sign-in-rotate-box-happy-emoj-1"
          />

          <img src={happiest} className="sign-in-rotate-box-happy-emoj-2" />

          <img src={love} className="sign-in-rotate-box-happy-emoj-3" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
