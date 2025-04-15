const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 5050;

// create http server
const server = http.createServer(app);

// connect to socket.io
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // frontend address
        methods: ['GET', 'POST']
    }
});

// listen to connections
io.on('connection', (socket) => {
    console.log('A used connected:', socket.id);

    socket.on('live-song', (songId) => {
        // broadcast to all users
        socket.broadcast.emit('live-song', songId);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});


// run server
server.listen(PORT, () => {
    console.log(`Server running with WebSocket on port ${PORT}`);
});