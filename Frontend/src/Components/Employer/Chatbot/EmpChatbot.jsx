import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./chatbotConfig"; // Import your chatbot config
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

function EmployerChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button
        onClick={toggleChatbot}
        className="p-3 rounded-full bg-blue-500 text-white shadow-lg focus:outline-none"
      >
        {isOpen ? "Close" : "Bot"}
      </button>

      {/* Conditionally render chatbot */}
      {isOpen && (
        <div className="mt-2">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
}

export default EmployerChatBot;
