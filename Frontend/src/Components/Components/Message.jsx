import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import { useSocket } from "../../Context/SocketContext";
import { useSearchParams } from "react-router-dom";
import Message from "../../API/message";
import PeopleList from "./PeopleList";
import Chat from "./Chat";

const MessageComponent = () => {
  const [roomId, setRoomId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  let [searchParams, setSearchParams] = useSearchParams();

  const store = useStore((state) => state.user).getState();
  const sender = store.user;
  const receiverId = searchParams.get("id");

  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const socket = useSocket();

  // check if the room exists and join the room
  useEffect(() => {
    const checkRoom = async () => {
      console.log("Check rooms");
      try {
        const token = localStorage.getItem("accessToken");
        const participants = [receiverId, sender._id];

        const response = await Message.checkRoom(participants, token);
        const roomData = response.data.response;

        // Set room ID and participants for the conversation
        setRoomId(roomData.roomId);
        setPeople(roomData.participants);
        setSelectedPerson({ _id: receiverId, room: roomData.roomId });
      } catch (error) {
        console.error("Error checking room:", error);
      }
    };

    if (receiverId) {
      checkRoom();
    }
  }, [receiverId, sender._id]);

  // Effect to fetch contact list of sender
  useEffect(() => {
    const fetchConversations = async () => {
      console.log("Fetching conversations");
      try {
        const token = localStorage.getItem("accessToken");
        const response = await Message.getConversations(token);
        const conResponse = response.data.response;
        console.log("Conversations", conResponse);

        setConversations(conResponse);
        const currentConversation = conResponse.find((con) =>
          con.participants.includes(receiverId)
        );
        setSelectedConversation(currentConversation);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoadingPeople(false);
      }
    };

    fetchConversations();
  }, []);

  // Effect to join room and fetch messages
  useEffect(() => {
    console.log("I am getting called");
    if (socket && selectedPerson?.room) {
      const joinRoom = () => {
        socket.emit("join_room", selectedPerson.room);
      };

      const fetchMessages = async () => {
        try {
          console.log("Fetching messages");
          const token = localStorage.getItem("accessToken");
          console.log("Room ID", selectedPerson.room);
          console.log("fetching messages for perosn", selectedPerson);
          const response = await Message.getMessages(
            token,
            selectedPerson.room
          );
          const messages = response.data.data;
          console.log("Messages", response);
          setMessages(messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      joinRoom();
      fetchMessages();

      socket.on("new_message", (message) => {
        if (message.sender == sender._id) return;
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("new_message");
      };
    }
  }, [socket, selectedPerson]);

  const sendMessage = () => {
    console.log("Sending message");
    console.log("Selected person", selectedPerson);

    if (socket && messageInput.trim() && selectedPerson?.room) {
      const message = {
        sender: sender._id,
        recipient: selectedPerson._id,
        content: messageInput,
        room: selectedPerson.room,
      };
      socket.emit("send_message", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* People List */}
      <PeopleList
        conversations={conversations}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
      />
      <Chat
        selectedPerson={selectedPerson}
        messages={messages}
        sender={sender}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
        currentConversation={selectedConversation}
      />
    </div>
  );
};

export default MessageComponent;
