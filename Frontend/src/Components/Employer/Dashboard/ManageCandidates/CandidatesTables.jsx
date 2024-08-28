import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const statusColors = {
  Review: {
    border: "border-blue-600",
    background: "bg-blue-100",
  },
  Accepted: {
    border: "border-green-600",
    background: "bg-green-100",
  },
  Rejected: {
    border: "border-red-600",
    background: "bg-red-100",
  },
  // Add more statuses and their colors as needed
};

function CandidateTable({ candidates }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleApprove = (index) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index].isApproved = !updatedCandidates[index].isApproved;
    // setCandidates(updatedCandidates);
  };

  return (
    <div>
      <div className="overflow-x-scroll">
        <TableContainer>
          <Table className="min-w-full">
            <TableHead
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#e3f2fd" }}>
                  Candidate
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#e3f2fd" }}>
                  Department
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#e3f2fd" }}>
                  Applied Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#e3f2fd" }}>
                  Location
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#e3f2fd" }}>
                  Contact
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#e3f2fd" }}>
                  Email ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#e3f2fd" }}>
                  Stage
                </TableCell>
                <TableCell
                  // align="right"
                  sx={{ fontWeight: "bold", color: "#e3f2fd" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-blue-50"
                  onClick={() =>
                    navigate(`/employer/dashboard/candidates/manage/${index}`)
                  }
                >
                  <TableCell>{candidate.candidate}</TableCell>
                  <TableCell>{candidate.department}</TableCell>
                  <TableCell>{candidate.appliedDate}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell>{candidate.contact}</TableCell>
                  <TableCell>{candidate.emailId}</TableCell>
                  <TableCell>
                    <p
                      className={`border w-fit px-2 py-1 rounded ${
                        statusColors[candidate.stage]?.border
                      } ${statusColors[candidate.stage]?.background}`}
                    >
                      {candidate.stage}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={candidate.isApproved ? "Disapprove" : "Approve"}
                    >
                      <IconButton
                        onClick={() => handleApprove(index)}
                        color={candidate.isApproved ? "success" : "error"}
                        sx={{ mr: 1 }}
                      >
                        {candidate.isApproved ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More options">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default CandidateTable;
