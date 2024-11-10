// src/Components/JobPostsPage.tsx
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

/*import React from "react";
import JobPost from "../JobPost"; // Your JobPost component
import softwareCompany from '../../assets/99x.png'


interface JobPostsPageProps {
  selectedCity: string | null;
  keyword: string;
}

// Sample job posts data
const jobPosts = [
  { id: 1, title: "Software Engineer", location: "Colombo", salary: "$5000", remainingTime: "2 days", image:softwareCompany, uploadDate: "2024-09-16" },
  { id: 2, title: "Product Manager", location: "Kandy", salary: "$4000", remainingTime: "5 days", image: softwareCompany, uploadDate: "2024-09-17" },
  { id: 3, title: "Frontend Developer", location: "Galle", salary: "$3500", remainingTime: "3 days", image: softwareCompany, uploadDate: "2024-09-18" },
  { id: 4, title: "Backend Developer", location: "Colombo", salary: "$4500", remainingTime: "1 day", image: softwareCompany, uploadDate: "2024-09-19" },
];

const JobPostsPage: React.FC<JobPostsPageProps> = ({ selectedCity, keyword }) => {
  const filteredJobPosts = jobPosts.filter((post) => {
    const matchesCity = selectedCity ? post.location.toLowerCase() === selectedCity.toLowerCase() : true;
    const matchesKeyword = post.title.toLowerCase().includes(keyword.toLowerCase());
    return matchesCity && matchesKeyword;
  });

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">
      {filteredJobPosts.length > 0 ? (
        filteredJobPosts.map((post) => (
          <JobPost
            key={post.id}
            title={post.title}
            location={post.location}
            salary={post.salary}
            remainingTime={post.remainingTime}
            image={post.image}
            uploadDate={post.uploadDate}
          />
        ))
      ) : (
        <p>No job posts found.</p>
      )}
    </div>
  );
};

export default JobPostsPage;

// src/Components/JobPostsPage.tsx
// src/Components/JobPostsPage.tsx
/*import React from "react";
import JobPost from "../JobPost"; // Your JobPost component
import softwareCompany from '../../assets/99x.png'

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
  jobs: Job[];  // Accept the jobs array as a prop
  keyword: string;
  selectedCity: string | null;
}

const JobPostsPage: React.FC<JobPostsPageProps> = ({ jobs, keyword, selectedCity }) => {
  const filteredJobPosts = jobs.filter((post) => {
    const matchesCity =
      selectedCity ? post.jobLocation && post.jobLocation.toLowerCase() === selectedCity.toLowerCase() : true; // Ensure jobLocation is defined before calling toLowerCase
    const matchesKeyword =
      keyword ? post.jobTitle.toLowerCase().includes(keyword.toLowerCase()) || post.description.toLowerCase().includes(keyword.toLowerCase()) : true;

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
            remainingTime={post.expireDate}  // Adjust this to display the remaining time correctly
            image={softwareCompany} // Replace with dynamic image if needed
            uploadDate={post.expireDate}  // Adjust accordingly
          />
        ))
      ) : (
        <p>No job posts found.</p>
      )}
    </div>
  );
};

export default JobPostsPage;*/


