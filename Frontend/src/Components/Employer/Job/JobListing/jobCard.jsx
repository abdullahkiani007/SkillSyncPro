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
        width: '100%',
        maxWidth: '24rem', // Equivalent to `max-w-sm`
        backgroundColor: '#E14411', // Your custom primary color
        borderRadius: '1rem', // Equivalent to `rounded-xl`
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', // Equivalent to `shadow-sm`
        transition: 'box-shadow 0.3s', // Equivalent to `transition-shadow duration-300`
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Equivalent to `hover:shadow-md`
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
            />{' '}
            {/* Blue color for WorkIcon */}
            <Typography variant='body2' component='p' sx={{ color: 'white' }}>
              {job.companyName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon
              sx={{ marginRight: '0.5rem', color: '#EEDF7A' }}
              fontSize='small'
            />{' '}
            {/* Green color for LocationOnIcon */}
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
            sx={{ marginRight: '0.5rem', color: '#001F3F' }}
            fontSize='small'
          />{' '}
          {/* Purple color for PeopleIcon */}
          <Typography variant='body2' component='p' sx={{ color: 'white' }}>
            {job.applicants.length} Applicants
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobCard
