import Editor from '@monaco-editor/react'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const EditAssessment = ({ assessment, onSave }) => {
  const [editableAssessment, setEditableAssessment] = useState(assessment)

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditableAssessment({ ...editableAssessment, [name]: value })
  }

  const handleProblemChange = (index, field, value) => {
    const updatedProblems = [...editableAssessment.problems]
    updatedProblems[index][field] = value
    setEditableAssessment({ ...editableAssessment, problems: updatedProblems })
  }

  const handleSave = () => {
    onSave(editableAssessment)
  }

  return (
    <form
      className='p-8 m-8 rounded-lg border-black border-2'
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <Typography
        variant='h4'
        sx={{ marginBottom: 4, color: '#333', textAlign: 'center' }}
      >
        Edit Assessment
      </Typography>
      <TextField
        label='Assessment Title'
        name='title'
        value={editableAssessment.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ style: { color: '#333' } }}
        InputProps={{
          sx: {
            backgroundColor: '#f9f9f9',
            borderRadius: '5px',
          },
        }}
      />
      <TextField
        label='Description'
        name='description'
        value={editableAssessment.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ style: { color: '#333' } }}
        InputProps={{
          sx: {
            backgroundColor: '#f9f9f9',
            borderRadius: '5px',
          },
        }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Select
          name='language'
          value={editableAssessment.language}
          onChange={handleChange}
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '5px',
          }}
        >
          <MenuItem value='javascript'>JavaScript</MenuItem>
          <MenuItem value='python'>Python</MenuItem>
          <MenuItem value='java'>Java</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label='Time Limit (minutes)'
        name='timeLimit'
        type='number'
        value={editableAssessment.timeLimit}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ style: { color: '#333' } }}
        InputProps={{
          sx: {
            backgroundColor: '#f9f9f9',
            borderRadius: '5px',
          },
        }}
      />

      {editableAssessment.problems.map((problem, index) => (
        <div
          key={problem.id}
          style={{
            marginBottom: 20,
            padding: '16px',
            backgroundColor: '#e8f0fe',
            borderRadius: '8px',
            border: '1px solid #cfd8dc',
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#333' }}>
            Problem {index + 1}
          </Typography>
          <TextField
            label='Problem Title'
            value={problem.title}
            onChange={(e) =>
              handleProblemChange(index, 'title', e.target.value)
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ style: { color: '#333' } }}
            InputProps={{
              sx: {
                backgroundColor: '#f9f9f9',
                borderRadius: '5px',
              },
            }}
          />
          <TextField
            label='Problem Description'
            value={problem.description}
            onChange={(e) =>
              handleProblemChange(index, 'description', e.target.value)
            }
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ style: { color: '#333' } }}
            InputProps={{
              sx: {
                backgroundColor: '#f9f9f9',
                borderRadius: '5px',
              },
            }}
          />
          <Editor
            height='200px'
            defaultLanguage='javascript'
            value={problem.initialCode}
            onChange={(value) =>
              handleProblemChange(index, 'initialCode', value)
            }
            options={{
              theme: 'light',
              fontSize: 14,
              minimap: { enabled: false },
            }}
          />
          <Editor
            height='200px'
            defaultLanguage='javascript'
            value={problem.testCases}
            onChange={(value) => handleProblemChange(index, 'testCases', value)}
            options={{
              theme: 'light',
              fontSize: 14,
              minimap: { enabled: false },
            }}
          />
        </div>
      ))}
      <Button
        variant='contained'
        color='primary'
        onClick={handleSave}
        sx={{
          backgroundColor: '#4caf50',
          '&:hover': { backgroundColor: '#45a049' },
          marginTop: 2,
          borderRadius: '8px',
          padding: '10px 20px',
        }}
      >
        Save Assessment
      </Button>
    </form>
  )
}

export default EditAssessment
