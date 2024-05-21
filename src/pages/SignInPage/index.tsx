import React, { useState } from "react";
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
const SignInPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const changingStatesToLogin = () => {
    console.log("state change to , ", isLogin);

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
                left: "10rem",
              }
            : {
                right: "10rem",
              }
        }
      >
        {!isLogin ? (
          <div className="sign-in-box-white-form">
            <div className="signin-welcome-full-container">
              <div className="sign-in-form-welcome">
                Welcome to <span className="sign-in-welcome-lorem">JobNet</span>
              </div>
              <div className="sign-in-no-account">
                <span className="sign-in-no-account-first">No Account ?</span>
                <span
                  className="sign-in-no-account-second"
                  onClick={changingStatesToLogin}
                >
                  Sign up
                </span>
              </div>
            </div>

            <div className="sign-in-big-word">Sign in</div>

            <div className="sign-in-enter-texts">
              Enter your username or email address
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
            <div className="sign-in-forget-password">Forgot Password</div>
            <div className="signin-signin-btn">
              <ReusableButton
                buttonText={"Sign In"}
                onClick={() => {
                  navigate("./home");
                }}
              />
            </div>
          </div>
        ) : (
          // sign up container

          <div className="sign-in-main-forum-container">
            <div className="sign-in-box-white-form">
              <div className="signin-welcome-full-container">
                <div className="sign-in-form-welcome">
                  Welcome to{" "}
                  <span className="sign-in-welcome-lorem">JobNet</span>
                </div>
                <div className="sign-in-no-account">
                  <span className="sign-in-no-account-first">
                    Have an Account ?{" "}
                  </span>
                  <span
                    className="sign-in-no-account-second"
                    onClick={changingStatesToLogin}
                  >
                    Sign in
                  </span>
                </div>
              </div>

              <div className="sign-in-big-word">Sign Up</div>

              <div className="sign-in-enter-texts">
                Enter your username or email address
              </div>
              <SignInTextField
                placeHolderValue={"Username or email address"}
                value={""}
                onChange={() => {}}
              />

              <div className="sign-up-user-name-conatiner">
                <div className="sign-up-user-name-flow">
                  <div className="sign-in-enter-texts">Enter your Password</div>

                  <SignInTextField
                    placeHolderValue={"Password"}
                    value={""}
                    onChange={() => {}}
                  />
                </div>

                <div className="sign-up-user-name-flow">
                  <div className="sign-in-enter-texts">Enter your Password</div>

                  <SignInTextField
                    placeHolderValue={"Password"}
                    value={""}
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="sign-in-enter-texts">
                Enter your username or email address
              </div>
              <SignInTextField
                placeHolderValue={"Username or email address"}
                value={""}
                onChange={() => {}}
              />
              <div className="sign-in-forget-password">Forgot Password</div>
              <div className="signin-signin-btn">
                <ReusableButton buttonText={"Sign Up"} onClick={() => {}} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="sign-in-up-container"
        style={
          isLogin
            ? {
                paddingRight: "4.563rem",
                justifyContent: "flex-end",
              }
            : {
                paddingLeft: "4.563rem",
                justifyContent: "flex-start",
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
            valuable work experience and support their academic pursuits.
            Employers will benefit from access to a motivated and qualified
            workforce, enhancing their operations and productivity.
          </div>
        </div>
        <div className="sign-in-up-right-container">
          <img src={fly} className="sign-in-up-right-container-img" />
        </div>
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
