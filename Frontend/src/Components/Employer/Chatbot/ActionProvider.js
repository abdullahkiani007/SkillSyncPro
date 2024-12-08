import React from "react";
import ReactMarkdown from "react-markdown";
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleCandidateSkills = async () => {
    const message = this.createChatBotMessage("Fetching candidate skills...");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    try {
      const response = await fetch("/api/candidates/skills");
      if (!response.ok) {
        throw new Error("Failed to fetch candidate skills");
      }
      const skills = await response.json();

      const skillsMessage = this.createChatBotMessage(
        React.createElement(
          ReactMarkdown,
          null,
          `Here are the skills: ${skills.join(", ")}`
        )
      );

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, skillsMessage],
      }));
    } catch (error) {
      const errorMessage = this.createChatBotMessage(`Error: ${error.message}`);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  handleCandidateEducation = async () => {
    const message = this.createChatBotMessage(
      "Fetching candidate education..."
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    try {
      const response = await fetch("/api/candidates/education");
      if (!response.ok) {
        throw new Error("Failed to fetch candidate education");
      }
      const education = await response.json();

      const educationMessage = this.createChatBotMessage(
        React.createElement(
          ReactMarkdown,
          null,
          `Education details: ${education}`
        )
      );

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, educationMessage],
      }));
    } catch (error) {
      const errorMessage = this.createChatBotMessage(`Error: ${error.message}`);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  handleScheduleInterview = () => {
    const message = this.createChatBotMessage(
      "To schedule an interview, please select a date and time."
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    // Logic to trigger a scheduling modal or connect with a scheduling API can be added here
  };

  handleApplicantMetrics = async () => {
    const message = this.createChatBotMessage("Fetching applicant metrics...");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    try {
      const response = await fetch("/api/applicants/metrics");
      if (!response.ok) {
        throw new Error("Failed to fetch applicant metrics");
      }
      const metrics = await response.json();

      const metricsMessage = this.createChatBotMessage(
        React.createElement(
          ReactMarkdown,
          null,
          `Applicant metrics: ${JSON.stringify(metrics)}`
        )
      );

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, metricsMessage],
      }));
    } catch (error) {
      const errorMessage = this.createChatBotMessage(`Error: ${error.message}`);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  handleDefaultResponse = async (message) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    try {
      const response = await fetch("http://localhost:8000/queryRecruiterRag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from RAG");
      }

      const data = await response.json();
      console.log("data", data);
      const responseMessage = data.response.content;

      const markdownMessage = this.createChatBotMessage(
        React.createElement(ReactMarkdown, null, responseMessage)
      );

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, markdownMessage],
      }));
    } catch (error) {
      const errorMessage = this.createChatBotMessage(`Error: ${error.message}`);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };
}

export default ActionProvider;
