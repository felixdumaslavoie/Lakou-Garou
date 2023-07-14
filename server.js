
// Express
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Socket io
const { Server } = require("socket.io");
const io = new Server(server);



app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/output/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    data = {}

    socket.emit("connection", data)

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});