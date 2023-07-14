

function redirectEvent(socket)
{

    socket.on('redirectTo', (data)=>{
        window.location.href = data.url
    })


}