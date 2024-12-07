import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'

const ViewAssessment = ({ assessment }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      }}
    >
      <CardContent>
        <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#333' }}>
          {assessment.title}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          sx={{ marginBottom: '1rem' }}
        >
          {assessment.description}
        </Typography>

        <Typography
          variant='h6'
          sx={{ fontWeight: 'bold', marginBottom: '8px' }}
        >
          Language:
        </Typography>
        <Typography
          variant='body1'
          sx={{ marginLeft: '1.5rem', color: '#555' }}
        >
          {assessment.language}
        </Typography>

        <Typography
          variant='h6'
          sx={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '8px' }}
        >
          Time Limit:
        </Typography>
        <Typography
          variant='body1'
          sx={{ marginLeft: '1.5rem', color: '#555' }}
        >
          {assessment.timeLimit} minutes
        </Typography>

        <Typography variant='h6' sx={{ fontWeight: 'bold', marginTop: '2rem' }}>
          Problems
        </Typography>

        <List sx={{ marginTop: '1rem' }}>
          {assessment.problems.map((problem, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: '1rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  Problem {index + 1}: {problem.title}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#555', marginTop: '0.5rem' }}
                >
                  <pre>{problem.description}</pre>
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#007bff', marginTop: '0.5rem' }}
                >
                  <pre>{problem.initialCode}</pre>
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ff5722', marginTop: '0.5rem' }}
                >
                  <pre>{problem.testCases}</pre>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default ViewAssessment
