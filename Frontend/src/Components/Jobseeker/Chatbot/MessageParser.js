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
      console.log("message in message parser ", message);
      this.actionProvider.handleDefaultResponse(message);
    }
  }
}

export default MessageParser;
