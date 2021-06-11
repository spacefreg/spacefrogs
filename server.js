//need to figure out a better way to do this
const DEBUG = false;


const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO(server);


//jquery
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);


const PORT = process.env.PORT || 29070;

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Listening on ${PORT}`));


http.get('http://ip-api.com/json', (res) => {
    console.log('ip-api GET status: ' + res.statusCode);

    res.on('data', (data) => {
        const IPdata = JSON.parse(data);
        //console.log(IPdata);
    });
});


io.on('connection', socket => {
    socket.on('c-user-enter', username => {
        let clientIP;
        if (DEBUG) {
            clientIP = '';
        } else {
            clientIP = socket.handshake.address;
        }


        console.log(`user connected with  name ${username} and IP: ${socket.handshake.address}`);

        http.get(`http://ip-api.com/json/${clientIP}`, (res) => {
            res.on('data', (data) => {
                const IPdata = JSON.parse(data);
                const IPstring = JSON.stringify(IPdata);
                console.log('anonymous user from ' + IPstring + ' connected');
                io.to(socket.id).emit('s-greetings', 'Anonymous user from ' + IPstring);
            });
        });
    });
});