import React, { useState } from "react";

const PeopleList = ({ conversations, selectedPerson, setSelectedPerson }) => {
  const [loadingPeople, setLoadingPeople] = useState(false);

  const handleClick = (conversation) => {
    console.log("Clicked on conversation: ");
    // setSelectedPerson({
    //   _id: conversation.participantId,
    //   room: conversation.roomId,
    //   name: conversation.participantName,
    //   avatar: conversation.avatar,
    // })

    console.log("Selected person: ", conversation);
  };

  return (
    <div className="w-1/4 bg-gray-900 text-white p-5 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">People</h2>
      {loadingPeople ? (
        <p className="text-sm">Loading...</p>
      ) : conversations.length === 0 ? (
        <p className="text-sm">No conversation found</p>
      ) : (
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.roomId}
              className={`flex items-center p-3 mb-3 rounded cursor-pointer ${
                selectedPerson?._id === conversation.participantId
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => {
                handleClick(conversation);
                setSelectedPerson({
                  _id: conversation.participantId,
                  room: conversation.roomId,
                  name: conversation.participantName,
                  avatar: conversation.avatar,
                });
              }}
            >
              <img
                src={conversation.avatar || "/default-avatar.png"} // Replace with a default image if none exists
                alt={conversation.participantName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-medium">
                {conversation.participantName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PeopleList;
