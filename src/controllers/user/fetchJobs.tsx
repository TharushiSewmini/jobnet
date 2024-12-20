import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

interface Job {
  id: string;
  jobTitle: string;
  salary: string;
  Date: string;
  location: string;
  userEmail: string;
  jobType: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  const jobList: Job[] = [];
  const querySnapshot = await getDocs(collection(db, "jobs"));
  
  querySnapshot.forEach((doc) => {
    const jobData = doc.data() as Omit<Job, "id" | "Date">; // Exclude id and expireDate temporarily
    const Date = (doc.data().Date)  
    jobList.push({ id: doc.id, ...jobData, Date }); 
  });

  return jobList;
};

export default fetchJobs;
