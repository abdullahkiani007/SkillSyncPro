const express = require('express');
const MessageRouter = express.Router()
const passport = require('passport');
const messageController = require('../../Controllers/MessageController');

MessageRouter.post("/room",passport.authenticate('jwt',{session:false}),messageController.createRoom)
MessageRouter.get("/room",passport.authenticate('jwt',{session:false}),messageController.getRoomByParticipants)
MessageRouter.post("/message",passport.authenticate('jwt',{session:false}),messageController.createMessage)
MessageRouter.get("/messages",passport.authenticate('jwt',{session:false}),messageController.getMessages)
MessageRouter.post("/checkRoom",passport.authenticate('jwt',{session:false}),messageController.checkRoom)
MessageRouter.get("/conversations",passport.authenticate('jwt',{session:false}),messageController.getConversations)
// MessageRouter.get('/conversation',passport.authenticate('jwt',{session:false}),messageController.getMessagesByRoomId)

module.exports = MessageRouter;