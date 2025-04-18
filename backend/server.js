const app = require("./app")
const http = require("http")
const mongoose = require("mongoose")
const { Server } = require("socket.io")
const SocketSignals = require("./utils/socketSignals")
const PORT = process.env.PORT || 5050

require("dotenv").config()

// create http server
const server = http.createServer(app)

// connect to socket.io
const io = new Server(server, {
  cors: {
    origin: "https://jamoveo-eight.vercel.app", // frontend address
    methods: ["GET", "POST"],
  },
})

// listen to connections
io.on("connection", (socket) => {
  socket.on(SocketSignals.JOIN_SESSION, () => {
    socket.join("rehearsal")
  })

  socket.on(SocketSignals.START_SESSION, () => {
    io.emit(SocketSignals.SESSION_STARTED)
  })

  socket.on(SocketSignals.SELECTED_SONG, (songId) => {
    // broadcast to all users
    io.to("rehearsal").emit(SocketSignals.LIVE_SONG, songId)
  })

  socket.on(SocketSignals.END_SESSION, () => {
    io.to("rehearsal").emit(SocketSignals.SESSION_ENDED)
  })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    server.listen(PORT, () => {
      console.log(`Server running with WebSocket on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
  })
