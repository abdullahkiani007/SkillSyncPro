import React from "react";

const Chat = ({
  selectedPerson,
  messages,
  messageInput,
  setMessageInput,
  sendMessage,
  sender,
  currentConversation,
}) => {
  console.log("Selected person", selectedPerson);
  console.log("Messages", messages);
  console.log("Current conv", currentConversation);
  return (
    <div className="flex-1 max-h-[calc(100vh-80px)] flex flex-col bg-gray-100 p-5 ">
      {selectedPerson ? (
        <>
          <div className="flex items-center border-b border-gray-300 pb-3 mb-5">
            <img
              src={selectedPerson.avatar}
              alt={selectedPerson.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <h2 className="text-xl font-semibold">{selectedPerson.name}</h2>
          </div>

          <div className="flex-1 overflow-y-auto mb-4">
            <div className="space-y-4">
              {messages.map((msg, idx) => {
                const user = msg.sender || "Unknown";
                const text = msg.content || "No content";
                return (
                  <div
                    key={idx}
                    className={`flex ${
                      user === sender._id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        user === sender._id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center border-t border-gray-300 pt-3">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Select a person to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
