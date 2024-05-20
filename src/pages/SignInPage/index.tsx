import React from "react";
import "./index.css";
import fly from "../../assets/flying.png";
import SignInTextField from "../../components/SignInTextField";

const SignInPage = () => {
  return (
    <div className="sign-in-container">
      <div className="sign-in-main-forum-container">
      <div className="sign-in-box-white-form">
        <div className="sign-in-form-welcome">
          Welcome to <span className="sign-in-welcome-lorem">JobNet</span>
        </div>
        <div className="sign-in-big-word">
        Sign in
        </div>

        <div className="sign-in-enter-texts">
        Enter your username or email address
        </div>
       <SignInTextField/>
        
        <div className="sign-in-enter-texts">
        Enter your Password
        </div>
        
        <SignInTextField/>
       
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
     
     
      <div className="sign-down-conatiner"></div>
      
    </div>
  );
};

export default SignInPage;
