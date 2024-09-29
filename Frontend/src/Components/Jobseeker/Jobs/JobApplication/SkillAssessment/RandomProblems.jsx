import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

const RandomProblems = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobDescription } = useOutletContext();
  const [application_id, setApplication_id] = useState(localStorage.getItem("application_id"));


  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('job_description', jobDescription);
        const response = await axios.post('http://localhost:8000/generate_problems/', formData);
        const problemsWithCode = response.data.problems.map(problem => ({
          ...problem,
          userCode: problem.initialCode || '', // Initialize userCode with initialCode or empty string
        }));
        setProblems(problemsWithCode);
      } catch (error) {
        setError('Failed to fetch problems');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [jobDescription]);

  const handleProblemSelect = (index) => {
    setSelectedProblemIndex(index);
  };

  const handleCodeChange = (value) => {
    setProblems(prevProblems => {
      const updatedProblems = [...prevProblems];
      updatedProblems[selectedProblemIndex].userCode = value;
      return updatedProblems;
    });
  };

  const handleSubmit = async () => {
    try {
      // Construct the problems array to send
      const problemsToSubmit = problems.map((problem) => ({
        title: problem.title,
        description: problem.description,
        initialCode: problem.initialCode,
        userCode: problem.userCode,
        language: problem.language,
      }));
  
    console.log(JSON.stringify(problemsToSubmit, null, 2));
    const formData = new FormData();
    formData.append('problems', JSON.stringify(problemsToSubmit));
    formData.append('application_id', application_id);

      // Make a POST request with JSON payload
      const response = await axios.post('http://localhost:8000/submit_solutions', formData);
  
      setSubmissionResult(response.data);
    } catch (error) {
      console.error('Error submitting solutions:', error);
      setSubmissionResult({ error: 'Submission failed' });
    }
  };
  
  

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Random Problems
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!loading && !error && (
        <Grid container spacing={4}>
          {problems.map((problem, index) => (
            <Grid item xs={12} sm={6} md={4} key={problem.title}>
              <Card>
                <CardActionArea onClick={() => handleProblemSelect(index)}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {problem.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {problem.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedProblemIndex !== null && (
        <Box mt={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Solving: {problems[selectedProblemIndex].title}
          </Typography>
          <Editor
            height="400px"
            theme="vs-dark"
            language={problems[selectedProblemIndex].language.toLowerCase()}
            value={problems[selectedProblemIndex].userCode}
            onChange={handleCodeChange}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
            }}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Solutions
            </Button>
          </Box>
        </Box>
      )}

      {submissionResult && (
        <Box mt={4}>
          <Typography variant="h5" component="h3">
            Submission Result:
          </Typography>
          <Alert severity={submissionResult.error ? 'error' : 'success'}>
            <pre>{JSON.stringify(submissionResult, null, 2)}</pre>
          </Alert>
        </Box>
      )}
    </Container>
  );
};

export default RandomProblems;