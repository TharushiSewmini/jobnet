import React from "react";
import JobPost from "../JobPost";
import softwareCompany from "../../assets/99x.png";

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

interface JobPostsPageProps {
  jobs: Job[];
  keyword: string;
  selectedCity: string | null;
}

const JobPostsPage: React.FC<JobPostsPageProps> = ({ jobs, keyword, selectedCity }) => {
  // Updated filtering logic with optional chaining to avoid errors
  const filteredJobPosts = jobs.filter((post) => {
    // Check if the job location matches the selected city (if a city is selected)
    const matchesCity = selectedCity
      ? post.jobLocation?.toLowerCase() === selectedCity.toLowerCase()
      : true;

    // Check if the job title or description matches the entered keyword
    const matchesKeyword = keyword
      ? post.jobTitle?.toLowerCase().includes(keyword.toLowerCase()) ||
        post.description?.toLowerCase().includes(keyword.toLowerCase())
      : true;

    return matchesCity && matchesKeyword;
  });

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">
      {filteredJobPosts.length > 0 ? (
        filteredJobPosts.map((post) => (
          <JobPost
            id={post.id}
            userEmail={post.userEmail}
            key={post.id}
            title={post.jobTitle || "No Title"}
            location={post.jobLocation || "Not Specified"}
            salary={post.salary || "N/A"}
            remainingTime={post.expireDate || "N/A"}
            image={softwareCompany}
            uploadDate={post.expireDate || "N/A"}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No job posts found.</p>
      )}
    </div>
  );
};

export default JobPostsPage;
