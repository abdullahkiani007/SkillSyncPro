class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase()

    if (lowerCaseMessage.includes('candidate skills')) {
      this.actionProvider.handleCandidateSkills()
    } else if (lowerCaseMessage.includes('education')) {
      this.actionProvider.handleCandidateEducation()
    } else if (lowerCaseMessage.includes('schedule interview')) {
      this.actionProvider.handleScheduleInterview()
    } else if (lowerCaseMessage.includes('applicant metrics')) {
      this.actionProvider.handleApplicantMetrics()
    } else {
      console.log('message in message parser ', message)
      this.actionProvider.handleDefaultResponse(message)
    }
  }
}

export default MessageParser
