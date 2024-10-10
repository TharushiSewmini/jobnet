import React, { useEffect, useState } from "react";
import "./index.css";
import fly from "../../assets/Illustration.png";
import lightbulb from "../../assets/light-bulb.png";
import happy from "../../assets/happy.png";
import happiest from "../../assets/happiest.png";
import love from "../../assets/love.png";
import SignUpContainer from "../../components/SignUpContainer";
import JobNetTopBar from "../../components/JobNetTopBar";
import { Flex, Spin } from "antd";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { createUser } from "../../controllers/auth/createUser";
interface User {
  userFullName: string;
  userName: string;
  useremail: string;
  password: string;
  uType: string;
}
const CreateAccountPage = () => {
  const options = ["Admin", "User"];

  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uType, setUserType] = useState(options[1]);
  const [isloading, setIsLoading] = useState(false);

  const user: User = {
    userFullName: userFullName,
    userName: userName,
    useremail: userEmail,
    uType: uType,
    password: password,
  };

  //initilizing firebase auth and firestore

  const navigate = useNavigate();
  const { userType } = useAuthContext();

  //handle signup
  async function handleSignUp(user: User) {
    setIsLoading(true);
    createUser(user, userType, navigate);
    setIsLoading(false);
  }

  return !isloading ? (
    <div className="sign-up-container">
      <JobNetTopBar />
      <div className="sign-up-up-container">
        <div className="sign-up-up-img-main-container">
          <img src={fly} className="sign-up-container-image-fly" />
        </div>

        <div className="sign-up-main-forum-container">
          <SignUpContainer
            onChangeUserFullName={(e) => setUserFullName(e.target.value)} // Correct usage
            onChangeUserName={(e) => setUserName(e.target.value)} // Correct usage
            onChangeEmail={(e) => setUserEmail(e.target.value)} // Correct usage
            onChangePassword={(e) => setPassword(e.target.value)} // Correct usage
            onChangeConfirmPassword={(e) => setConfirmPassword(e.target.value)} // Correct usage
            userFullName={userFullName}
            userName={userName}
            useremail={userEmail}
            password={password}
            userType={uType}
            onSubmit={() => handleSignUp(user)} // Implemented correctly
            confirmassword={confirmPassword}
            onSelevtUserType={(e) => setUserType(e.target.value)}
            options={options}
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

export default CreateAccountPage;
