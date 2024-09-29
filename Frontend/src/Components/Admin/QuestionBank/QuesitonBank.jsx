// src/components/QuestionBank.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  IconButton,
  InputLabel,
  FormControl,
  Grid,
  Container,
  Box,
} from '@mui/material';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const QuestionBank = () => {
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [problems, setProblems] = useState([{ problem: '', testCases: '' }]);
  const [questions, setQuestions] = useState([]);

  const roles = ['Developer', 'DevOps Engineer', 'Data Scientist']; // Example roles
  const difficulties = ['Easy', 'Medium', 'Hard']; // Example difficulties

  // Fetch questions based on the selected role
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`/api/question-bank/${role}`);
      setQuestions(response.data.data.problems);
    } catch (error) {
      console.error('Error fetching questions', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitQuestions(); // Call the function to submit questions
  };

  // Function to submit questions to the backend
  const submitQuestions = async () => {
    try {
      await axios.post('/api/question-bank', {
        role,
        problems,
      });
      setProblems([{ problem: '', testCases: '' }]); // Reset problems
      setDifficulty('');
      fetchQuestions(); // Refresh the question list
    } catch (error) {
      console.error('Error creating question bank entry', error);
    }
  };

  // Fetch questions when role changes
  useEffect(() => {
    if (role) {
      fetchQuestions();
    }
  }, [role]);

  // Handle adding a new problem
  const addProblem = () => {
    setProblems([...problems, { problem: '', testCases: '' }]);
  };

  // Handle removing a problem
  const removeProblem = (index) => {
    const newProblems = [...problems];
    newProblems.splice(index, 1);
    setProblems(newProblems);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Question Bank
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow-md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                displayEmpty
                label="Role"
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {roles.map((roleOption, index) => (
                  <MenuItem key={index} value={roleOption}>
                    {roleOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficulty}
                label="Difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
                required
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Difficulty
                </MenuItem>
                {difficulties.map((difficultyOption, index) => (
                  <MenuItem key={index} value={difficultyOption}>
                    {difficultyOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {problems.map((problemItem, index) => (
          <Card key={index} className="p-4 mb-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Problem {index + 1}
              </Typography>
              <Editor
                height="150px"
                theme='vs-dark'
                defaultLanguage="javascript"
                value={problemItem.problem}
                onChange={(value) => {
                  const newProblems = [...problems];
                  newProblems[index].problem = value;
                  setProblems(newProblems);
                }}
                options={{
                  minimap: { enabled: false },
                  automaticLayout: true,
                }}
              />
              <Typography variant="h6" gutterBottom className="mt-4">
                Test Cases
              </Typography>
              <Editor
                height="150px"
                defaultLanguage="javascript"
                value={problemItem.testCases}
                onChange={(value) => {
                  const newProblems = [...problems];
                  newProblems[index].testCases = value;
                  setProblems(newProblems);
                }}
                options={{
                  minimap: { enabled: false },
                  automaticLayout: true,
                }}
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <IconButton onClick={() => removeProblem(index)} color="error">
                  <RemoveCircleIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton onClick={addProblem} color="primary">
            <AddCircleIcon />
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" color="primary" type="submit">
            Create Question
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {questions.map((question, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="bg-blue-100 shadow-lg">
              <CardContent>
                <Typography variant="h6" component="div">
                  Problem: {question.problem}
                </Typography>
                <Typography color="text.secondary">
                  Difficulty: {question.difficulty}
                </Typography>
                <Typography color="text.secondary">
                  Test Cases: {question.testCases}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QuestionBank;
