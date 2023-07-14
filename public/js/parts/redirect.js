

function redirectEvent(socket)
{

    socket.on('redirectTo', (data)=>{
        window.location.replace(data.url)
    })


}