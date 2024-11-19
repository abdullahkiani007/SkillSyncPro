import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "EmployerBot",
  initialMessages: [
    createChatBotMessage("Hello! How can I assist you today with hiring?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#5c9ded",
    },
    chatButton: {
      backgroundColor: "#5c9ded",
    },
  },
};

export default config;
