import React, { useEffect, useState } from "react";
import "./index.css";
import fly from "../../assets/Illustration.png";
import lightbulb from "../../assets/light-bulb.png";
import happy from "../../assets/happy.png";
import happiest from "../../assets/happiest.png";
import love from "../../assets/love.png";
import SignInContainer from "../../components/SignInContainer";
import JobNetTopBar from "../../components/JobNetTopBar";

const SignInPage = () => {
 
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
            onChangeEmail={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
            onChangePassword={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
            useremail={""}
            password={""}
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
