class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage == "clear") {
      console.log("Clearing messages");
      this.actionProvider.handleClearMessages();
    } else {
      console.log("Parsing message");
      this.actionProvider.handleDefaultResponse(lowerCaseMessage);
    }
  }
}

export default MessageParser;
