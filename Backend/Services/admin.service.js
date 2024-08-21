const JobModel = require("../Models/job.model");
const JobSeekerModel = require("../Models/jobseeker.model");
const ApplicationModel = require("../Models/application.model");
const CompanyModel = require("../Models/company.model");
const EmployerModel = require("../Models/employer.model");

const AdminService = {
  fetchJobsOverTime: async (query) => {
    // Assume you have a Job model
    const jobs = await JobModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    // return (jobs.map(job => ({ date: job._id, count: job.count })));

    return [
      {
        _id: "2024-08-04",
        count: 1,
      },
      {
        _id: "2024-08-19",
        count: 1,
      },
      {
        _id: "2024-08-20",
        count: 2,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
      {
        _id: "2024-08-21",
        count: 3,
      },
      {
        _id: "2024-08-22",
        count: 1,
      },
      {
        _id: "2024-08-23",
        count: 4,
      },
      {
        _id: "2024-08-24",
        count: 2,
      },
      {
        _id: "2024-08-25",
        count: 5,
      },
      {
        _id: "2024-08-26",
        count: 3,
      },
      {
        _id: "2024-08-27",
        count: 2,
      },
      {
        _id: "2024-08-28",
        count: 1,
      },
      {
        _id: "2024-08-29",
        count: 4,
      },
    ];
  },

  fetchJobApplications: async () => {
    const jobs = await JobModel.aggregate([
      {
        $project: {
          title: 1,
          applicationsCount: { $size: "$applicants" }, // Assuming 'applications' is an array of applicant IDs
        },
      },
    ]);

    //   return jobs;
    return [
      {
        _id: "66af3090c4fce7cc889728a3",
        title: "Full stack dev",
        applicationsCount: 8,
      },
      {
        _id: "66c382557cd63d7228aba2c7",
        title: "Backend Engineer",
        applicationsCount: 2,
      },
      {
        _id: "66c382557cd63d7228aba2c7",
        title: "devops engineer",
        applicationsCount: 10,
      },
    ];
  },

  fetchTopCompaniesByJobPostings: async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $group: {
            _id: "$company", // Group by company
            jobCount: { $sum: 1 }, // Count number of jobs
          },
        },
        {
          $lookup: {
            from: "companies", // Collection name in MongoDB
            localField: "_id",
            foreignField: "_id",
            as: "companyInfo",
          },
        },
        {
          $unwind: "$companyInfo",
        },
        {
          $project: {
            _id: 0,
            companyName: "$companyInfo.name", // Assuming the Company model has a name field
            jobCount: 1,
          },
        },
        {
          $sort: { jobCount: -1 }, // Sort by jobCount in descending order
        },
      ]);

    //   return results;
    return [
        {
            "jobCount": 2,
            "companyName": "codewar software"
        },{
            "jobCount":10,
            "companyName": "TeraByte"
        },{
            "jobCount":4,
            "companyName": "Devsinc"
        },{
            "jobCount":3,
            "companyName": "ArbiSoft"
        }
    ]
    } catch (error) {
      throw new Error(
        "Error fetching top companies by job postings: " + error.message
      );
    }
  },

  fetchJobseekerRegistrationsOverTime : async (fromDate, toDate) => {
    try {
      const results = await JobSeekerModel.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Format date as string for grouping
            registrationCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date
        },
      ]);
  
    //   return results;
    return [
        { _id: '2024-05-17', registrationCount: 2 },
        { _id: '2024-05-18', registrationCount: 1 },
        { _id: '2024-05-19', registrationCount: 1 },
        { _id: '2024-04-19', registrationCount: 8 },
        { _id: '2024-03-27', registrationCount: 3 },
        { _id: '2024-05-16', registrationCount: 10 }
      ]
    } catch (error) {
      throw new Error('Error fetching jobseeker registrations data: ' + error.message);
    }
  },

   fetchEmploymentTypesDistribution : async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $group: {
            _id: "$employmentType", // Group by employment type
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 }, // Sort by count in descending order
        },
      ]);
  
    //   return results;
    return [ { _id: 'Temporary', count: 10 }, { _id: 'Contract', count: 3 },{
        _id: 'Part-Time', count:10
    } ,{        _id: 'Full-Time', count:30} ]
    } catch (error) {
      throw new Error('Error fetching employment types distribution data: ' + error.message);
    }
  },

   fetchSalaryRangeDistribution : async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $project: {
            averageSalary: {
              $avg: [
                { $toInt: { $arrayElemAt: [{ $split: ["$salaryRange", "-"] }, 0] } }, // Parse the minimum salary
                { $toInt: { $arrayElemAt: [{ $split: ["$salaryRange", "-"] }, 1] } }  // Parse the maximum salary
              ]
            }
          }
        },
        {
          $bucket: {
            groupBy: "$averageSalary", // Group by the calculated average salary
            boundaries: [0, 30000, 50000, 70000, 90000, 110000, 130000, 150000, 200000], // Define the bins
            default: "Others", // Bucket for any value not within the boundaries
            output: {
              count: { $sum: 1 },
            },
          },
        },
        {
          $sort: { _id: 1 }, // Sort bins by range
        },
      ]);
  
      return results;
    //   return [ { _id: 30000, count: 1 }, { _id: 50000, count: 1 } ]
    } catch (error) {
      throw new Error('Error fetching salary range distribution data: ' + error.message);
    }
  },
  
     fetchJobPostingsByLocation : async () => {
    try {
      const results = await JobModel.aggregate([
        {
          $group: {
            _id: "$location", // Group by the 'location' field
            count: { $sum: 1 }, // Count the number of job postings for each location
          },
        },
        {
          $sort: { count: -1 }, // Sort locations by the number of job postings in descending order
        },
      ]);
  
    //   return results;
      return [ 
        {
            "_id": "islamabad",
            "count": 2
        },{
            "_id": "Karachi",
            "count": 4
        },
        {
            "_id": "peshawar",
            "count": 2
        },{
            "_id": "New York",
            "count": 40
        },
    ]
    } catch (error) {
      throw new Error('Error fetching job postings by location: ' + error.message);
    }
  },
  
};

module.exports = AdminService;
