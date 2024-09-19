const express = require('express')
const app = express()
const router = express.Router()
const routes = require('./Routes/index')
const connectToDb = require('./Db/connect')
const errorMiddleware = require('./Middleware/error.middleware')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')

// service functions
const messageService = require('./Services/message.service')

// craete a server
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use(passport.initialize())
require('./Config/passport')(passport) // This applies the JWTStrategy
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.use('/api', routes)

app.use(errorMiddleware.handle)

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`)
  })

  // Handling notifications
  socket.on('send_notification', (data) => {
    io.to(data.userId).emit('notification', data)
  })

  // Handling messaging
  socket.on('join_room', (room) => {
    socket.join(room)
    console.log(`Client ${socket.id} joined room ${room}`)
  })

  socket.on('send_message', (data) => {
    console.log(data)
    console.log(`Client ${socket.id} sent message to room ${data.room}`)
    try {
      messageService.createMessage(data)
    } catch (err) {
      console.log(err)
    }

    // Broadcast the message to everyone in the room, including the sender
    io.to(data.room).emit('new_message', data)
  })
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
  connectToDb()
})
