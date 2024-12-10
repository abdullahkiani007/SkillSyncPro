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

    // Fetch skills from backend (replace with actual endpoint)
    const response = await fetch("/api/candidates/skills");
    const skills = await response.json();

    this.setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        this.createChatBotMessage(`Here are the skills: ${skills.join(", ")}`),
      ],
    }));
  };

  handleCandidateEducation = async () => {
    const message = this.createChatBotMessage(
      "Fetching candidate education..."
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    const response = await fetch("/api/candidates/education");
    const education = await response.json();

    this.setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        this.createChatBotMessage(`Education details: ${education}`),
      ],
    }));
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

    const response = await fetch("/api/applicants/metrics");
    const metrics = await response.json();

    this.setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        this.createChatBotMessage(
          `Applicant metrics: ${JSON.stringify(metrics)}`
        ),
      ],
    }));
  };

  handleClearMessages = () => {
    this.setState((prev) => ({ ...prev, messages: [] }));
    localStorage.removeItem("chat_messages");
  };

  handleDefaultResponse = async (message) => {
    // const message = this.createChatBotMessage(messagee);
    console.log("message", message);

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    const response = await fetch("http://localhost:8000/queryJobSeekerRag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
      }),
    });

    let data = await response.json();
    console.log("data from rag", data.response.content);
    data = data.response.content;
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, this.createChatBotMessage(data)],
    }));
  };
}

export default ActionProvider;
