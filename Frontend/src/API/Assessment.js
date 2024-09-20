import axios from "axios";

class Assessment {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "https://judge0-ce.p.rapidapi.com/",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "d8e74e9074mshf595e665fc62399p16aacejsne55ba7d0563b", // Ensure this matches your environment variable
      },
    });
  }

  submitCodeToJudge0 = async (code, language, stdin) => {
    code = `
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Test cases
console.assert(reverseString("hello") === "olleh", "Test Case 1 Failed");
console.assert(reverseString("world") === "dlrow", "Test Case 2 Failed");
console.assert(reverseString("OpenAI") === "IAn", "Test Case 3 Failed");
`;

    console.log("Submitting code to Judge0", code, language, stdin);
    const apiUrl = "submissions?base64_encoded=false&wait=true";

    try {
      // Send code submission request
      const response = await this.apiClient.post(apiUrl, {
        source_code: code,
        language_id: language, // You might need to map the language to Judge0's language ID
        stdin, // Input for the code (if any)
        expected_output: null,
      });

      const result = response.data;
      if (result.token) {
        return result.token;
      } else {
        throw new Error("Error submitting code to Judge0");
      }
    } catch (error) {
      console.error("Judge0 Submission Error:", error);
      // Handle the error appropriately in your application
      // For example, you might want to set an alert message or log the error
    }
  };

  checkSubmissionStatus = async (token) => {
    console.log("Checking Judge0 submission status");
    const apiUrl = `submissions/${token}?base64_encoded=false`;

    try {
      const response = await this.apiClient.get(apiUrl);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Judge0 Status Check Error:", error);
      // Handle the error appropriately in your application
      // For example, you might want to set an alert message or log the error
    }
  };
}

export default new Assessment();
