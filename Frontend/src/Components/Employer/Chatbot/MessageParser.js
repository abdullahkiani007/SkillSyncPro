class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("candidate skills")) {
      this.actionProvider.handleCandidateSkills();
    } else if (lowerCaseMessage.includes("education")) {
      this.actionProvider.handleCandidateEducation();
    } else if (lowerCaseMessage.includes("schedule interview")) {
      this.actionProvider.handleScheduleInterview();
    } else if (lowerCaseMessage.includes("applicant metrics")) {
      this.actionProvider.handleApplicantMetrics();
    } else {
      this.actionProvider.handleDefaultResponse(lowerCaseMessage);
    }
  }
}

export default MessageParser;
