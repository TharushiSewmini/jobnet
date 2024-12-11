import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseConfig";
import emailjs from "@emailjs/browser";

export const applyForTheJob = async (
  jobId: string,
  jobProviderEmail: string
) => {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to apply for a job.");
    return;
  }

  const jobRef = doc(db, "jobs", jobId);
  try {
    await updateDoc(jobRef, {
      applicants: arrayUnion({
        userId: user.uid,
        status: "applied",
        timeStamp: Date.now(),
      }),
    });

    // for now disbled sice only 200 request can be do
    //  emailjs
    //   .send(
    //     "service_ygnbsbb",
    //     "template_xvscs7r",
    //     {
    //       from_name: "JobNet",
    //       from_email: "hellostatsquad@gmail.com",
    //       to_name: jobProviderEmail,
    //       to_email:jobProviderEmail,
    //       message: `New Job Application for Job ID: ${jobId} from user ${user.email}`,
    //     },
    //     "1Rk47UP6Gby_Ul5QI"
    //   )
    //   .then(
    //     (response) => {
    //       console.log("SUCCESS", response.status, response.text);
    //     },
    //     (err) => {
    //       console.log("Error", err);
    //     }
    //   );
    alert("Application submitted successfully");
  } catch (error) {
    console.error("Error updating document:", error);
    alert("Failed to apply for the job. Please try again later.");
  }
};
