import React, { useState } from 'react'
import Resume from './Resume'
import ResumeForm from './ResumeForm'

const ResumeBuilder = () => {
  const [formData, setFormData] = useState(null)

  const handleFormSubmit = (data) => {
    setFormData(data)
  }

  return (
    <div className='bg-white'>
      <ResumeForm onSubmit={handleFormSubmit} />
      {formData && <Resume formData={formData} />}
    </div>
  )
}
export default ResumeBuilder
