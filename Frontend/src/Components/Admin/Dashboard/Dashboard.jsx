import React from 'react'
import EmploymentTypesDistributionChart from '../Charts/EmloyementTypeDistributionChart'
import JobApplicationsChart from '../Charts/JobApplicationChart'
import JobPostingsByLocationBarChart from '../Charts/JobPostingByLocationBarChar'
import JobPostingsByLocationMapChart from '../Charts/JobPostingByLocationMapChart'
import JobPostingsChart from '../Charts/JobPostingChart'
import JobseekerRegistrationsChart from '../Charts/JobSeekerRegistrationsChart'
import SalaryRangeDistributionChart from '../Charts/SalaryRangeDistributionChart'
import TopCompaniesChart from '../Charts/TopCompaniesChart'

const AdminDashboard = () => {
  return (
    <div className='p-6 bg-[#182235] min-h-screen'>
      <h1 className='text-3xl font-bold text-white mb-6'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
        {/* Job postings card */}
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg  font-semibold text-gray-400 mb-4'>
            Job Postings Over Time
          </h2>
          <JobPostingsChart />
        </div>
        {/* job seeker registrations over time */}
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg mb-2'>Jobseeker Registrations Over Time</h2>
          <JobseekerRegistrationsChart />
        </div>

        {/* Job Applications card */}
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg  font-semibold text-gray-400 mb-4'>
            Job Applications per Job
          </h2>
          <JobApplicationsChart />
        </div>

        {/* Top companies chart */}
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg mb-2'>Top Companies by Job Postings</h2>
          <TopCompaniesChart />
        </div>

        {/* Employment type distribution chart */}
        <div className='bg-white  shadow-lg rounded-lg'>
          <EmploymentTypesDistributionChart />
        </div>

        {/* Salary range distribution chart */}
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg mb-2'>Salary Range Distribution</h2>
          <SalaryRangeDistributionChart />
        </div>

        {/* Job Locations Bar chart */}
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg mb-2'>Job posting by Location</h2>
          <JobPostingsByLocationBarChart />
        </div>

        {/* Job locations map chart */}
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg mb-2'>Job posting by Location</h2>
          <JobPostingsByLocationMapChart />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
