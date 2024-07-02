const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();


// Enable CORS for all origins or specific origins
app.use(cors({
    origin: 'http://localhost:8080', // Change this to your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));



const server = http.createServer(app);
//const io = socketIo(server);

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:8080', // Change this to your frontend URL
        methods: ['GET', 'POST']
    }
});



io.on('connection',(socket) => {
    console.log('New client connected');
    socket.on('message', (message) =>{
        console.log('Message received:', message);
        io.emit('message', message); // Broadcast the message to all clients
    });

    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    });
} );

server.listen(4000, ()=>{
    console.log('Server is running on port 4000');
});

