import {  UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDoc, doc, setDoc, Timestamp , getFirestore } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";


interface User {
    userFullName: string;
    userName: string;
    useremail: string;
    password: string;
    uType: string;
  }

  const auth = getAuth();
  const db = getFirestore();

export async function createUser(user: User , userType : string | undefined , navigate : NavigateFunction) {

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

    userType === "admin"
      ? navigate("/jobProviderDashboard")
      : navigate("/userHome");
  }