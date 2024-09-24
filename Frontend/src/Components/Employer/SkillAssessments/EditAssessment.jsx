import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material'
import Editor from '@monaco-editor/react'

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
    <form className='bg-gray-300 p-8 m-8 rounded-lg '>
      <TextField
        label='Assessment Title'
        name='title'
        value={editableAssessment.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
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
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Select
          name='language'
          value={editableAssessment.language}
          onChange={handleChange}
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
      />

      {editableAssessment.problems.map((problem, index) => (
        <div key={problem.id} style={{ marginBottom: 20 }}>
          <Typography variant='h6'>Problem {index + 1}</Typography>
          <TextField
            label='Problem Title'
            value={problem.title}
            onChange={(e) =>
              handleProblemChange(index, 'title', e.target.value)
            }
            fullWidth
            sx={{ marginBottom: 2 }}
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
          />
          <Editor
            height='200px'
            defaultLanguage='javascript'
            value={problem.initialCode}
            onChange={(value) =>
              handleProblemChange(index, 'initialCode', value)
            }
          />
          <Editor
            height='200px'
            defaultLanguage='javascript'
            value={problem.testCases}
            onChange={(value) => handleProblemChange(index, 'testCases', value)}
          />
        </div>
      ))}
      <Button variant='contained' color='primary' onClick={handleSave}>
        Save Assessment
      </Button>
    </form>
  )
}

export default EditAssessment
