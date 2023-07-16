// Devrait être renommé pour login.js

console.log("HELLO!")

var ipAddress = "lakou-garou.duckdns.org"
var port = 3000


var socket = io.connect("https://" + ipAddress); 


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