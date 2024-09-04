const roomModel = require("../Models/room.model");
const messageModel = require("../Models/message.model");
const userModel = require("../Models/user.model");


const messageService = {
    async createRoom(participants) {
      try {
        const sortedParticipants = participants.sort();
        const room = new roomModel({ participants: sortedParticipants });
        const response = await room.save();
        return response;
      } catch (error) {
        console.error("Error creating room:", error);
        throw new Error("Could not create room. Please try again later.");
      }
    },
    
    async getRoomByParticipants(participants) {
      try {
        const sortedParticipants = participants.sort();
        const room = await roomModel.findOne({ participants: { $all: sortedParticipants } });
        return room;
      } catch (error) {
        console.error("Error finding room by participants:", error);
        throw new Error("Could not retrieve room. Please try again later.");
      }
    },
  
    async createMessage(data) {
      try {
        const message = new messageModel(data);
        const response = await message.save();
        return response;
      } catch (error) {
        console.error("Error creating message:", error);
        throw new Error("Could not create message. Please try again later.");
      }
    },
  
    async getMessages(roomId) {
      console.log("Getting messages for room:", roomId);
      try {
        const messages = await messageModel.find({ room: roomId }).sort({ createdAt: 1 });
        console.log("Messages:", messages);
        return messages;
      } catch (error) {
        console.error("Error retrieving messages:", error);
        throw new Error("Could not retrieve messages. Please try again later.");
      }
    },
  
    async checkRoom(participants) {
      try {
        let room = await this.getRoomByParticipants(participants);
        if (!room) {
          room = await this.createRoom(participants);
        }
        return room;
        
      } catch (error) {
        console.error("Error handling conversation:", error);
        throw new Error("Could not handle conversation. Please try again later.");
      }
    },

        async getConversations(userId) {
          console.log("get conversation for user : ", userId);

        try {
            // Find all rooms where the user is a participant
            const rooms = await roomModel.find({ participants: userId });


    
            // Create an array to store the chat people with the last message
            const chatPeopleWithLastMessage = await Promise.all(
                rooms.map(async (room) => {
                    // Find the last message in this room
                    const lastMessage = await messageModel.findOne({ roomId: room._id })
                        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
                        .limit(1); // Get the most recent message
    
                    // Get the other participant in the room
                    const otherParticipantId = room.participants.find(participant => participant.toString() !== userId.toString());
                    // Fetch the participant's details
                    const otherParticipant = await userModel.findById(otherParticipantId);
    
                    return {
                        participantId: otherParticipantId,
                        participantName: otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown',
                        avatar: otherParticipant ? otherParticipant.profilePicture : null,
                        lastMessage: lastMessage ? lastMessage.text : null,
                        lastMessageTime: lastMessage ? lastMessage.createdAt : null,
                        roomId: room._id
                    };
                })
            );
    
            return chatPeopleWithLastMessage;
        } catch (error) {
            console.error("Error retrieving chat people with last message:", error);
            throw new Error("Could not retrieve chat people with last message. Please try again later.");
        }
    }

,
    async  getConversationWithPerson(userId, otherParticipantId) {
      console.log("Getting conversation between users:", userId, "and", otherParticipantId);
  
      try {
          // Find the room where both users are participants
          const room = await roomModel.findOne({
              participants: { $all: [userId, otherParticipantId] }
          });
  
          if (!room) {
              throw new Error("No conversation found between these users.");
          }
  
          // Find all messages in this room, sorted by creation date
          const messages = await messageModel.find({ roomId: room._id })
              .sort({ createdAt: 1 }); // Sort by createdAt in ascending order to get the conversation flow
  
          return {
              participantId: otherParticipantId,
              roomId: room._id,
              messages: messages.map(message => ({
                  senderId: message.user,
                  text: message.text,
                  timestamp: message.createdAt
              }))
          };
      } catch (error) {
          console.error("Error retrieving conversation with person:", error);
          throw new Error("Could not retrieve the conversation. Please try again later.");
      }
  }
  
  };
  
  module.exports = messageService;
  