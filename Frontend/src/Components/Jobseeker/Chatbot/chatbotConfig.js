import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "SkillSync",
  initialMessages: [
    createChatBotMessage("Hello! How can I assist you today with jobs?"),
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
