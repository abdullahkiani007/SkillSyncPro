[1mdiff --git a/Backend/Services/user.service.js b/Backend/Services/user.service.js[m
[1mindex 50aafdc..f56cd34 100644[m
[1m--- a/Backend/Services/user.service.js[m
[1m+++ b/Backend/Services/user.service.js[m
[36m@@ -4,6 +4,7 @@[m [mconst AWS = require('aws-sdk');[m
 [m
 [m
 [m
[32m+[m[41m  [m
 const s3 = new AWS.S3();[m
 [m
 [m
[1mdiff --git a/Frontend/src/Components/Jobseeker/Jobs/AppliedJobDetails.jsx b/Frontend/src/Components/Jobseeker/Jobs/AppliedJobDetails.jsx[m
[1mindex e972e3f..70e1ff3 100644[m
[1m--- a/Frontend/src/Components/Jobseeker/Jobs/AppliedJobDetails.jsx[m
[1m+++ b/Frontend/src/Components/Jobseeker/Jobs/AppliedJobDetails.jsx[m
[36m@@ -1,80 +1,116 @@[m
[31m-import React from "react";[m
[31m-import { useLocation } from "react-router-dom";[m
[31m-import { Typography, Container, Paper, Button, Grid, IconButton } from "@mui/material";[m
[31m-import { Description as DescriptionIcon, PlayCircleFilled as VideoIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";[m
[31m-import { styled } from "@mui/material/styles";[m
[32m+[m[32mimport React from 'react'[m
[32m+[m[32mimport { useLocation } from 'react-router-dom'[m
[32m+[m[32mimport {[m
[32m+[m[32m  Typography,[m
[32m+[m[32m  Container,[m
[32m+[m[32m  Paper,[m
[32m+[m[32m  Button,[m
[32m+[m[32m  Grid,[m
[32m+[m[32m  IconButton,[m
[32m+[m[32m} from '@mui/material'[m
[32m+[m[32mimport {[m
[32m+[m[32m  Description as DescriptionIcon,[m
[32m+[m[32m  PlayCircleFilled as VideoIcon,[m
[32m+[m[32m  ArrowBack as ArrowBackIcon,[m
[32m+[m[32m} from '@mui/icons-material'[m
[32m+[m[32mimport { styled } from '@mui/material/styles'[m
 [m
 const StyledPaper = styled(Paper)(({ theme }) => ({[m
   padding: theme.spacing(6),[m
[31m-  background: "linear-gradient(135deg, #f0f0f0 0%, #f7f7f7 100%)",[m
[32m+[m[32m  background: 'linear-gradient(135deg, #f0f0f0 0%, #f7f7f7 100%)',[m
   borderRadius: theme.spacing(3),[m
[31m-  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",[m
[31m-}));[m
[32m+[m[32m  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',[m
[32m+[m[32m}))[m
 [m
 const InfoText = styled(Typography)(({ theme }) => ({[m
   color: theme.palette.text.primary,[m
   fontWeight: 500,[m
   marginBottom: theme.spacing(2),[m
   fontFamily: "'Roboto', sans-serif",[m
[31m-}));[m
[32m+[m[32m}))[m
 [m
 const StyledButton = styled(Button)(({ theme }) => ({[m
[31m-  backgroundColor: "#007bff",[m
[31m-  color: "#fff",[m
[31m-  "&:hover": {[m
[31m-    backgroundColor: "#0056b3",[m
[32m+[m[32m  backgroundColor: '#007bff',[m
[32m+[m[32m  color: '#fff',[m
[32m+[m[32m  '&:hover': {[m
[32m+[m[32m    backgroundColor: '#0056b3',[m
   },[m
[31m-  fontWeight: "bold",[m
[32m+[m[32m  fontWeight: 'bold',[m
   padding: theme.spacing(1.5, 3),[m
   borderRadius: theme.spacing(2),[m
[31m-}));[m
[32m+[m[32m}))[m
 [m
 const IconContainer = styled('div')(({ theme }) => ({[m
   marginTop: theme.spacing(2),[m
[31m-  display: "flex",[m
[31m-  alignItems: "center",[m
[31m-  "& svg": {[m
[31m-    fontSize: "2.5rem",[m
[31m-    color: "#007bff",[m
[31m-    transition: "color 0.3s ease",[m
[32m+[m[32m  display: 'flex',[m
[32m+[m[32m  alignItems: 'center',[m
[32m+[m[32m  '& svg': {[m
[32m+[m[32m    fontSize: '2.5rem',[m
[32m+[m[32m    color: '#007bff',[m
[32m+[m[32m    transition: 'color 0.3s ease',[m
   },[m
[31m-  "&:hover svg": {[m
[31m-    color: "#0056b3",[m
[32m+[m[32m  '&:hover svg': {[m
[32m+[m[32m    color: '#0056b3',[m
   },[m
[31m-}));[m
[32m+[m[32m}))[m
 [m
 const JobDetails = () => {[m
[31m-  const location = useLocation();[m
[31m-  const { job } = location.state; // Access job data passed from AppliedJobs component[m
[32m+[m[32m  const location = useLocation()[m
[32m+[m[32m  const { job } = location.state // Access job data passed from AppliedJobs component[m
 [m
   return ([m
[31m-    <Container maxWidth="md" style={{ marginTop: "2rem" }}>[m
[32m+[m[32m    <Container maxWidth='md' style={{ marginTop: '2rem' }}>[m
       <StyledPaper elevation={3}>[m
[31m-        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>[m
[32m+[m[32m        <Typography[m
[32m+[m[32m          variant='h4'[m
[32m+[m[32m          align='center'[m
[32m+[m[32m          gutterBottom[m
[32m+[m[32m          style={{ fontWeight: 'bold', color: '#333' }}[m
[32m+[m[32m        >[m
           Application Details[m
         </Typography>[m
 [m
[31m-        <Grid container spacing={4} style={{ marginTop: "1.5rem" }}>[m
[32m+[m[32m        <Grid container spacing={4} style={{ marginTop: '1.5rem' }}>[m
           <Grid item xs={12} sm={6}>[m
[31m-            <InfoText variant="h6" style={{ color: "#007bff" }}>Job Title: {job.title}</InfoText>[m
[31m-            <InfoText variant="body1">Company: {job.company}</InfoText>[m
[31m-            <InfoText variant="body1">Location: {job.location}</InfoText>[m
[31m-            <InfoText variant="body1">Status: {job.status}</InfoText>[m
[31m-            <InfoText variant="body1">Applied On: {new Date(job.appliedAt).toLocaleDateString()}</InfoText>[m
[32m+[m[32m            <InfoText variant='h6' style={{ color: '#007bff' }}>[m
[32m+[m[32m              Job Title: {job.title}[m
[32m+[m[32m            </InfoText>[m
[32m+[m[32m            <InfoText variant='body1'>Company: {job.company}</InfoText>[m
[32m+[m[32m            <InfoText variant='body1'>Location: {job.location}</InfoText>[m
[32m+[m[32m            <InfoText variant='body1'>Status: {job.status}</InfoText>[m
[32m+[m[32m            <InfoText variant='body1'>[m
[32m+[m[32m              Applied On: {new Date(job.appliedAt).toLocaleDateString()}[m
[32m+[m[32m            </InfoText>[m
           </Grid>[m
 [m
           <Grid item xs={12} sm={6}>[m
[31m-            <InfoText variant="body1" style={{ fontWeight: "bold" }}>Description:</InfoText>[m
[31m-            <Typography variant="body2" color="textSecondary" gutterBottom style={{ fontStyle: "italic", lineHeight: 1.6 }}>[m
[32m+[m[32m            <InfoText variant='body1' style={{ fontWeight: 'bold' }}>[m
[32m+[m[32m              Description:[m
[32m+[m[32m            </InfoText>[m
[32m+[m[32m            <Typography[m
[32m+[m[32m              variant='body2'[m
[32m+[m[32m              color='textSecondary'[m
[32m+[m[32m              gutterBottom[m
[32m+[m[32m              style={{ fontStyle: 'italic', lineHeight: 1.6 }}[m
[32m+[m[32m            >[m
               {job.description}[m
             </Typography>[m
 [m
             {job.resume && ([m
               <IconContainer>[m
[31m-                <IconButton href={job.resume} target="_blank" rel="noopener noreferrer" color="primary">[m
[32m+[m[32m                <IconButton[m
[32m+[m[32m                  href={job.resume}[m
[32m+[m[32m                  target='_blank'[m
[32m+[m[32m                  rel='noopener noreferrer'[m
[32m+[m[32m                  color='primary'[m
[32m+[m[32m                >[m
                   <DescriptionIcon />[m
                 </IconButton>[m
[31m-                <Typography display="inline" variant="body1" style={{ marginLeft: "8px", fontWeight: 500 }}>[m
[32m+[m[32m                <Typography[m
[32m+[m[32m                  display='inline'[m
[32m+[m[32m                  variant='body1'[m
[32m+[m[32m                  style={{ marginLeft: '8px', fontWeight: 500 }}[m
[32m+[m[32m                >[m
                   View Resume[m
                 </Typography>[m
               </IconContainer>[m
[36m@@ -82,10 +118,19 @@[m [mconst JobDetails = () => {[m
 [m
             {job.videoIntroduction && ([m
               <IconContainer>[m
[31m-                <IconButton href={job.videoIntroduction} target="_blank" rel="noopener noreferrer" color="secondary">[m
[32m+[m[32m                <IconButton[m
[32m+[m[32m                  href={job.videoIntroduction}[m
[32m+[m[32m                  target='_blank'[m
[32m+[m[32m                  rel='noopener noreferrer'[m
[32m+[m[32m                  color='secondary'[m
[32m+[m[32m                >[m
                   <VideoIcon />[m
                 </IconButton>[m
[31m-                <Typography display="inline" variant="body1" style={{ marginLeft: "8px", fontWeight: 500 }}>[m
[32m+[m[32m                <Typography[m
[32m+[m[32m                  display='inline'[m
[32m+[m[32m                  variant='body1'[m
[32m+[m[32m                  style={{ marginLeft: '8px', fontWeight: 500 }}[m
[32m+[m[32m                >[m
                   Watch Video Introduction[m
                 </Typography>[m
               </IconContainer>[m
[36m@@ -93,19 +138,19 @@[m [mconst JobDetails = () => {[m
           </Grid>[m
         </Grid>[m
 [m
[31m-        <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>[m
[32m+[m[32m        <Grid container justifyContent='center' style={{ marginTop: '2rem' }}>[m
           <StyledButton[m
             startIcon={<ArrowBackIcon />}[m
             onClick={() => window.history.back()}[m
[31m-            size="large"[m
[31m-            variant="contained"[m
[32m+[m[32m            size='large'[m
[32m+[m[32m            variant='contained'[m
           >[m
             Go Back[m
           </StyledButton>[m
         </Grid>[m
       </StyledPaper>[m
     </Container>[m
[31m-  );[m
[31m-};[m
[32m+[m[32m  )[m
[32m+[m[32m}[m
 [m
[31m-export default JobDetails;[m
[32m+[m[32mexport default JobDetails[m
[1mdiff --git a/Frontend/src/Components/Jobseeker/Jobs/JobApplication/VideoInterview.jsx b/Frontend/src/Components/Jobseeker/Jobs/JobApplication/VideoInterview.jsx[m
[1mindex 775e6cf..6233bd8 100644[m
[1m--- a/Frontend/src/Components/Jobseeker/Jobs/JobApplication/VideoInterview.jsx[m
[1m+++ b/Frontend/src/Components/Jobseeker/Jobs/JobApplication/VideoInterview.jsx[m
[36m@@ -118,14 +118,9 @@[m [mconst VideoInterview = () => {[m
   const handleSubmit = async () => {[m
     console.log("Submitting interview to backend...");[m
     console.log("timer", timer)[m
[31m-    if (!videoBlobUrl || !audioBlobUrl) {[m
[31m-      console.error("Video or Audio Blob URL is undefined");[m
[31m-      return;[m
[32m+[m[32m    if (timer < 120){[m
[32m+[m[32m      setError("You Interview must be atleast of 2 minute")[m
     }[m
[31m-    [m
[31m-    // if (timer < 120){[m
[31m-    //   setError("You Interview must be atleast of 2 minute")[m
[31m-    // }[m
     // setIsProcessing(true);[m
 [m
     console.log("Audio blob url ", audioBlobUrl , "VideoBlob url", videoBlobUrl)[m
[36m@@ -284,7 +279,7 @@[m [mconst VideoInterview = () => {[m
             onClick={handleNextQuestion}[m
             variant="contained"[m
             color="primary"[m
[31m-            disabled={currentQuestion === questions.length }[m
[32m+[m[32m            disabled={currentQuestion === questions.length - 1}[m
           >[m
             Next Question[m
           </Button>[m
[1mdiff --git a/Frontend/src/Components/Jobseeker/Jobs/appliedJobs.jsx b/Frontend/src/Components/Jobseeker/Jobs/appliedJobs.jsx[m
[1mindex 3a59402..4168c5a 100644[m
[1m--- a/Frontend/src/Components/Jobseeker/Jobs/appliedJobs.jsx[m
[1m+++ b/Frontend/src/Components/Jobseeker/Jobs/appliedJobs.jsx[m
[36m@@ -1,4 +1,4 @@[m
[31m-import React, { useState, useEffect } from "react";[m
[32m+[m[32mimport React, { useState, useEffect } from 'react'[m
 import {[m
   Typography,[m
   Container,[m
[36m@@ -10,10 +10,36 @@[m [mimport {[m
   TableRow,[m
   Paper,[m
   Button,[m
[31m-} from "@mui/material";[m
[31m-import { useNavigate } from "react-router-dom";[m
[31m-import jobseeker from "../../../API/jobseeker";[m
[31m-import { useSelector } from "react-redux";[m
[32m+[m[32m  IconButton,[m
[32m+[m[32m} from '@mui/material'[m
[32m+[m[32mimport { useNavigate } from 'react-router-dom'[m
[32m+[m[32mimport jobseeker from '../../../API/jobseeker'[m
[32m+[m[32mimport { useSelector } from 'react-redux'[m
[32m+[m[32mimport {[m
[32m+[m[32m  Work as WorkIcon,[m
[32m+[m[32m  Business as BusinessIcon,[m
[32m+[m[32m  LocationOn as LocationIcon,[m
[32m+[m[32m  Event as DateIcon,[m
[32m+[m[32m  AssignmentTurnedIn as StatusIcon,[m
[32m+[m[32m} from '@mui/icons-material'[m
[32m+[m[32mimport { styled } from '@mui/material/styles'[m
[32m+[m
[32m+[m[32m// Styled Footer Component[m
[32m+[m[32mconst Footer = styled('footer')(({ theme }) => ({[m
[32m+[m[32m  backgroundColor: '#333',[m
[32m+[m[32m  color: '#fff',[m
[32m+[m[32m  padding: theme.spacing(4),[m
[32m+[m[32m  marginTop: theme.spacing(5),[m
[32m+[m[32m  textAlign: 'center',[m
[32m+[m[32m  '& a': {[m
[32m+[m[32m    color: '#007bff',[m
[32m+[m[32m    textDecoration: 'none',[m
[32m+[m[32m    '&:hover': {[m
[32m+[m[32m      textDecoration: 'underline',[m
[32m+[m[32m      color: '#0056b3',[m
[32m+[m[32m    },[m
[32m+[m[32m  },[m
[32m+[m[32m}))[m
 [m
 const AppliedJobs = () => {[m
   const navigate = useNavigate()[m
[36m@@ -23,20 +49,20 @@[m [mconst AppliedJobs = () => {[m
 [m
   useEffect(() => {[m
     const getAllJobs = async () => {[m
[31m-      const token = localStorage.getItem("accessToken");[m
[31m-      const response = await jobseeker.getAppliedJobs(token);[m
[31m-      console.log("Applied jobs", response)[m
[32m+[m[32m      const token = localStorage.getItem('accessToken')[m
[32m+[m[32m      const response = await jobseeker.getAppliedJobs(token)[m
[32m+[m[32m      console.log('Applied jobs', response)[m
       if (response.status === 200) {[m
[31m-        setJobs(response.data.jobs);[m
[32m+[m[32m        setJobs(response.data.jobs)[m
       }[m
[31m-    };[m
[31m-    getAllJobs();[m
[31m-  }, []);[m
[32m+[m[32m    }[m
[32m+[m[32m    getAllJobs()[m
[32m+[m[32m  }, [])[m
 [m
   if (!jobs || jobs.length === 0) {[m
     return ([m
[31m-      <div className="mt-20 flex flex-col justify-center items-center">[m
[31m-        <Typography variant="h3" align="center" gutterBottom>[m
[32m+[m[32m      <div className='mt-20 flex flex-col justify-center items-center'>[m
[32m+[m[32m        <Typography variant='h3' align='center' gutterBottom>[m
           No Applied Jobs[m
         </Typography>[m
         <Button[m
[36m@@ -51,47 +77,84 @@[m [mconst AppliedJobs = () => {[m
   }[m
 [m
   return ([m
[31m-    <Container maxWidth="lg" className="mt-10">[m
[31m-      <Typography variant="h4" align="center" gutterBottom>[m
[31m-        Applied Jobs[m
[31m-      </Typography>[m
[31m-      <TableContainer component={Paper}>[m
[31m-        <Table aria-label="applied jobs table">[m
[31m-          <TableHead>[m
[31m-            <TableRow>[m
[31m-              <TableCell><strong>Job Title</strong></TableCell>[m
[31m-              <TableCell><strong>Company</strong></TableCell>[m
[31m-              <TableCell><strong>Location</strong></TableCell>[m
[31m-              <TableCell><strong>Date Applied</strong></TableCell>[m
[31m-              <TableCell><strong>Status</strong></TableCell>[m
[31m-              <TableCell align="center"><strong>Actions</strong></TableCell>[m
[31m-            </TableRow>[m
[31m-          </TableHead>[m
[31m-          <TableBody>[m
[31m-            {jobs.map((job) => ([m
[31m-              <TableRow key={job.jobId} hover>[m
[31m-                <TableCell>{job.title}</TableCell>[m
[31m-                <TableCell>{job.company}</TableCell>[m
[31m-                <TableCell>{job.location}</TableCell>[m
[31m-                <TableCell>{new Date(job.appliedAt).toLocaleDateString()}</TableCell>[m
[31m-                <TableCell>{job.status}</TableCell>[m
[31m-                <TableCell align="center">[m
[31m-                  <Button[m
[31m-                    variant="outlined"[m
[31m-                    color="primary"[m
[31m-                    onClick={() =>[m
[31m-                      navigate("/jobseeker/job-details", { state: { job } })[m
[31m-                    }[m
[31m-                  >[m
[31m-                    View Details[m
[31m-                  </Button>[m
[32m+[m[32m    <>[m
[32m+[m[32m      <Container maxWidth='lg' className='mt-10 min-h-screen'>[m
[32m+[m[32m        <Typography variant='h4' align='center' gutterBottom>[m
[32m+[m[32m          Applied Jobs[m
[32m+[m[32m        </Typography>[m
[32m+[m[32m        <TableContainer component={Paper}>[m
[32m+[m[32m          <Table aria-label='applied jobs table'>[m
[32m+[m[32m            <TableHead>[m
[32m+[m[32m              <TableRow>[m
[32m+[m[32m                <TableCell>[m
[32m+[m[32m                  <strong>[m
[32m+[m[32m                    <WorkIcon fontSize='small' /> Job Title[m
[32m+[m[32m                  </strong>[m
[32m+[m[32m                </TableCell>[m
[32m+[m[32m                <TableCell>[m
[32m+[m[32m                  <strong>[m
[32m+[m[32m                    <BusinessIcon fontSize='small' /> Company[m
[32m+[m[32m                  </strong>[m
[32m+[m[32m                </TableCell>[m
[32m+[m[32m                <TableCell>[m
[32m+[m[32m                  <strong>[m
[32m+[m[32m                    <LocationIcon fontSize='small' /> Location[m
[32m+[m[32m                  </strong>[m
[32m+[m[32m                </TableCell>[m
[32m+[m[32m                <TableCell>[m
[32m+[m[32m                  <strong>[m
[32m+[m[32m                    <DateIcon fontSize='small' /> Date Applied[m
[32m+[m[32m                  </strong>[m
[32m+[m[32m                </TableCell>[m
[32m+[m[32m                <TableCell>[m
[32m+[m[32m                  <strong>[m
[32m+[m[32m                    <StatusIcon fontSize='small' /> Status[m
[32m+[m[32m                  </strong>[m
[32m+[m[32m                </TableCell>[m
[32m+[m[32m                <TableCell align='center'>[m
[32m+[m[32m                  <strong>Actions</strong>[m
                 </TableCell>[m
               </TableRow>[m
[31m-            ))}[m
[31m-          </TableBody>[m
[31m-        </Table>[m
[31m-      </TableContainer>[m
[31m-    </Container>[m
[32m+[m[32m            </TableHead>[m
[32m+[m[32m            <TableBody>[m
[32m+[m[32m              {jobs.map((job) => ([m
[32m+[m[32m                <TableRow key={job.jobId} hover>[m
[32m+[m[32m                  <TableCell>{job.title}</TableCell>[m
[32m+[m[32m                  <TableCell>{job.company}</TableCell>[m
[32m+[m[32m                  <TableCell>{job.location}</TableCell>[m
[32m+[m[32m                  <TableCell>[m
[32m+[m[32m                    {new Date(job.appliedAt).toLocaleDateString()}[m
[32m+[m[32m                  </TableCell>[m
[32m+[m[32m                  <TableCell>{job.status}</TableCell>[m
[32m+[m[32m                  <TableCell align='center'>[m
[32m+[m[32m                    <Button[m
[32m+[m[32m                      variant='outlined'[m
[32m+[m[32m                      color='primary'[m
[32m+[m[32m                      onClick={() =>[m
[32m+[m[32m                        navigate('/jobseeker/job-details', { state: { job } })[m
[32m+[m[32m                      }[m
[32m+[m[32m                    >[m
[32m+[m[32m                      View Details[m
[32m+[m[32m                    </Button>[m
[32m+[m[32m                  </TableCell>[m
[32m+[m[32m                </TableRow>[m
[32m+[m[32m              ))}[m
[32m+[m[32m            </TableBody>[m
[32m+[m[32m          </Table>[m
[32m+[m[32m        </TableContainer>[m
[32m+[m[32m      </Container>[m
[32m+[m
[32m+[m[32m      {/* Footer */}[m
[32m+[m[32m      <Footer>[m
[32m+[m[32m        <Typography variant='body1'>[m
[32m+[m[32m          &copy; {new Date().getFullYear()} SkillSync Pro. All Rights Reserved.[m
[32m+[m[32m    