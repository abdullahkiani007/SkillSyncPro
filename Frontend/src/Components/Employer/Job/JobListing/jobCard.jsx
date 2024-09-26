import React from 'react'
import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PeopleIcon from '@mui/icons-material/People'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        color: 'white', // Ensure all text inside the card is white
        width: '100%', // Full width
        background: '#2D4059 ', // Attractive gradient
        borderRadius: '1rem', // Equivalent to `rounded-xl`
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // More pronounced shadow
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effects
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.05)', // Slight scaling on hover
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Larger shadow on hover
        },
        '&:active': {
          transform: 'scale(0.98)', // Scale down on click to give a pressed effect
        },
      }}
      onClick={() => {
        navigate(`../job/${job._id}`)
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Typography
          variant='h6'
          component='div'
          sx={{
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: 'white', // Ensure white text for title
          }}
        >
          {job.title}
        </Typography>

        {/* Description */}
        <Typography
          variant='body2'
          component='p'
          sx={{
            color: 'white', // White text for description
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '1rem',
          }}
        >
          {job.description}
        </Typography>

        {/* Salary and Employment Type */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Typography
            variant='body1'
            component='p'
            sx={{
              fontWeight: 'medium',
              color: 'white', // White text for salary
            }}
          >
            Salary: {job.salaryRange}
          </Typography>
          <Chip
            label={job.employmentType}
            sx={{
              color: 'white', // White text for Chip
              border: '2px solid white',
              padding: '10px 10px',
              textTransform: 'capitalize',
            }}
            variant='outlined'
            size='small'
          />
        </Box>

        {/* Company and Location */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon
              sx={{ marginRight: '0.5rem', color: '#D2E0FB' }}
              fontSize='small'
            />
            <Typography variant='body2' component='p' sx={{ color: 'white' }}>
              {job.companyName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon
              sx={{ marginRight: '0.5rem', color: '#EEDF7A' }}
              fontSize='small'
            />
            <Typography
              variant='body2'
              component='span'
              sx={{ color: 'white' }}
            >
              {job.location}
            </Typography>
          </Box>
        </Box>

        {/* Applicants */}
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <PeopleIcon
            sx={{ marginRight: '0.5rem', color: '#fff' }}
            fontSize='small'
          />
          <Typography variant='body2' component='p' sx={{ color: 'white' }}>
            {job.applicants.length} Applicants
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobCard
