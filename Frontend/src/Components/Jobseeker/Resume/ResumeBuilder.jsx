import React, { useState } from 'react'
import ResumeForm from './ResumeForm'
import Resume from './Resume'

const ResumeBuilder = () => {
  const [formData, setFormData] = useState(null)

  const handleFormSubmit = (data) => {
    setFormData(data)
  }

  return (
    <div className=' py-10'>
      <ResumeForm onSubmit={handleFormSubmit} />
      {formData && <Resume formData={formData} />}
    </div>
  )
}
export default ResumeBuilder
