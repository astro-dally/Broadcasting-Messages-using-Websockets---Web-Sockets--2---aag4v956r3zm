const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle a basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  //connected
  console.log("A User Connected.")
  //to listen te message from the Client
  socket.on('message', (message) => {
    console.log(`Recieved new ${message}`)
    //broadcast the message to other clients.
    socket.broadcast.emit('message', message)
  })
  //disconnected
  socket.on('disconnect', () => {
    console.log("User Disconnected")
  })
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app }