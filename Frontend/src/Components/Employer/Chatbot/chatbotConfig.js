import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "EmployerBot",
  initialMessages: [
    createChatBotMessage("Hello! How can I assist you today with hiring?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#2C2C2C", // Dark gray for the message box to provide contrast
      borderRadius: "10px", // Rounded corners for a modern look
      padding: "10px", // Comfortable padding for text
      color: "white", // White text for visibility against the dark background
      fontFamily: "Arial, sans-serif", // Clean, modern font
      fontSize: "14px", // Slightly larger text for readability
    },
    chatButton: {
      backgroundColor: "#4CAF50", // Green button for a professional and positive tone
      color: "white", // White text on button for contrast
      borderRadius: "50px", // Circular button for a more interactive look
      padding: "12px 24px", // Adjust padding to make the button prominent
      fontSize: "16px", // Larger text for better readability
      cursor: "pointer", // Pointer cursor on hover to indicate interactiveness
    },
    // You can add styles for other components if needed
    chatHeader: {
      backgroundColor: "#1F1F1F", // Darker header for a clean look
      color: "white", // White text for header
      fontSize: "18px", // Clear header text
      padding: "10px", // Padding for comfortable header spacing
      textAlign: "center", // Centered text in header
    },
  },
  widgets: [
    // Add widgets if necessary for the functionality of the bot
  ],
};

export default config;
