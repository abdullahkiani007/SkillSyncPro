import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  IconButton,
} from '@mui/material'
import {
  Description as DescriptionIcon,
  PlayCircleFilled as VideoIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'linear-gradient(135deg, #f0f0f0 0%, #f7f7f7 100%)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
}))

const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  fontFamily: "'Roboto', sans-serif",
}))

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#007bff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(2),
}))

const IconContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    fontSize: '2.5rem',
    color: '#007bff',
    transition: 'color 0.3s ease',
  },
  '&:hover svg': {
    color: '#0056b3',
  },
}))

const JobDetails = () => {
  const location = useLocation()
  const { job } = location.state // Access job data passed from AppliedJobs component

  return (
    <Container maxWidth='md' style={{ marginTop: '2rem' }}>
      <StyledPaper elevation={3}>
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          style={{ fontWeight: 'bold', color: '#333' }}
        >
          Application Details
        </Typography>

        <Grid container spacing={4} style={{ marginTop: '1.5rem' }}>
          <Grid item xs={12} sm={6}>
            <InfoText variant='h6' style={{ color: '#007bff' }}>
              Job Title: {job.title}
            </InfoText>
            <InfoText variant='body1'>Company: {job.company}</InfoText>
            <InfoText variant='body1'>Location: {job.location}</InfoText>
            <InfoText variant='body1'>Status: {job.status}</InfoText>
            <InfoText variant='body1'>
              Applied On: {new Date(job.appliedAt).toLocaleDateString()}
            </InfoText>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoText variant='body1' style={{ fontWeight: 'bold' }}>
              Description:
            </InfoText>
            <Typography
              variant='body2'
              color='textSecondary'
              gutterBottom
              style={{ fontStyle: 'italic', lineHeight: 1.6 }}
            >
              {job.description}
            </Typography>

            {job.resume && (
              <IconContainer>
                <IconButton
                  href={job.resume}
                  target='_blank'
                  rel='noopener noreferrer'
                  color='primary'
                >
                  <DescriptionIcon />
                </IconButton>
                <Typography
                  display='inline'
                  variant='body1'
                  style={{ marginLeft: '8px', fontWeight: 500 }}
                >
                  View Resume
                </Typography>
              </IconContainer>
            )}

            {job.videoIntroduction && (
              <IconContainer>
                <IconButton
                  href={job.videoIntroduction}
                  target='_blank'
                  rel='noopener noreferrer'
                  color='secondary'
                >
                  <VideoIcon />
                </IconButton>
                <Typography
                  display='inline'
                  variant='body1'
                  style={{ marginLeft: '8px', fontWeight: 500 }}
                >
                  Watch Video Introduction
                </Typography>
              </IconContainer>
            )}
          </Grid>
        </Grid>

        <Grid container justifyContent='center' style={{ marginTop: '2rem' }}>
          <StyledButton
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            size='large'
            variant='contained'
          >
            Go Back
          </StyledButton>
        </Grid>
      </StyledPaper>
    </Container>
  )
}

export default JobDetails
