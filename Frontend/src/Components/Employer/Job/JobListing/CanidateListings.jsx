import React, { useState , useEffect } from "react";
import { useSearchParams , useParams  , useOutletContext} from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import { HiArchive } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../../../../assets/placeholderImage_person.jpg"


const CandidateCard = ({ name, appliedDate, avatar, status}) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 flex flex-col justify-between">
      <div className="flex items-center">
        <img src={avatar || placeholderImage} alt={name} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-500">{new Date(appliedDate).toLocaleDateString()}</p>
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
          <button
            className="bg-blue-500 text-white rounded-md px-2 py-1 mr-2 relative group"
          >
            <FiMessageCircle />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Send Message
            </span>
          </button>
          <button
            className="bg-gray-200 text-gray-500 rounded-md px-2 py-1 relative group"
            onClick={() => {
              // Add your onClick logic here
            }}
          >
            <HiArchive />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Archive
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Candidates = () => {
  const {candidatesList} = useOutletContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [jobId, setJobId] = useState(params.id);

  console.log("Candidates list : ", candidatesList);

  useEffect(() => {
    console.log("Fetching candidates for job id: ", jobId);
  },[jobId])

  
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(candidatesList);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setSearchParams({ filter: filterValue });
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const filter = searchParams.get("filter");
    return !filter || candidate.stage === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2">
            Active
          </button>
          <div className="relative">
            <select
              className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 mr-2"
              onChange={handleFilterChange}
            >
              {/* 'Applied', 'Under Review', 'Interview Scheduled', 'Rejected', 'Accepted' */}
              <option value="">All</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredCandidates.map((candidate, index) => (
          <div key={index}
            onClick={() => {
              navigate(`../dashboard/candidates/manage/${candidate._id}`)}}
  
          >

            <CandidateCard
              key={index}
              name={candidate.candidateName}
              appliedDate={candidate.appliedDate}
              avatar={candidate.avatar}
              status={candidate.stage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
