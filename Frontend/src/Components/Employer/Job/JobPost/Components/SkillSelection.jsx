import React, { useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const skillsList = [
  'JavaScript',
  'React',
  'Node.js',
  'CSS',
  'HTML',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Swift',
  'Kotlin',
  'TypeScript',
  'SQL',
  'NoSQL',
  'DevOps',
  'AWS',
  'Docker',
  'Kubernetes',
];

const SkillSelect = ({ formValues, handleSkillChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = skillsList.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormControl className='w-full'>
    <InputLabel
      id='skills-label'
      sx={{
        color: 'white',
        '&.Mui-focused': {
          color: 'white', // Label color when focused
        },
      }} // Label color to white
    >
      Skills
    </InputLabel>
    <Select
      labelId='skills-label'
      id='skills'
      name='skills'
      multiple
      value={formValues.skills}
      onChange={handleSkillChange}
      input={<Input id='select-multiple-chip' />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip
              key={value}
              label={value}
              sx={{
                backgroundColor: 'white', // Chip background color
                color: 'black', // Chip text color
              }}
            />
          ))}
        </Box>
      )}
      sx={{
        color: 'white', // Text color
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.5)', // Softer white border color
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // Border color when focused
        },
        '.MuiSvgIcon-root': {
          color: 'white', // Dropdown arrow color
        },
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background of dropdown
        '& .MuiChip-root': {
          borderColor: 'white', // Border for the selected chips
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // Change the border color on hover
        },
      }}
    >
      {['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'].map(
        (skill) => (
          <MenuItem key={skill} value={skill}>
            {skill}
          </MenuItem>
        )
      )}
    </Select>
  </FormControl>
  );
};

export default SkillSelect;
