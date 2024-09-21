import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import firebaseConfig from "../utils/firebaseConfig";
import {
  getFirestore,
  where,
  query,
  collection,
  getDocs,
} from "firebase/firestore";

// Initialize Firebase app with the provided configuration
initializeApp(firebaseConfig);

// Type definition for component props
type Props = {
  children?: ReactNode;
};

// Interface for the AuthContext
interface IAuthContext {
  authenticated: boolean;
  userType: string | undefined;
  setUserType: (userType: string) => void;
  setAuthenticated: (newState: boolean) => void;
  logout: () => void;
}

// Interface for user properties from Firestore
interface UserProps {
  useremail: string;
  password: string;
  userType?: string;
}

// Create AuthContext with initial undefined value
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// AuthProvider component to provide authentication state and actions
const AuthProvider = ({ children }: Props) => {

  //states
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  //firebase - auth
  const auth = getAuth();

  //firebase - db
  const db = getFirestore();



  // Function to fetch the userType from Firestore
  async function fetchinguserType(email: string | null) {
    try {
      const useQuery = query(
        collection(db, "users"),
        where("userEmail", "==", email)
      );

      const currentUserDocs = await getDocs(useQuery);
      if (!currentUserDocs.empty) {
        const userData = currentUserDocs.docs[0].data() as UserProps;
        setUserType(userData.userType === "admin" ? "admin" : "user");

        console.log("User type fetched: ", userData.userType);
      } else {
        console.error("No user type found");
      }
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  }

  // useEffect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);

        fetchinguserType(user.email);
      } else {
        setAuthenticated(false);
        setUserType(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // useEffect to log the updated state
  useEffect(() => {
    console.log("Authentication state updated:", authenticated);
    console.log("User type updated:", userType);
  }, [authenticated, userType]);

  // useEffect to handle inactivity timeout
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => logout(), 10 * 60 * 1000); // 60 minutes timeout
    };

    const logout = () => {
      signOut(auth).then(() => {
        setAuthenticated(false);
        setUserType("");
      });
    };

    // Attach event listeners to reset the timer
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer(); // Initialize the timer

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [auth, authenticated, userType]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        userType,
        setUserType,
        logout: () => signOut(auth),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };