import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig  = {
  apiKey: "AIzaSyBI398H3WL2yZkIX7riA89FP1hrrYSTFIM",
  authDomain: "jobnet-397a9.firebaseapp.com",
  projectId: "jobnet-397a9",
  storageBucket: "jobnet-397a9.appspot.com",
  messagingSenderId: "1004865842240",
  appId: "1:1004865842240:web:89e91873d30a1fb86303a5"
};

export default firebaseConfig
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
