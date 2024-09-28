import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, useOutletContext } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import { HiArchive } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../../../../assets/placeholderImage_person.jpg";

const CandidateCard = ({ name, appliedDate, avatar, status, recommendationScore }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex items-center">
        <img
          src={avatar || placeholderImage}
          alt={name}
          className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500 shadow-sm"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <p className="text-gray-500">{new Date(appliedDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Status:</span>
          <span
            className={`px-3 py-1 rounded-md text-white font-semibold ${
              status === "Accepted"
                ? "bg-green-500"
                : status === "Rejected"
                ? "bg-red-500"
                : status === "Interview Scheduled"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="text-gray-500 flex items-center space-x-2 text-sm">
          <span>Recommendation:</span>
          <span className="text-xl font-bold text-blue-500">{recommendationScore.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center group relative hover:bg-blue-600 transition-all">
          <FiMessageCircle size={20} />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Send Message
          </span>
        </button>
        <button className="bg-gray-300 text-gray-600 rounded-md px-4 py-2 flex items-center group relative hover:bg-gray-400 transition-all">
          <HiArchive size={20} />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Archive
          </span>
        </button>
      </div>
    </div>
  );
};

const Candidates = () => {
  const { candidatesList } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [jobId, setJobId] = useState(params.id);

  const [candidates, setCandidates] = useState(candidatesList);
  const [sortOrder, setSortOrder] = useState("asc"); // Ascending by default

  const navigate = useNavigate();

  // Function to handle sorting candidates by recommendation score
  const handleSortChange = () => {
    const sortedCandidates = [...candidates].sort((a, b) => {
      return sortOrder === "asc"
        ? a.recommendationScore - b.recommendationScore
        : b.recommendationScore - a.recommendationScore;
    });
    setCandidates(sortedCandidates);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setSearchParams({ filter: filterValue });
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const filter = searchParams.get("filter");
    return !filter || candidate.stage === filter;
  });

  useEffect(() => {
    console.log("Fetching candidates for job id: ", jobId);
  }, [jobId]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <div className="flex items-center space-x-4">
  <div className="relative">
    <select
      className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-all"
      onChange={handleFilterChange}
    >
      <option value="">All Stages</option>
      <option value="Under Review">Under Review</option>
      <option value="Interview Scheduled">Interview Scheduled</option>
      <option value="Rejected">Rejected</option>
      <option value="Accepted">Accepted</option>
    </select>
    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 7l3-3 3 3m0 6l-3 3-3-3" clipRule="evenodd" />
      </svg>
    </span>
  </div>
  
  <button
    className="bg-blue-600 text-white rounded-full px-6 py-2 font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
    onClick={handleSortChange}
  >
    Sort by Recommendation {sortOrder === "asc" ? "↑" : "↓"}
  </button>
</div>

      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredCandidates.map((candidate, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`../dashboard/candidates/manage/${candidate._id}`);
            }}
          >
            <CandidateCard
              key={index}
              name={candidate.candidateName}
              appliedDate={candidate.appliedDate}
              avatar={candidate.avatar}
              status={candidate.stage}
              recommendationScore={candidate.recommendationScore}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
