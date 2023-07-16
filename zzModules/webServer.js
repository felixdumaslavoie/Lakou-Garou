// Express
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const permissionsPolicy = require("permissions-policy");


const webServer  = (dirname) => {

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    app.use(
        permissionsPolicy({
        features: {
            fullscreen: ["self",], // fullscreen=()
            vibrate: ["none"], // vibrate=(none)
            syncXhr: [], // syncXhr=()
        },
        })
    );

    app.use(express.static(dirname + '/public'));



    app.get('/', (req, res) => {
        res.sendFile(dirname + '/output/index.html');
    });

    app.get('/register', (req, res) => {
        res.sendFile(dirname + '/output/zpages/register.html');
    });

    app.get('/lobby', (req, res) => {
        res.sendFile(dirname + '/output/zpages/lobby.html');
    });

    app.get('/game', (req, res) => {
        res.sendFile(__dirname + '/output/zpages/game.html');
    });

    server.listen(3000, () => {
        console.log('listening on *:3000');
    });


    return server;
}

module.exports = webServer