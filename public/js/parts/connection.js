


function socketEvents(socket)
{   

    socket.on('connection', (socket) => {
    
        console.log("CONNECTION MADE!!")

        let id = "rHinXiaPHnw1qo2w9pbG5MVZDSdIlame0OeiMjgxh2WZbdaewP4xY3S5zQYuzCtUt1ShR6g2JAXWFP1m94nqNnpzkhQq2pWz6QnR"
        socket.emit("connectionID", {"id": id} )
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