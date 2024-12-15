import {
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const statusColors = {
  Review: {
    border: 'border-blue-600',
    background: 'bg-blue-100',
  },
  Accepted: {
    border: 'border-green-600',
    background: 'bg-green-100',
  },
  Rejected: {
    border: 'border-red-600',
    background: 'bg-red-100',
  },
  // Add more statuses and their colors as needed
}

function CandidateTable({ candidates }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const handleApprove = (index) => {
    const updatedCandidates = [...candidates]
    updatedCandidates[index].isApproved = !updatedCandidates[index].isApproved
    // setCandidates(updatedCandidates);
  }

  return (
    <div>
      <div className=' max-w-7xl mx-auto'>
        <TableContainer>
          <Table className='min-w-full border-2 mb-1 border-black rounded-lg'>
            <TableHead
              sx={{
                backgroundColor: '#E14400',
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  Candidate
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#e3f2fd' }}>
                  Job Title
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#e3f2fd' }}>
                  Applied Date
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#e3f2fd' }}>
                  Location
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#e3f2fd' }}>
                  Contact
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#e3f2fd' }}>
                  Email ID
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#e3f2fd' }}>
                  Stage
                </TableCell>
                <TableCell
                  // align="right"
                  sx={{ fontWeight: 'bold', color: '#e3f2fd' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow
                  key={index}
                  className='text-black hover:bg-blue-100'
                  onClick={() =>
                    navigate(
                      `/employer/dashboard/candidates/manage/${candidate._id}`
                    )
                  }
                  sx={{
                    '&:hover': {
                      '& .MuiTableCell-root': {
                        color: 'black', // Change all TableCell text to black on hover
                      },
                    },
                  }}
                >
                  <TableCell sx={{ color: 'black' }}>
                    {candidate.candidateName}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>
                    {candidate.jobTitle}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>
                    {candidate.location}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>
                    {candidate.contact}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>
                    {candidate.email}
                  </TableCell>
                  <TableCell sx={{ color: 'black' }}>
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
                      title={candidate.isApproved ? 'Disapprove' : 'Approve'}
                    >
                      <IconButton
                        onClick={() => handleApprove(index)}
                        color={candidate.isApproved ? 'success' : 'error'}
                        sx={{ mr: 1 }}
                      >
                        {candidate.isApproved ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='More options'>
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
  )
}

export default CandidateTable
