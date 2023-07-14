
// Express
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Socket io
const { Server } = require("socket.io");
const io = new Server(server);

// fs
const fs = require("fs");

var connections = {}

let usersDB = JSON.parse(fs.readFileSync('./data/players.json'));



app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/output/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/output/zpages/register.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');


    // Si il est déjà connecté on le redirige vers la page game


    data = {}

    socket.emit("connection", data)

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('login', (data) => {
        let accepted = false;

        usersDB.forEach((user) => {
        
        if (data.username == user.username  &&  data.password == user.password)
        {
            accepted = true;
        }})

        if (accepted)
        {
            console.log("accepted!!")
            socket.emit("loggedin", )
        }
        console.log(usersDB)
      })
});
  


server.listen(3000, () => {
    console.log('listening on *:3000');
});


