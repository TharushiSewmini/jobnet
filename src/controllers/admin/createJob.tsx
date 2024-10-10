import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

import JobPost from "../../components/JobPost";

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

const db = getFirestore();

export const createJob = async (jobPost: JobPost) => {
  try {
    await addDoc(collection(db, "jobs"), { jonbs: jobPost });
  } catch (error) {
    alert(error);
  }
};
