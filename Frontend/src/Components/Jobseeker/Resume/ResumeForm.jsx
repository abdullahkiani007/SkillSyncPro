import React, { useState } from 'react';
import { TextField, Button, IconButton, Typography, Card, CardContent, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    address: '',
    intro: '',
    profilePic: '',
    education: [{ degree: '', year: '', institution: '' }],
    skills: [''],
    languages: [''],
    projects: [{ name: '', description: '' }],
    workExperience: [{ company: '', role: '', duration: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    const updatedArray = formData[arrayName].map((item, i) => (i === index ? value : item));
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }));
  };

  const handleObjectArrayChange = (e, index, field, arrayName) => {
    const { value } = e.target;
    const updatedArray = formData[arrayName].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }));
  };

  const handleAddItem = (arrayName, itemTemplate) => {
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: [...prevData[arrayName], itemTemplate],
    }));
  };

  const handleRemoveItem = (arrayName, index) => {
    const updatedArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        profilePic: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Box className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <Typography variant="h4" component="h1" className="text-center font-bold">
          Resume Form
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Profile Intro"
          name="intro"
          value={formData.intro}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <div>
          <Typography variant="body1" component="label">
            Profile Picture
          </Typography>
          <input type="file" onChange={handleImageChange} className="block mt-2" />
          {formData.profilePic && <img src={formData.profilePic} alt="Profile" width="100" className="mt-2" />}
        </div>

        <div className="space-y-4">
          <Typography variant="h5" component="h2">
            Education
          </Typography>
          {formData.education.map((edu, index) => (
            <Card key={index} className="p-4">
              <CardContent className="space-y-2">
                <TextField
                  fullWidth
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => handleObjectArrayChange(e, index, 'degree', 'education')}
                  required
                />
                <TextField
                  fullWidth
                  label="Year"
                  value={edu.year}
                  onChange={(e) => handleObjectArrayChange(e, index, 'year', 'education')}
                  required
                />
                <TextField
                  fullWidth
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) => handleObjectArrayChange(e, index, 'institution', 'education')}
                  required
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveItem('education', index)}
                  className="text-red-500"
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddItem('education', { degree: '', year: '', institution: '' })}
            startIcon={<AddIcon />}
          >
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          <Typography variant="h5" component="h2">
            Skills
          </Typography>
          {formData.skills.map((skill, index) => (
            <Box key={index} className="flex items-center space-x-4">
              <TextField
                fullWidth
                label="Skill"
                value={skill}
                onChange={(e) => handleArrayChange(e, index, 'skills')}
                required
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveItem('skills', index)}
                className="text-red-500"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={() => handleAddItem('skills', '')} startIcon={<AddIcon />}>
            Add Skill
          </Button>
        </div>

        <div className="space-y-4">
          <Typography variant="h5" component="h2">
            Languages
          </Typography>
          {formData.languages.map((language, index) => (
            <Box key={index} className="flex items-center space-x-4">
              <TextField
                fullWidth
                label="Language"
                value={language}
                onChange={(e) => handleArrayChange(e, index, 'languages')}
                required
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveItem('languages', index)}
                className="text-red-500"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddItem('languages', '')}
            startIcon={<AddIcon />}
          >
            Add Language
          </Button>
        </div>

        <div className="space-y-4">
          <Typography variant="h5" component="h2">
            Projects
          </Typography>
          {formData.projects.map((project, index) => (
            <Card key={index} className="p-4">
              <CardContent className="space-y-2">
                <TextField
                  fullWidth
                  label="Name"
                  value={project.name}
                  onChange={(e) => handleObjectArrayChange(e, index, 'name', 'projects')}
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={project.description}
                  onChange={(e) => handleObjectArrayChange(e, index, 'description', 'projects')}
                  required
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveItem('projects', index)}
                  className="text-red-500"
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddItem('projects', { name: '', description: '' })}
            startIcon={<AddIcon />}
          >
            Add Project
          </Button>
        </div>

        <div className="space-y-4">
          <Typography variant="h5" component="h2">
            Work Experience
          </Typography>
          {formData.workExperience.map((work, index) => (
            <Card key={index} className="p-4">
              <CardContent className="space-y-2">
                <TextField
                  fullWidth
                  label="Company"
                  value={work.company}
                  onChange={(e) => handleObjectArrayChange(e, index, 'company', 'workExperience')}
                  required
                />
                <TextField
                  fullWidth
                  label="Role"
                  value={work.role}
                  onChange={(e) => handleObjectArrayChange(e, index, 'role', 'workExperience')}
                  required
                />
                <TextField
                  fullWidth
                  label="Duration"
                  value={work.duration}
                  onChange={(e) => handleObjectArrayChange(e, index, 'duration', 'workExperience')}
                  required
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveItem('workExperience', index)}
                  className="text-red-500"
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddItem('workExperience', { company: '', role: '', duration: '' })}
            startIcon={<AddIcon />}
          >
            Add Work Experience
          </Button>
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-6">
          Generate Resume
        </Button>
      </Box>
    </form>
  );
};

export default ResumeForm;
