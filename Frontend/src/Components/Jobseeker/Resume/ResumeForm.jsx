import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import '@fontsource/roboto' // Import Roboto font

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
    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 w-2/3 mx-auto bg-gray-900 text-[#ffffff] p-6 rounded-lg shadow-md font-roboto'
    >
      <h1 className='text-center text-4xl font-bold text-[#ffffff] mb-6'>
        Resume Form
      </h1>

      <div className='space-y-4'>
        <div>
          <input
            className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] focus:bg-[#2a2d31] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
            placeholder='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] focus:bg-[#2a2d31] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
            placeholder='Title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] focus:bg-[#2a2d31] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
            placeholder='Phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] focus:bg-[#2a2d31] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] focus:bg-[#2a2d31] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
            placeholder='Address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <textarea
            className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] focus:bg-[#2a2d31] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
            placeholder='Profile Intro'
            name='intro'
            value={formData.intro}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label className='text-white'>Profile Picture</label>
          <input
            type='file'
            onChange={handleImageChange}
            className='block mt-2 text-white '
          />
          {formData.profilePic && (
            <img
              src={formData.profilePic}
              alt='Profile'
              width='100'
              className='mt-2 rounded-lg'
            />
          )}
        </div>

        {/* Sections for Education */}
        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-[#ffffff]'>Education</h2>
          {formData.education.map((edu, index) => (
            <div
              key={index}
              className='bg-[#3d3f43] p-4 rounded-lg space-y-2 border-2 border-[#64676d]'
            >
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Degree'
                value={edu.degree}
                onChange={(e) =>
                  handleObjectArrayChange(e, index, 'degree', 'education')
                }
                required
              />
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Year'
                value={edu.year}
                onChange={(e) =>
                  handleObjectArrayChange(e, index, 'year', 'education')
                }
                required
              />
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Institution'
                value={edu.institution}
                onChange={(e) =>
                  handleObjectArrayChange(e, index, 'institution', 'education')
                }
                required
              />
              <IconButton
                aria-label='delete'
                onClick={() => handleRemoveItem('education', index)}
                className='text-red-500'
              >
                <DeleteIcon />
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
            className='bg-black border-2 border-black rounded-full flex items-center justify-center space-x-2 text-white py-3 px-6 transform transition-transform duration-300 hover:bg-[#1a2b49] hover:border-[#1a2b49] hover:scale-105'
          >
            <AddIcon />
            <span>Add Education</span>
          </button>
        </div>

        {/* Sections for Skills */}
        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-[#ffffff]'>Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Skill'
                value={skill}
                onChange={(e) => handleArrayChange(e, index, 'skills')}
                required
              />
              <IconButton
                aria-label='delete'
                onClick={() => handleRemoveItem('skills', index)}
                className='text-red-500'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <button
            onClick={() => handleAddItem('skills', '')}
            className='bg-black border-2 border-black rounded-full flex items-center justify-center space-x-2 text-white py-3 px-6 transform transition-transform duration-300 hover:bg-[#1a2b49] hover:border-[#1a2b49] hover:scale-105'
          >
            <AddIcon />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Sections for Languages */}
        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-[#ffffff]'>Languages</h2>
          {formData.languages.map((language, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Language'
                value={language}
                onChange={(e) => handleArrayChange(e, index, 'languages')}
                required
              />
              <IconButton
                aria-label='delete'
                onClick={() => handleRemoveItem('languages', index)}
                className='text-red-500'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <button
            onClick={() => handleAddItem('languages', '')}
            className='bg-black border-2 border-black rounded-full flex items-center justify-center space-x-2 text-white py-3 px-6 transform transition-transform duration-300 hover:bg-[#1a2b49] hover:border-[#1a2b49] hover:scale-105'
          >
            <AddIcon />
            <span>Add Language</span>
          </button>
        </div>

        {/* Sections for Projects */}
        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-[#ffffff]'>Projects</h2>
          {formData.projects.map((project, index) => (
            <div
              key={index}
              className='bg-[#3d3f43] p-4 rounded-lg space-y-2 border-2 border-[#64676d]'
            >
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Project Name'
                value={project.name}
                onChange={(e) =>
                  handleObjectArrayChange(e, index, 'name', 'projects')
                }
                required
              />
              <textarea
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Project Description'
                value={project.description}
                onChange={(e) =>
                  handleObjectArrayChange(e, index, 'description', 'projects')
                }
                required
              />
              <IconButton
                aria-label='delete'
                onClick={() => handleRemoveItem('projects', index)}
                className='text-red-500'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <button
            onClick={() =>
              handleAddItem('projects', { name: '', description: '' })
            }
            className='bg-black border-2 border-black rounded-full flex items-center justify-center space-x-2 text-white py-3 px-6 transform transition-transform duration-300 hover:bg-[#1a2b49] hover:border-[#1a2b49] hover:scale-105'
          >
            <AddIcon />
            <span>Add Project</span>
          </button>
        </div>

        {/* Sections for Work Experience */}
        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-[#ffffff]'>Work Experience</h2>
          {formData.workExperience.map((work, index) => (
            <div
              key={index}
              className='bg-[#3d3f43] p-4 rounded-lg space-y-2 border-2 border-[#64676d]'
            >
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Company'
                value={work.company}
                onChange={(e) =>
                  handleObjectArrayChange(e, index, 'company', 'workExperience')
                }
                required
              />
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
                placeholder='Role'
                value={work.role}
                onChange={(e) =>
                  handleObjectArrayChange(e, index, 'role', 'workExperience')
                }
                required
              />
              <input
                className={`w-full bg-[#3d3f43] border-2 border-[#64676d] focus:border-[#0393bd] transition-all outline-none py-2 px-3 rounded-md placeholder-[#94a3b8] text-white`}
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
                className='text-red-500'
              >
                <DeleteIcon />
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
            className='bg-black border-2 border-black rounded-full flex items-center justify-center space-x-2 text-white py-3 px-6 transform transition-transform duration-300 hover:bg-[#1a2b49] hover:border-[#1a2b49] hover:scale-105'
          >
            <AddIcon />
            <span>Add Work Experience</span>
          </button>
        </div>

        <button
          type='submit'
          className='w-full bg-black border-2 border-black rounded-full flex items-center justify-center space-x-2 text-white py-3 px-6 transform transition-transform duration-300 hover:bg-[#1a2b49] hover:border-[#1a2b49] hover:scale-105 mt-6'
        >
          <span>Generate Resume</span>
        </button>
      </div>
    </form>
  )
}

export default ResumeForm
