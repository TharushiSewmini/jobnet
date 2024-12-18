// src/components/JobModal.tsx
import React from "react";
import { Modal } from "antd";
import JobPost from "../JobPost";

interface JobModalProps {
  visible: boolean;
  onCancel: () => void;
  jobDetails: {
  id: string;
  jobTitle: string;
  salary: string;
  Date: string;
  location: string;
  userEmail: string;
  jobType: string;
  };
}

const JobModal: React.FC<JobModalProps> = ({
  visible,
  onCancel,
  jobDetails,
}) => {
  return (
    <Modal
      visible={visible}
      title={jobDetails.jobTitle}
      onCancel={onCancel}
      footer={null}
      width={600} // Adjust width as needed
    >
      <JobPost {...jobDetails} />
    </Modal>
  );
};

export default JobModal;
