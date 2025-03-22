import Alert from "antd/es/alert/Alert";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from "react";

export const ResetPassword = async (userEmail: string): Promise<string> => {
  const auth = getAuth();

  try {
    await sendPasswordResetEmail(auth, userEmail);
    // alert(
    //   "We just send you an reset email , just check your emails at " + userEmail
    // );
    return (
      "We just send you an reset email , just check your emails at " + userEmail
    );
  } catch (error) {
    console.error("Error signing in: ", error);
    return "Failed to send email. Please check your email.";
  } finally {
  }
};
