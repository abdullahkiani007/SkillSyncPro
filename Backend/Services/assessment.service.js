const axios = require('axios');
const mongoose = require('mongoose');
const CandidateAssessment = require('../models/CandidateAssessment');

const JUDGE0_API_URL = 'https://ce.judge0.com/submissions';
const JUDGE0_API_KEY = 'your_api_key'; // If required

const AssessmentService = {
// Function to evaluate code
 evaluateCode : async (problemId, code, testCases)=> {
  const results = [];

  for (const testCase of testCases) {
    const submission = {
      source_code: code,
      language_id: testCase.language_id, // e.g., 63 for JavaScript
      stdin: testCase.input,
      expected_output: testCase.expectedOutput,
    };

    try {
      const response = await axios.post(
        `${JUDGE0_API_URL}?base64_encoded=false&wait=true`,
        submission,
        {
          headers: {
            'Content-Type': 'application/json',
            // 'X-API-Key': JUDGE0_API_KEY, // Uncomment if needed
          },
        }
      );

      results.push({
        problemId,
        code,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: response.data.stdout,
        status: response.data.status.description,
      });
    } catch (error) {
      console.error('Error in evaluating code:', error);
    }
  }

  return results;
},

// Store the results in the database
storeResults : async (applicationId, companyAssessmentId, results)=> {
  const candidateAssessment = new CandidateAssessment({
    application: applicationId,
    companyAssessment: companyAssessmentId,
    answers: results.map(result => ({
      problemId: result.problemId,
      code: result.code,
      input: result.input,
      expectedOutput: result.expectedOutput,
      actualOutput: result.actualOutput,
      status: result.status,
    })),
    score: results.filter(result => result.status === 'Accepted').length,
  });

  await candidateAssessment.save();
  return candidateAssessment;
}

};

module.exports = AssessmentService;