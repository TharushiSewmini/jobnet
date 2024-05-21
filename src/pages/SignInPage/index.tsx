import React from "react";
import "./index.css";
import fly from "../../assets/flying.png";
import SignInTextField from "../../components/SignInTextField";
import ReusableButton from "../../components/ReusableButton";
import lightbulb from "../../assets/light-bulb.png";
import happy from "../../assets/happy.png";

import happiest from "../../assets/happiest.png";
import love from "../../assets/love.png";
const SignInPage = () => {
  return (
    <div className="sign-in-container">
      <div className="sign-in-main-forum-container">
        <div className="sign-in-box-white-form">
          <div className="signin-welcome-full-container">
            <div className="sign-in-form-welcome">
              Welcome to <span className="sign-in-welcome-lorem">JobNet</span>
            </div>
            <div className="sign-in-no-account">
              <span className="sign-in-no-account-first">No Account ?</span>
              <span className="sign-in-no-account-second">Sign up</span>
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
            <ReusableButton />
          </div>
        </div>
      </div>
      <div className="sign-in-up-container">
        <div className="sign-in-up-left-container">
          <div className="sign-in-text-section-Sign-in-to">Sign in to</div>
          <div className="sign-in-text-lorem">
            Job net for your part time job
          </div>
          <div className="sign-in-paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
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
