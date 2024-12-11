import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";


interface User {
  userEmail: string;
  userPassword: string;
}

export const LoginUser = async (
  user: User,
  userType: string | undefined,
  navigate: NavigateFunction
) => {
  const auth = getAuth();

  try {
    await signInWithEmailAndPassword(auth, user.userEmail, user.userPassword);
    switch (userType) {
      case "admin":
        navigate("/jobProviderDashboard");
        break;
      case "User":
        navigate("/userHome");
        break;
      default:
        navigate("/waiting");
        break;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    alert("Failed to sign in. Please check your credentials.");
  } finally {
  }
};
