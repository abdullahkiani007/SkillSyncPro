import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../Loader/Loader';
import Employer from '../../../../API/employer';

const JobReport = () => {
  const { id } = useParams();  // Job ID from URL
  const [loading, setLoading] = useState(true);
  const [jobReport, setJobReport] = useState({});  // State to store report details

  // Fetch job report data when the component loads
  useEffect(() => {
    const fetchJobReport = async () => {
      try {
        const reportData = await Employer.getJobReport(id);  // API call to fetch job report
        setJobReport(reportData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job report', error);
        setLoading(false);
      }
    };
    fetchJobReport();
  }, [id]);

  if (loading) {
    return <Loader />;  // Display loader while data is being fetched
  }

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h2 className='text-4xl font-bold mb-10 text-center text-gray-800'>Job Report for {jobReport.jobTitle}</h2>

      {/* Application Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className='bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl'>
          <h3 className='text-2xl font-semibold text-indigo-600 mb-4'>Application Statistics</h3>
          <ul className='space-y-2'>
            <li>Total Applications: <span className='font-bold'>{jobReport.totalApplications}</span></li>
            <li>Shortlisted: <span className='font-bold'>{jobReport.shortlisted}</span></li>
            <li>Rejected: <span className='font-bold'>{jobReport.rejected}</span></li>
            <li>In Progress: <span className='font-bold'>{jobReport.inProgress}</span></li>
          </ul>
        </div>

        {/* Applicant Demographics Card */}
        <div className='bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl'>
          <h3 className='text-2xl font-semibold text-pink-600 mb-4'>Applicant Demographics</h3>
          <ul className='space-y-2'>
            <li>Average Age: <span className='font-bold'>{jobReport.averageAge}</span></li>
            <li>Top Locations: <span className='font-bold'>{jobReport.topLocations?.join(', ')}</span></li>
            <li>
              <strong>Education Level Breakdown:</strong>
              <ul className='ml-4 space-y-1'>
                {jobReport.educationLevels &&
                  Object.entries(jobReport.educationLevels).map(([level, count]) => (
                    <li key={level}>{level}: {count}%</li>
                  ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Skill Match Analysis Card */}
        <div className='bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl'>
          <h3 className='text-2xl font-semibold text-yellow-600 mb-4'>Skill Match Analysis</h3>
          <ul className='space-y-2'>
            <li>Average Skill Match: <span className='font-bold'>{jobReport.averageSkillMatch}%</span></li>
            <li>Top Skills: <span className='font-bold'>{jobReport.topSkills?.join(', ')}</span></li>
          </ul>
        </div>

        {/* Job Engagement Card */}
        <div className='bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl'>
          <h3 className='text-2xl font-semibold text-green-600 mb-4'>Job Engagement</h3>
          <ul className='space-y-2'>
            <li>Job Views: <span className='font-bold'>{jobReport.jobViews}</span></li>
            <li>Click-through Rate: <span className='font-bold'>{jobReport.clickThroughRate}%</span></li>
          </ul>
        </div>

        {/* Assessment Insights Card */}
        {jobReport.skillAssessments && (
          <div className='bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl'>
            <h3 className='text-2xl font-semibold text-purple-600 mb-4'>Assessment Results</h3>
            <ul className='space-y-2'>
              <li>Assessments Completed: <span className='font-bold'>{jobReport.skillAssessments.completed}</span></li>
              <li>Average Score: <span className='font-bold'>{jobReport.skillAssessments.averageScore}%</span></li>
            </ul>
          </div>
        )}

        {/* Time-to-hire Metrics Card */}
        <div className='bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl'>
          <h3 className='text-2xl font-semibold text-red-600 mb-4'>Time-to-hire</h3>
          <ul className='space-y-2'>
            <li>Average Time to Fill Role: <span className='font-bold'>{jobReport.averageTimeToHire} days</span></li>
            <li>Current Job Time: <span className='font-bold'>{jobReport.currentJobTime} days</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobReport;
