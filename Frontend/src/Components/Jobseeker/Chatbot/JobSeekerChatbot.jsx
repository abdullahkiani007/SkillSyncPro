import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./chatbotConfig"; // Import your chatbot config
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import chatbotImg from "../../../assets/chatbot.png";

function JobSeekerChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const saveMessages = (messages, HTMLString) => {    localStorage.setItem('chat_messages', JSON.stringify(messages));  };
  const loadMessages = () => {    const messages = JSON.parse(localStorage.getItem('chat_messages'));    return messages;  };


  const toggleChatbot = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-4 right-4 z-50">
         {/* Conditionally render chatbot */}
      {isOpen && (
        
        <div className="mt-2 flex">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            saveMessages={saveMessages}
            messageHistory={loadMessages()}
          />
            <p onClick={toggleChatbot} className="fixed right-8 hover:cursor-pointer">❌</p>
        </div>
      )}

      {/* Toggle button */}
      {!isOpen &&
      <img
      src={chatbotImg}
      alt="chatbot"
        onClick={toggleChatbot}
        className={`p-3 rounded-full w-[80px] md:w-[120px] text-white shadow-lg focus:outline-none`}
      />
      }
     

     
    </div>
  );
}

export default JobSeekerChatBot;
