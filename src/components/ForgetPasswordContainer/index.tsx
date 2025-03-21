import React, { useState } from "react";
import ReusableButton from "../ReusableButton";
import SignInTextField from "../SignInTextField";
import "./index.css";
import { ResetPassword } from "../../controllers/auth/forgertPassword";
import { Alert, message } from "antd";
import { useNavigate } from "react-router-dom";

const ForgetPasswordContainer = () => {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  return (
    <div className="sign-up-box-white-form">
      {contextHolder}

      <div className="sign-up-big-word">Forget Password</div>

      <div className="sign-up-enter-texts">
        Go back to
        <span className="sign-up-enter-login-text" onClick={()=>{
          navigate("/login")
        }}>Sign In</span>
      </div>
      <div className="sign-up-enter-texts">
        Don’t have account
        <span className="sign-up-enter-login-text" onClick={()=>{
          navigate("/createAccount")
        }}>Create Account</span>
      </div>

      <SignInTextField
        placeHolderValue={"Email address"}
        value={email}
        onChange={(e) => {
          console.log(e);

          setEmail(e);
        }}
      />

      <div className="sign-up-sign-up-btn">
        <ReusableButton
          buttonText={"Reset Password"}
          onClick={async () => {
            var msg = await ResetPassword(email);
            messageApi.open({
              type: "success",
              content: msg,
              duration: 5,
            });
            setEmail("");
          }}
        />
      </div>
    </div>
  );
};

export default ForgetPasswordContainer;
