


function socketEvents(socket)
{   

    socket.on('connection', (socket) => {
    
        console.log("CONNECTION MADE!!")


    });

    socket.on('getSessionID', () => {
    
    var sessionID = sessionStorage.getItem('lakou-garou-session-id');

    let data = {}
    if (sessionID)
    {
        data = sessionID
    }

    socket.emit("getSessionID", data)
    });

    socket.on('setSessionID', (data) => {
    
        let session = { 
            "sessionID" : data.sessionID,
            "connnected" : true
        }
        sessionStorage.setItem('lakou-garou-session-id', session);

        socket.emit("setSessionID", {})
     });
}