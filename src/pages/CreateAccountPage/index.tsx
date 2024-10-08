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
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const { userType } = useAuthContext();
  async function handleSignUp(user: User) {
    setIsLoading(true);
    try {
      // Check if the username already exists
      const usernameDoc = await getDoc(doc(db, "usernames", user.userName));

      if (usernameDoc.exists()) {
        // Username already exists, show an alert
        alert("This username is already taken. Please choose a different one.");
        return; // Exit the function if the username exists
      }

      // Create the user in Firebase Auth
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          user.useremail,
          user.password
        );
      const createdUser = userCredential.user;
      console.log("User creation successful", createdUser);

      // Store user information in Firestore
      await setDoc(doc(db, "users", createdUser.uid), {
        userEmail: user.useremail,
        userFullName: user.userFullName,
        userName: user.userName,
        userType: user.uType,
        createdAt: new Date().getTime(),
        timeStamp: Timestamp.fromDate(new Date()),
      });

      // Set the username in Firestore
      await setDoc(doc(db, "usernames", user.userName), {
        uid: createdUser.uid,
      });
    } catch (error) {
      console.error("Error during signup:", error);
    }
    setIsLoading(false);
    userType === "admin"
      ? navigate("/jobProviderDashboard")
      : navigate("/userHome");
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
