const app = require("./app")
const http = require("http")
const { Server } = require("socket.io")
const PORT = process.env.PORT || 5050

// create http server
const server = http.createServer(app)

// connect to socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend address
    methods: ["GET", "POST"],
  },
})

// listen to connections
io.on("connection", (socket) => {
  socket.on("join-session", () => {
    socket.join("rehearsal")
  })

  socket.on("start-session", () => {
    io.emit("session-started")
  })

  socket.on("selected-song", (songId) => {
    // broadcast to all users
    io.to("rehearsal").emit("live-song", songId)
  })

  socket.on("end-session", () => {
    io.to("rehearsal").emit("session-ended")
  })
})

// run server
server.listen(PORT, () => {
  console.log(`Server running with WebSocket on port ${PORT}`)
})
