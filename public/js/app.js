console.log("HELLO!")

var ipAddress = "localhost"
var port = 3000

var socket = io.connect("http://localhost:3000");

socket.on('connection', (socket) => {

    console.log("CONNECTION!!")

  });

