// src/components/JobModal.tsx
import React from 'react';
import { Modal } from 'antd';
import JobPost from '../../Components/JobPost';

interface JobModalProps {
  visible: boolean;
  onCancel: () => void;
  jobDetails: {
    image:string,
    title: string;
    uploadDate: string;
    remainingTime: string;
    salary: string;
    location: string;
  };
}

const JobModal: React.FC<JobModalProps> = ({ visible, onCancel, jobDetails }) => {
  return (
    <Modal
      visible={visible}
      title={jobDetails.title}
      onCancel={onCancel}
      footer={null}
      width={600} // Adjust width as needed
    >
      <JobPost {...jobDetails} />
    </Modal>
  );
};

export default JobModal;
