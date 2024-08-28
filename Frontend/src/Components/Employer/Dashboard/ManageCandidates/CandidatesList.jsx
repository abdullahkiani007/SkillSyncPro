import React, { useState } from "react";
import ApplicationSummary from "./ApplicantsSummary";
import CandidateTable from "./CandidatesTables";

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([
    {
      candidate: "Kinjal Shah",
      referenceNo: "DES123987",
      department: "Design",
      appliedDate: "20 January, 2023",
      location: "Canada",
      contact: "437-981-2249",
      emailId: "kinjal@gmail.com",
      stage: "Review",
      isApproved: true,
    },
    {
      candidate: "Neil Nikhil",
      referenceNo: "OPS347985",
      department: "Operations",
      appliedDate: "10 January, 2023",
      location: "United States",
      contact: "437-982-4249",
      emailId: "neil@gmail.com",
      stage: "Accepted",
      isApproved: false,
    },
    {
      candidate: "Shireen Kumar",
      referenceNo: "DES123964",
      department: "Design",
      appliedDate: "19 January, 2023",
      location: "United States",
      contact: "437-981-2354",
      emailId: "shireen@gmail.com",
      stage: "Resume Screening",
      isApproved: false,
    },
    {
      candidate: "Thimothy Raj",
      referenceNo: "MAR007064",
      department: "Marketing",
      appliedDate: "03 January, 2023",
      location: "Russia",
      contact: "437-981-4313",
      emailId: "thimothy@gmail.com",
      stage: "Rejected",
      isApproved: false,
    },
    {
      candidate: "Daniel Vei",
      referenceNo: "DOP098777",
      department: "Devops",
      appliedDate: "09 January, 2023",
      location: "Canada",
      contact: "437-982-4455",
      emailId: "daniel@gmail.com",
      stage: "Selected",
      isApproved: true,
    },
    {
      candidate: "Yesu kumar",
      referenceNo: "DES123547",
      department: "Design",
      appliedDate: "21 January, 2023",
      location: "United States",
      contact: "437-982-4444",
      emailId: "yesu@gmail.com",
      stage: "In-Person Interview",
      isApproved: false,
    },
  ]);

  return (
    <div className="bg-white">
      <h1 className="py-10 px-6 font-bold text-2xl text-secondary-dark">
        Candidates Summary
      </h1>
      <div className="ml-20">
        <ApplicationSummary />
      </div>
      <h1 className="py-10 px-6 font-bold text-2xl text-secondary-dark">
        Candidates List:{" "}
      </h1>
      <div className="overflow-scroll">
        <CandidateTable candidates={candidates} />
      </div>
    </div>
  );
};

export default CandidatesList;
