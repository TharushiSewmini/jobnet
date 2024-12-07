import React from "react";
import JobPost from "../JobPost";
import softwareCompany from '../../assets/99x.png';

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
  const filteredJobPosts = jobs.filter((post) => {
    const matchesCity = selectedCity ? post.jobLocation && post.jobLocation.toLowerCase() === selectedCity.toLowerCase() : true;
    const matchesKeyword = keyword ? post.jobTitle.toLowerCase().includes(keyword.toLowerCase()) || post.description.toLowerCase().includes(keyword.toLowerCase()) : true;

    return matchesCity && matchesKeyword;
  });

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">
      {filteredJobPosts.length > 0 ? (
        filteredJobPosts.map((post) => (
          <JobPost
            key={post.id}
            title={post.jobTitle}
            location={post.jobLocation}
            salary={post.salary}
            remainingTime={post.expireDate}
            image={softwareCompany}
            uploadDate={post.expireDate}
          />
        ))
      ) : (
        <p>No job posts found.</p>
      )}
    </div>
  );
};

export default JobPostsPage;



