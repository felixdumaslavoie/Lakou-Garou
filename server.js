
var webServer = require("./zzModules/webServer")


const server = webServer(__dirname);


// Socket io
const { Server } = require("socket.io");
const io = new Server(server);

// fs
const fs = require("fs");

// crypto
var crypto = require('crypto');

var generate_key = function() {
    // 16 bytes is likely to be more than enough,
    // but you may tweak it to your needs
    return crypto.randomBytes(16).toString('base64');
};

var connections = {}

let usersDB = JSON.parse(fs.readFileSync('./data/players.json'));


function readUserDB()
{
    usersDB = JSON.parse(fs.readFileSync('./data/players.json'));
}


function testConnection(user)
{
    let accepted = false;

    let theUser = {}
    
    usersDB.forEach((data) => {
    
    if (data.username == user.username  &&  data.password == user.password)
    {
        accepted = true;
        theUser = user
    }})

    return { "accepted": accepted, "user": user }
}

function getUserID(socketData) {
    readUserDB();
    let response = testConnection(socketData)

    return response.user.id
}


function login(socket)
{
    console.log("login")
    let redirection = { "url": "/lobby"}
    socket.emit("redirectTo", redirection)
}



io.on('connection', (socket) => {
  
            console.log("Connection made with a client")
        
            socket.emit("getSessionID", {});

            socket.on("getSessionID", (data)=> {

                if (connections[data.sessionID] && !connections[data.sessionID].connected)
                {

                    console.log("in connection")
                    connections[data.sessionID].connected = true 
                    
                    let redirection = { "url": "/game"}
                    socket.emit("redirectTo", redirection)
                }
                else 
                {
                    // Afficher un message sur le front end pour dire que l'utilisateur est déjà connecté ailleurs
                }

                console.log("Ca a fonctionne")
            })
            

            socket.on("login", (data)=> {
            
                if (testConnection(data).accepted)
                {
                    let sessionID = generate_key() 
                    connections[sessionID] = { "user": getUserID(data), "connected": true}

                    console.log("accepted!!")
                    socket.emit("setSessionID", { "sessionID" : sessionID})

                    login(socket)

                }
                    console.log(usersDB)
                }

            )
            

            socket.on('disconnect', () => {
                console.log('user disconnected');
              });
    })
    
   

    


      

  
