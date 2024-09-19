import React, { useEffect, useState } from "react";
import "./index.css";
import fly from "../../assets/Illustration.png"
import lightbulb from "../../assets/light-bulb.png";
import happy from "../../assets/happy.png";

import happiest from "../../assets/happiest.png";
import love from "../../assets/love.png";
import { transform } from "typescript";
import { useNavigate } from "react-router-dom";
import SignUpContainer from "../../components/SignUpContainer";

const CreateAccountPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {}, []);

  const changingContainers = () => {
    setIsLogin(!isLogin);
  };
 
  return (
    <div className="sign-up-container">
      {/*  chnaging states */}

      <div className="sign-up-up-container">
        <div className="sign-up-up-img-main-container">
        <img src={fly} className="sign-up-container-image-fly"  />
        </div>
      

        <div className="sign-up-main-forum-container">
          <SignUpContainer onChange={changingContainers} />
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

export default CreateAccountPage;
