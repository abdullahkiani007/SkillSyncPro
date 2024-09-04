const messageService = require('../Services/message.service');

const MessageController = {
    async createRoom(req, res, next) {
        try {
            const { participants } = req.body;
            const response = await messageService.createRoom(participants);
            if (response._id) {
                res.status(200).json({
                    "message": "Room created successfully",
                    "data": response
                });
                return;
            }
            res.status(500).json({
                "message": "Failed to create room"
            });
        } catch (error) {
            console.error('Error creating room:', error);
            res.status(500).json({
                "message": "Internal server error"
            });
        }
    },

    async getRoomByParticipants(req, res, next) {
        try {
            const { participants } = req.body;
            const response = await messageService.getRoomByParticipants(participants);
            if (response) {
                res.status(200).json({
                    "data": response
                });
                return;
            }
            res.status(404).json({
                "message": "Room not found"
            });
        } catch (error) {
            console.error('Error getting room by participants:', error);
            res.status(500).json({
                "message": "Internal server error"
            });
        }
    },

    async createMessage(req, res, next) {
        try {
            const data = req.body;
            const response = await messageService.createMessage(data);
            if (response._id) {
                res.status(200).json({
                    "message": "Message sent successfully",
                    "data": response
                });
                return;
            }
            res.status(500).json({
                "message": "Failed to send message"
            });
        } catch (error) {
            console.error('Error creating message:', error);
            res.status(500).json({
                "message": "Internal server error"
            });
        }
    },

    async getMessages(req, res, next) {
        console.log("Getting messages in controller:");
        console.log(req.query);
        try {
            const { roomId } = req.query;
            const response = await messageService.getMessages(roomId);
            if (response) {
                res.status(200).json({
                    "data": response
                });
                return;
            }
            res.status(404).json({
                "message": "Messages not found"
            });
        } catch (error) {
            console.error('Error getting messages:', error);
            res.status(500).json({
                "message": "Internal server error"
            });
        }
    },

    async checkRoom(req, res, next) {
        try {
            console.log("Checking room for participants in controller:", req.body);
            const participants  = req.body;

            const response = await messageService.checkRoom(participants);
            if (response) {
                res.status(200).json({
                   response
                });
                return;
            }
            res.status(500).json({
                "message": "Failed to establish conversation"
            });
        } catch (error) {
            console.error('Error checking room:', error);
            res.status(500).json({
                "message": "Internal server error"
            });
        }
    },

    async getConversations(req,res,next){
        try{
            const {_id} = req.user;
            const response = await messageService.getConversations(_id);
            if (response){
                res.status(200).json({
                    response
                })
                return ;
            }
            console.log("No chat found");
            console.log(response)
            res.status(404).json({
                "message":"No chat found"
            })
        }catch(err){
            console.log(err);
            res.status(500).json({
                "message":"Internal server error"
            })
        }
    }

};

module.exports = MessageController;