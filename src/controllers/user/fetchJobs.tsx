import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

interface Job {
  id: string;
  jobTitle: string;
  salary: string;
  noOfVacancies: number;
  expireDate: string;
  Time: string;
  description: string;
  responsibilities: string;
  jobLocation: string;
  userEmail: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  const jobList: Job[] = [];
  const querySnapshot = await getDocs(collection(db, "jobs"));
  
  querySnapshot.forEach((doc) => {
    const jobData = doc.data() as Omit<Job, "id" | "expireDate">; // Exclude id and expireDate temporarily
    const expireDate = (doc.data().expireDate instanceof Timestamp)
    ? doc.data().expireDate.toDate().toLocaleDateString()
    : "";
    
    jobList.push({ id: doc.id, ...jobData, expireDate }); 
  });

  return jobList;
};

export default fetchJobs;
