import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseConfig";

interface JobPost {
  id: string;
  Time: string;
  description: string;
  expireDate: Date;
  jobLocation: string;
  jobTitle: string;
  noOfVacancies: number;
  responsibilities: string[];
  salary: string;
  userEmail: string;
  userId: string;
}

export const fetchJobsFromAdminId = async (): Promise<JobPost[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.warn("No user is logged in.");
      return [];
    }

    const jobRef = collection(db, "jobs");
    const adminJobsQuery = query(jobRef, where("userId", "==", currentUser.uid));

    const jobSnapShot = await getDocs(adminJobsQuery);

    if (!jobSnapShot.empty) {
      return jobSnapShot.docs.map((doc) => ({
        ...(doc.data() as JobPost),
        id: doc.id, // Include the document ID
      }));
    } else {
      console.log("No jobs found for this user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const adminPostedJobsYet = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return 0;

  const jobRef = collection(db, "jobs");
  const adminJobsQuery = query(jobRef, where("userId", "==", currentUser.uid));
  const jobSnapShot = await getDocs(adminJobsQuery);

  return jobSnapShot.size; // Returns number of jobs
};

