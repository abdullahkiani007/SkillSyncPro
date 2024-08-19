import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const CandidateCard = ({ name, appliedDate, avatar, status, actions }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 flex flex-col justify-between">
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-500">{appliedDate}</p>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Status: </span>
          <span className="bg-blue-500 text-white rounded-md px-2 py-1">
            {status}
          </span>
        </div>
        <div className="flex items-center ml-auto">
          {actions.map((action, index) => (
            <button
              key={index}
              className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Candidates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const candidates_data = [
    {
      name: "Leonard Campbell",
      appliedDate: "Applied today",
      avatar: "https://picsum.photos/200/300",
      status: "New Applied",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Jordan Rogers",
      appliedDate: "Applied 4 days ago",
      avatar: "https://picsum.photos/200/300",
      status: "Screening",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Timothy Erickson",
      appliedDate: "Applied a week ago",
      avatar: "https://picsum.photos/200/300",
      status: "Interview",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Jose Abbott",
      appliedDate: "Applied yesterday",
      avatar: "https://picsum.photos/200/300",
      status: "New Applied",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Miguel Hill",
      appliedDate: "Applied 5 days ago",
      avatar: "https://picsum.photos/200/300",
      status: "Screening",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Vernon Ferguson",
      appliedDate: "Applied a week ago",
      avatar: "https://picsum.photos/200/300",
      status: "Interview",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Derrick Rowe",
      appliedDate: "Applied 2 days ago",
      avatar: "https://picsum.photos/200/300",
      status: "New Applied",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Marvin Wilkins",
      appliedDate: "Applied a week ago",
      avatar: "https://picsum.photos/200/300",
      status: "Screening",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "William Williamson",
      appliedDate: "Applied a week ago",
      avatar: "https://picsum.photos/200/300",
      status: "Interview",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Amelia Manda",
      appliedDate: "Applied 2 days ago",
      avatar: "https://picsum.photos/200/300",
      status: "New Applied",
      actions: ["Conversation", "Archive", "Reject"],
    },
    {
      name: "Cory Stevenson",
      appliedDate: "Applied a week ago",
      avatar: "https://picsum.photos/200/300",
      status: "Screening",
      actions: ["Conversation", "Archive", "Reject"],
    },
  ];
  const [candidates, setCandidates] = useState(candidates_data);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setSearchParams({ filter: filterValue });
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const filter = searchParams.get("filter");
    return !filter || candidate.status === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Senior Product Designer</h2>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2">
            Active
          </button>
          <div className="relative">
            <select
              className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="New Applied">New Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredCandidates.map((candidate, index) => (
          <CandidateCard
            key={index}
            name={candidate.name}
            appliedDate={candidate.appliedDate}
            avatar={candidate.avatar}
            status={candidate.status}
            actions={candidate.actions}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;
