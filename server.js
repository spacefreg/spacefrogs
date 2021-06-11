const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

//jquery
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);


const PORT = process.env.PORT || 29070;

//app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(request, response) {
    response.send(request.header('x-forwarded-for') || request.socket.remoteAddress);
});
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', socket => {
    socket.on('user-enter', username => {
        console.log(socket.id + " connected using name " + username);
    });
});