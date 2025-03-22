import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface User {
  userEmail: string;
  userPassword: string;
}
interface Response {
  statusType: string;
  message: string;
}

export const LoginUser = async (
  user: User,
): Promise<Response> => {
  const auth = getAuth();

  try {
    var res = await signInWithEmailAndPassword(
      auth,
      user.userEmail,
      user.userPassword
    );
    if (res.user.email != null) {
      return { statusType: "success", message: "You Logged in Successfully" };
    } else {
      return {
        statusType: "error",
        message: "Failed to sign in. Please check your credentials.",
      };
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    return {
      statusType: "error",
      message: "Failed to sign in. Please check your credentials.",
    };
    // alert("Failed to sign in. Please check your credentials.");
  } finally {
  }
};
