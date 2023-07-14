console.log("HELLO!")

var ipAddress = "localhost"
var port = 3000

var socket = io.connect("http://localhost:3000"); 


socketEvents(socket)
redirectEvent(socket)


function sendConnectionData()
{
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value

  let data =  {
    "username" : username,
    "password" : password
  }

  socket.emit("login", data)
}