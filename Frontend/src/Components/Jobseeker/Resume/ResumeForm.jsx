import React, { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

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
  })

  const [sections, setSections] = useState({
    general: true,
    education: true,
    skills: true,
    languages: true,
    projects: true,
    workExperience: true,
  })

  const [completedSections, setCompletedSections] = useState({
    general: false,
    education: false,
    skills: false,
    languages: false,
    projects: false,
    workExperience: false,
  })

  useEffect(() => {
    const isGeneralComplete =
      formData.name &&
      formData.title &&
      formData.phone &&
      formData.email &&
      formData.address &&
      formData.intro &&
      formData.profilePic
    const isEducationComplete = formData.education.every(
      (edu) => edu.degree && edu.year && edu.institution
    )
    const isSkillsComplete = formData.skills.every(
      (skill) => skill.trim() !== ''
    )
    const isLanguagesComplete = formData.languages.every(
      (language) => language.trim() !== ''
    )
    const isProjectsComplete = formData.projects.every(
      (proj) => proj.name && proj.description
    )
    const isWorkExperienceComplete = formData.workExperience.every(
      (work) => work.company && work.role && work.duration
    )

    setCompletedSections({
      general: isGeneralComplete,
      education: isEducationComplete,
      skills: isSkillsComplete,
      languages: isLanguagesComplete,
      projects: isProjectsComplete,
      workExperience: isWorkExperienceComplete,
    })
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target
    const updatedArray = formData[arrayName].map((item, i) =>
      i === index ? value : item
    )
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }))
  }

  const handleObjectArrayChange = (e, index, field, arrayName) => {
    const { value } = e.target
    const updatedArray = formData[arrayName].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }))
  }

  const handleAddItem = (arrayName, itemTemplate) => {
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: [...prevData[arrayName], itemTemplate],
    }))
  }

  const handleRemoveItem = (arrayName, index) => {
    const updatedArray = formData[arrayName].filter((_, i) => i !== index)
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData((prevData) => ({
        ...prevData,
        profilePic: imageUrl,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const allSectionsComplete = Object.values(completedSections).every(Boolean)
    if (!allSectionsComplete) {
      alert('Please complete all sections before submitting the resume.')
      return
    }

    onSubmit(formData)
  }

  const toggleSection = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 w-4/5 mx-auto p-8 rounded-lg shadow-lg font-poppins'
      style={{
        background: 'linear-gradient(135deg, #FFFFFF, #E14411)', // White to dark orange gradient
        maxWidth: '1000px',
        marginTop: '20px',
        color: '#333',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 className='text-center text-3xl font-semibold mb-6'>Resume Form</h1>

      <div className='space-y-6'>
        {/* General Details Section */}
        <div
          className='space-y-4 p-4 rounded-lg'
          style={{
            background: '#ffffff', // White background for contrast
            borderRadius: '10px',
          }}
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>
              General Details
              {completedSections.general && (
                <CheckCircleIcon
                  style={{ color: '#E14411', marginLeft: '10px' }} // Updated checkmark color
                />
              )}
            </h2>
            <IconButton onClick={() => toggleSection('general')}>
              {sections.general ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>

          {sections.general && (
            <>
              <input
                className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                placeholder='Title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                placeholder='Phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                placeholder='Address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
              />
              <textarea
                className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                placeholder='Intro'
                name='intro'
                value={formData.intro}
                onChange={handleChange}
                required
              />
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                required
              />
            </>
          )}
        </div>

        {/* Education Section */}
        <div
          className='space-y-4 p-4 rounded-lg'
          style={{
            background: '#ffffff', // White background for contrast
            borderRadius: '10px',
          }}
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>
              Education
              {completedSections.education && (
                <CheckCircleIcon
                  style={{ color: '#E14411', marginLeft: '10px' }} // Updated checkmark color
                />
              )}
            </h2>
            <IconButton onClick={() => toggleSection('education')}>
              {sections.education ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>

          {sections.education && (
            <>
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className='bg-[#f3f4f6] p-4 rounded-lg space-y-2 border-2 border-gray-300'
                >
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Degree'
                    value={edu.degree}
                    onChange={(e) =>
                      handleObjectArrayChange(e, index, 'degree', 'education')
                    }
                    required
                  />
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Year'
                    value={edu.year}
                    onChange={(e) =>
                      handleObjectArrayChange(e, index, 'year', 'education')
                    }
                    required
                  />
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Institution'
                    value={edu.institution}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        e,
                        index,
                        'institution',
                        'education'
                      )
                    }
                    required
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleRemoveItem('education', index)}
                  >
                    <DeleteIcon sx={{ color: '#E14411' }} />
                  </IconButton>
                </div>
              ))}
              <button
                onClick={() =>
                  handleAddItem('education', {
                    degree: '',
                    year: '',
                    institution: '',
                  })
                }
                className='bg-gradient-to-r from-orange-600 to-orange-400 border-none rounded-full flex items-center justify-center space-x-2 text-white py-2 px-4 text-sm transform transition-transform duration-300 hover:scale-105'
              >
                <AddIcon />
                <span>Add Education</span>
              </button>
            </>
          )}
        </div>

        {/* Skills Section */}
        <div
          className='space-y-4 p-4 rounded-lg'
          style={{
            background: '#ffffff', // White background for contrast
            borderRadius: '10px',
          }}
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>
              Skills
              {completedSections.skills && (
                <CheckCircleIcon
                  style={{ color: '#E14411', marginLeft: '10px' }}
                />
              )}
            </h2>
            <IconButton onClick={() => toggleSection('skills')}>
              {sections.skills ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>

          {sections.skills && (
            <>
              {formData.skills.map((skill, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Skill'
                    value={skill}
                    onChange={(e) => handleArrayChange(e, index, 'skills')}
                    required
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleRemoveItem('skills', index)}
                  >
                    <DeleteIcon sx={{ color: '#E14411' }} />
                  </IconButton>
                </div>
              ))}
              <button
                onClick={() => handleAddItem('skills', '')}
                className='bg-gradient-to-r from-orange-600 to-orange-400 border-none rounded-full flex items-center justify-center space-x-2 text-white py-2 px-4 text-sm transform transition-transform duration-300 hover:scale-105'
              >
                <AddIcon />
                <span>Add Skill</span>
              </button>
            </>
          )}
        </div>

        {/* Languages Section */}
        <div
          className='space-y-4 p-4 rounded-lg'
          style={{
            background: '#ffffff', // White background for contrast
            borderRadius: '10px',
          }}
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>
              Languages
              {completedSections.languages && (
                <CheckCircleIcon
                  style={{ color: '#E14411', marginLeft: '10px' }}
                />
              )}
            </h2>
            <IconButton onClick={() => toggleSection('languages')}>
              {sections.languages ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>

          {sections.languages && (
            <>
              {formData.languages.map((language, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Language'
                    value={language}
                    onChange={(e) => handleArrayChange(e, index, 'languages')}
                    required
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleRemoveItem('languages', index)}
                  >
                    <DeleteIcon sx={{ color: '#E14411' }} />
                  </IconButton>
                </div>
              ))}
              <button
                onClick={() => handleAddItem('languages', '')}
                className='bg-gradient-to-r from-orange-600 to-orange-400 border-none rounded-full flex items-center justify-center space-x-2 text-white py-2 px-4 text-sm transform transition-transform duration-300 hover:scale-105'
              >
                <AddIcon />
                <span>Add Language</span>
              </button>
            </>
          )}
        </div>

        {/* Projects Section */}
        <div
          className='space-y-4 p-4 rounded-lg'
          style={{
            background: '#ffffff', // White background for contrast
            borderRadius: '10px',
          }}
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>
              Projects
              {completedSections.projects && (
                <CheckCircleIcon
                  style={{ color: '#E14411', marginLeft: '10px' }}
                />
              )}
            </h2>
            <IconButton onClick={() => toggleSection('projects')}>
              {sections.projects ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>

          {sections.projects && (
            <>
              {formData.projects.map((project, index) => (
                <div
                  key={index}
                  className='bg-[#f3f4f6] p-4 rounded-lg space-y-2 border-2 border-gray-300'
                >
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Project Name'
                    value={project.name}
                    onChange={(e) =>
                      handleObjectArrayChange(e, index, 'name', 'projects')
                    }
                    required
                  />
                  <textarea
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Project Description'
                    value={project.description}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        e,
                        index,
                        'description',
                        'projects'
                      )
                    }
                    required
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleRemoveItem('projects', index)}
                  >
                    <DeleteIcon sx={{ color: '#E14411' }} />
                  </IconButton>
                </div>
              ))}
              <button
                onClick={() =>
                  handleAddItem('projects', { name: '', description: '' })
                }
                className='bg-gradient-to-r from-orange-600 to-orange-400 border-none rounded-full flex items-center justify-center space-x-2 text-white py-2 px-4 text-sm transform transition-transform duration-300 hover:scale-105'
              >
                <AddIcon />
                <span>Add Project</span>
              </button>
            </>
          )}
        </div>

        {/* Work Experience Section */}
        <div
          className='space-y-4 p-4 rounded-lg'
          style={{
            background: '#ffffff', // White background for contrast
            borderRadius: '10px',
          }}
        >
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>
              Work Experience
              {completedSections.workExperience && (
                <CheckCircleIcon
                  style={{ color: '#E14411', marginLeft: '10px' }}
                />
              )}
            </h2>
            <IconButton onClick={() => toggleSection('workExperience')}>
              {sections.workExperience ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </div>

          {sections.workExperience && (
            <>
              {formData.workExperience.map((work, index) => (
                <div
                  key={index}
                  className='bg-[#f3f4f6] p-4 rounded-lg space-y-2 border-2 border-gray-300'
                >
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Company'
                    value={work.company}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        e,
                        index,
                        'company',
                        'workExperience'
                      )
                    }
                    required
                  />
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Role'
                    value={work.role}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        e,
                        index,
                        'role',
                        'workExperience'
                      )
                    }
                    required
                  />
                  <input
                    className='w-full bg-transparent border-2 border-gray-300 focus:border-orange-500 focus:bg-gray-100 transition-all outline-none py-2 px-3 rounded-md text-gray-900'
                    placeholder='Duration'
                    value={work.duration}
                    onChange={(e) =>
                      handleObjectArrayChange(
                        e,
                        index,
                        'duration',
                        'workExperience'
                      )
                    }
                    required
                  />
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleRemoveItem('workExperience', index)}
                  >
                    <DeleteIcon sx={{ color: '#E14411' }} />
                  </IconButton>
                </div>
              ))}
              <button
                onClick={() =>
                  handleAddItem('workExperience', {
                    company: '',
                    role: '',
                    duration: '',
                  })
                }
                className='bg-gradient-to-r from-orange-600 to-orange-400 border-none rounded-full flex items-center justify-center space-x-2 text-white py-2 px-4 text-sm transform transition-transform duration-300 hover:scale-105'
              >
                <AddIcon />
                <span>Add Work Experience</span>
              </button>
            </>
          )}
        </div>

        <button
          type='submit'
          className='w-full bg-secondary-dark border-none rounded-full flex items-center justify-center space-x-2 text-white py-2 px-4 text-sm transform transition-transform duration-300 hover:scale-105 mt-6'
        >
          <span>Generate Resume</span>
        </button>
      </div>
    </form>
  )
}

export default ResumeForm
