import { createChatBotMessage } from 'react-chatbot-kit'

const config = {
  botName: 'SkillSync',
  initialMessages: [
    createChatBotMessage('Hello! How can I assist you today with jobs?'),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: 'black',
    },
    chatButton: {
      backgroundColor: 'black',
    },
  },
}

export default config
