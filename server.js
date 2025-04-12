// This is the brain of the message board
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let messages = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('initMessages', messages);

  socket.on('newMessage', (msg) => {
    const message = { text: msg, time: new Date().toISOString() };
    messages.push(message);
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
