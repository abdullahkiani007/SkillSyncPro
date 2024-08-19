import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Tooltip,
  IconButton,
  Box,
  Divider,
  Card,
  CardContent,
  CardActions,
  Alert,
  AlertTitle,
  Slide,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import employer from "../../../API/employer";

const CreateAssessmentForm = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState({
    title: "",
    description: "",
    language: "javascript",
    timeLimit: 5,
    problems: [],
  });

  const [editingProblem, setEditingProblem] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    initialCode: `// Example: Function to reverse a string
function reverseString(str) {
  // Your code here
  return str.split('').reverse().join('');
}
`,
    testCases: `/* 
// Example Test Cases

console.assert(reverseString("hello") === "olleh", "Test Case 1 Failed");
console.assert(reverseString("world") === "dlrow", "Test Case 2 Failed");
console.assert(reverseString("OpenAI") === "IAnepO", "Test Case 3 Failed");
*/
`,
  });

  const [isAddingProblem, setIsAddingProblem] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessment((prev) => ({ ...prev, [name]: value }));
  };

  const handleProblemChange = (name, value) => {
    setEditingProblem((prev) => ({ ...prev, [name]: value }));
  };

  const addProblem = () => {
    setAssessment((prev) => ({
      ...prev,
      problems: [...prev.problems, editingProblem],
    }));
    resetEditingProblem();
  };

  const editProblem = (problem) => {
    setEditingProblem(problem);
    setIsAddingProblem(true);
    setIsEditing(true);
  };

  const saveEditedProblem = () => {
    setAssessment((prev) => ({
      ...prev,
      problems: prev.problems.map((problem) =>
        problem.id === editingProblem.id ? editingProblem : problem
      ),
    }));
    resetEditingProblem();
  };

  const resetEditingProblem = () => {
    setEditingProblem({
      id: uuidv4(),
      title: "",
      description: "",
      initialCode: `// Example: Function to reverse a string
function reverseString(str) {
  // Your code here
  return str.split('').reverse().join('');
}
`,
      testCases: `/* 
// Example Test Cases

console.assert(reverseString("hello") === "olleh", "Test Case 1 Failed");
console.assert(reverseString("world") === "dlrow", "Test Case 2 Failed");
console.assert(reverseString("OpenAI") === "IAnepO", "Test Case 3 Failed");
*/
`,
    });
    setIsAddingProblem(false);
    setIsEditing(false);
  };

  const removeProblem = (id) => {
    setAssessment((prev) => ({
      ...prev,
      problems: prev.problems.filter((problem) => problem.id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // onCreateAssessment(assessment);
    console.log(assessment);
    let response;
    try {
      response = await employer.createAssessment(
        assessment,
        localStorage.getItem("token")
      );
      if (response.status === 200) {
        setAlert({
          type: "success",
          title: "Assessment Created",
          message: "The assessment has been created successfully.",
        });

        setTimeout(() => {
          navigate("../skill/assessments");
        }, 3000);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    // setAssessment({
    //   title: "",
    //   description: "",
    //   language: "javascript",
    //   timeLimit: 5,
    //   problems: [],
    // });
  };

  return (
    <div className="bg-gray-50 p-10 rounded-xl shadow-lg max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Create New Skill Assessment
            </h1>
            <p className="text-gray-600 text-center">
              Fill in the details below to create a new assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <TextField
              label="Assessment Title"
              name="title"
              value={assessment.title}
              onChange={handleChange}
              fullWidth
              required
              helperText="Provide a clear and concise title for the assessment."
              className="bg-white rounded-lg border border-gray-300"
              InputLabelProps={{
                className: "text-gray-700",
              }}
            />

            <TextField
              label="Description"
              name="description"
              value={assessment.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              helperText="Describe the problem statement and expectations clearly."
              className="bg-white rounded-lg border border-gray-300"
              InputLabelProps={{
                className: "text-gray-700",
              }}
            />

            <FormControl fullWidth required>
              <InputLabel id="language-select-label" className="text-gray-700">
                Language
              </InputLabel>
              <Select
                labelId="language-select-label"
                label="Language"
                name="language"
                value={assessment.language}
                onChange={handleChange}
                className="bg-white rounded-lg border border-gray-300"
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="csharp">C#</MenuItem>
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="ruby">Ruby</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Time Limit (minutes)"
              name="timeLimit"
              type="number"
              value={assessment.timeLimit}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 1 }}
              helperText="Set the time limit for the assessment (in minutes)."
              className="bg-white rounded-lg border border-gray-300"
              InputLabelProps={{
                className: "text-gray-700",
              }}
            />

            {isAddingProblem && (
              <div className="space-y-4">
                <Divider />
                <Box display="flex" alignItems="center" className="mb-2">
                  <Typography variant="body1" className="text-gray-800">
                    {isEditing ? "Editing Problem" : "Adding Problem"}
                  </Typography>
                </Box>

                <TextField
                  label="Problem Title"
                  name="title"
                  value={editingProblem.title}
                  onChange={(e) => handleProblemChange("title", e.target.value)}
                  fullWidth
                  required
                  helperText="Provide a clear and concise title for the problem."
                  className="bg-white rounded-lg border border-gray-300"
                  InputLabelProps={{
                    className: "text-gray-700",
                  }}
                />

                <TextField
                  label="Problem Description"
                  name="description"
                  value={editingProblem.description}
                  onChange={(e) =>
                    handleProblemChange("description", e.target.value)
                  }
                  fullWidth
                  multiline
                  rows={4}
                  required
                  helperText="Describe the problem statement and expectations clearly."
                  className="bg-white rounded-lg border border-gray-300"
                  InputLabelProps={{
                    className: "text-gray-700",
                  }}
                />

                <Editor
                  height="200px"
                  language={assessment.language}
                  value={editingProblem.initialCode}
                  theme="vs-dark"
                  onChange={(value) =>
                    handleProblemChange("initialCode", value)
                  }
                  className="border border-gray-300 rounded-lg"
                />

                <Box display="flex" alignItems="center" className="mb-2">
                  <Typography variant="body1" className="text-gray-800">
                    Test Cases
                  </Typography>
                  <Tooltip title="Write test cases to validate the candidate's solution.">
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Editor
                  height="200px"
                  language={assessment.language}
                  value={editingProblem.testCases}
                  theme="vs-dark"
                  onChange={(value) => handleProblemChange("testCases", value)}
                  className="border border-gray-300 rounded-lg"
                />

                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={isEditing ? saveEditedProblem : addProblem}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isEditing ? "Save Changes" : "Save Problem"}
                  </Button>
                  {isEditing && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={resetEditingProblem}
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      Cancel
                    </Button>
                  )}
                </CardActions>
              </div>
            )}

            {assessment.problems.map((problem) => (
              <Card key={problem.id} className="mb-4">
                <CardContent>
                  <Typography variant="h6" className="text-gray-800">
                    {problem.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {problem.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => editProblem(problem)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => removeProblem(problem.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}

            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => setIsAddingProblem(true)}
              fullWidth
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Add Another Problem
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Create Assessment
            </Button>
          </div>
        </div>
      </form>
      {alert && (
        <Slide direction="up" in={alert} mountOnEnter unmountOnExit>
          <div className="fixed bottom-0 right-0">
            <Alert severity={alert.type} className="mt-4">
              <AlertTitle>{alert.title}</AlertTitle>
              {alert.message}
            </Alert>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default CreateAssessmentForm;
