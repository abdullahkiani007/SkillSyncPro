import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Controller from '../../../API/index';
// import Upload from '../../Cloudinary/Upload';

const ProfileForm = (props) => {
  const [formData, setFormData] = useState({ ...props.formData });
  const [edu, setEdu] = useState({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSkillChange = (selectedOptions) => {
    const skills = selectedOptions.map(option => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills,
    }));
  };

  const handleEduChange = ( e) => {

    const { name, value } = e.target;
    setEdu((prevEdu) => ({
      ...prevEdu,
      [name]: value,
    }))
  };

  const addEducation = () => {
    console.log(edu);
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: [...prevFormData.education, edu],
    }));
    console.log(formData);
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: updatedEducation,
    }));
  };

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'React', label: 'React' },
    { value: 'Node', label: 'Node' },
    { value: 'Express', label: 'Express' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'SQL', label: 'SQL' },
  ];

  const handleSubmit = async () => {
    props.setFormData(formData);
    const token = localStorage.getItem('token');
    try {
      console.log(formData);
      const response = await Controller.updateProfile(token, formData);
      if (response.status === 200) {
        props.setreadMode(true);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-1/2'>
      {/* <TextField
  label="Address"
  name='address'
  variant="outlined"
  value={formData.address}
  className='w-full'
  onChange={handleChange}
  sx={{ mt: '2rem', backgroundColor: 'white' }}
/> */}
<Upload />
      <TextField
        label="First Name"
        name='firstName'
        variant="outlined"
        value={formData.firstName}
        className='w-full'
        onChange={handleChange}
        sx={{ mt: '2rem', backgroundColor: 'white' }}
      />
      <TextField
        label="Last Name"
        name='lastName'
        variant="outlined"
        value={formData.lastName}
        className='w-full'
        onChange={handleChange}
        sx={{ mt: '2rem', backgroundColor: 'white' }}
      />
      <TextField
        label="Phone"
        name='phone'
        variant="outlined"
        value={formData.phone}
        className='w-full'
        onChange={handleChange}
        sx={{ mt: '2rem', backgroundColor: 'white' }}
      />
      <TextField
        label="Address"
        name='address'
        variant="outlined"
        value={formData.address}
        className='w-full'
        onChange={handleChange}
        sx={{ mt: '2rem', backgroundColor: 'white' }}
      />
      <div className='mt-10'>
        <h2>Skills</h2>
        <CreatableSelect
          isMulti
          options={options}
          value={formData.skills.map(skill => ({ value: skill, label: skill }))}
          onChange={handleSkillChange}
        />
      </div>
      <div className='mt-10'>
        <h2>Education</h2>

        {formData.education && formData.education.map((edu, index) => {
          return(
            <div  className='mb-4' key={index}>
              <p>{edu.institution}</p>
              <p>{edu.degree}</p>
              <p>{edu.fieldOfStudy}</p>
              <p>{edu.startDate}</p>
              <p>{edu.endDate}</p>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeEducation(index)}
                sx={{ mt: '1rem' }}
              >
                Remove
              </Button>
            </div>)
        })}


          <div  className='mb-4'>
            <TextField
              label="Institution"
              name='institution'
              variant="outlined"
              value={edu.institution}
              className='w-full'
              onChange={(e) => handleEduChange(e)}
              sx={{ mt: '1rem', backgroundColor: 'white' }}
            />
            <TextField
              label="Degree"
              name='degree'
              variant="outlined"
              value={edu.degree}
              className='w-full'
              onChange={(e) => handleEduChange( e)}
              sx={{ mt: '1rem', backgroundColor: 'white' }}
            />
            <TextField
              label="Field of Study"
              name='fieldOfStudy'
              variant="outlined"
              value={edu.fieldOfStudy}
              className='w-full'
              onChange={(e) => handleEduChange( e)}
              sx={{ mt: '1rem', backgroundColor: 'white' }}
            />
            <TextField
              label="Start Date"
              name='startDate'
              type="date"
              variant="outlined"
              value={edu.startDate}
              className='w-full'
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleEduChange( e)}
              sx={{ mt: '1rem', backgroundColor: 'white' }}
            />
            <TextField
              label="End Date"
              name='endDate'
              type="date"
              variant="outlined"
              value={edu.endDate}
              className='w-full'
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleEduChange(e)}
              sx={{ mt: '1rem', backgroundColor: 'white' }}
            />
            {/* <Button
              variant="outlined"
              color="secondary"
              onClick={() => removeEducation(index)}
              sx={{ mt: '1rem' }}
            >
              Remove
            </Button> */}
          </div>
        
        <Button
          variant="contained"
          color="primary"
          onClick={addEducation}
          sx={{ mt: '1rem' }}
        >
          Add Education
        </Button>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: '2rem' }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => props.setreadMode(true)}
        sx={{ mt: '2rem', ml: '1rem' }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default ProfileForm;
