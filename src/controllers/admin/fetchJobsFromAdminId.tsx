import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseConfig";

interface JobPost {
  Time: string;
  description: string;
  expireDate: Date;
  jobLocation: string;
  jobTitle: string;
  noOfVacancies: 5;
  responsibilities: string[];
  salary: string;
  userEmail: string;
  userId: string;
} 

// use NF2k4wLgfoYz65fkRMGjVqilHqf1 for currentUserId development since other users dont have posted jobs
const currentUserId = auth.currentUser?.uid || "";
const jobRef = collection(db, "jobs");
const adminJobsQuery = query(jobRef, where("userId", "==", currentUserId));

const JobList: JobPost[] = [];

export const fetchJobsFromAdminId = async () => {
  try {
    const jobSnapShot = await getDocs(adminJobsQuery);
    if (!jobSnapShot.empty) {
      const jobData = jobSnapShot.docs.map((doc) => ({
        ...(doc.data() as JobPost),
        id: doc.id,
      }));
      JobList.push(...jobData);
    } else {
      console.log("job snap shot comes with empty list");
    }
    return JobList;
  } catch (error) {
    console.log("no admin job post");
  }
};
export const adminPostedJobsYet = async () => {
  const jobSnapShot = await getDocs(adminJobsQuery);
  if (!jobSnapShot.empty) {
    const jobsCount = jobSnapShot.docs.length;
    return jobsCount;
  } else {
    return 0;
  }
};
