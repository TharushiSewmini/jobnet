import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

import JobPost from "../../components/JobPost";
import { getAuth } from "firebase/auth";




const db = getFirestore();
const auth = getAuth();
interface JobPost {
  jobTitle: string;
  salary: string;
  noOfVacancies: number;
  expireDate: Timestamp;
  Time: string;
  description: string;
  responsibilities: string;
  jobLocation: string;
  //when you give the user email to this object make sure the give email using auth context
  userEmail: string | undefined;

}

export const createJob = async (jobPost: JobPost) => {
  try {
    await addDoc(collection(db, "jobs"), {
      ...jobPost, // Spread the jobPost object properties
      userId: auth.currentUser?.uid, // Add the userId as a new property
    });
  } catch (error) {
    alert(error);
  }
};
