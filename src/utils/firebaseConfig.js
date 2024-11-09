import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig  = {
  apiKey: "AIzaSyBI398H3WL2yZkIX7riA89FP1hrrYSTFIM",
  authDomain: "jobnet-397a9.firebaseapp.com",
  projectId: "jobnet-397a9",
  storageBucket: "jobnet-397a9.appspot.com",
  messagingSenderId: "1004865842240",
  appId: "1:1004865842240:web:89e91873d30a1fb86303a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export default firebaseConfig
export const storage = getStorage(app);