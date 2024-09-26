import React from 'react'
import { useOutletContext } from 'react-router-dom'

const JobDetails = () => {
  const { detail } = useOutletContext()
  const [jobDetails] = React.useState(detail)

  return (
    <div className='w-4/5 p-8 bg-slate-200 min-h-screen flex justify-center items-start transition-all duration-500 ease-in-out'>
      <div className='bg-black m-auto shadow-2xl hover:shadow-3xl duration-300s rounded-lg w-full max-w-4xl p-8 transform hover:scale-105 transition-transform duration-300s'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-4xl font-extrabold text-white mb-4 tracking-wide animate-fade-in-down'>
            {jobDetails?.title}
          </h1>
          <p className='text-white text-lg'>
            {jobDetails?.location} | {jobDetails?.employmentType} |{' '}
            {jobDetails?.salaryRange}
          </p>
        </div>

        {/* Job Description */}
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-white mb-3 border-b pb-2 border-secondary'>
            Job Description
          </h2>
          <p className='text-white text-lg leading-relaxed p-4 animate-fade-in'>
            {jobDetails?.description}
          </p>
        </section>

        {/* Job Requirements */}
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-white mb-3 border-b pb-2 border-secondary'>
            Job Requirements
          </h2>
          <p className='whitespace-pre-wrap text-white text-lg p-4 rounded-lg  '>
            {jobDetails?.requirements}
          </p>
        </section>

        {/* Job Status */}
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-white mb-3 border-b pb-2 border-secondary'>
            Job Status
          </h2>
          <div className='text-lg text-white p-4 space-y-2'>
            <p>
              <strong>Posted On:</strong>{' '}
              {new Date(jobDetails?.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Updated:</strong>{' '}
              {new Date(jobDetails?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* Applicants */}
        <section>
          <h2 className='text-2xl font-semibold text-white mb-3 border-b pb-2 border-secondary'>
            Applicants
          </h2>
          {jobDetails?.applicants?.length > 0 ? (
            <ul className='list-disc ml-5 text-lg p-4 text-white space-y-1'>
              {jobDetails.applicants.map((applicant, index) => (
                <li
                  key={index}
                  className='hover:bg-gray-100 p-2 rounded transition-colors duration-300'
                >
                  {applicant}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-lg text-white p-4 animate-fade-in'>
              No applicants yet.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}

export default JobDetails
