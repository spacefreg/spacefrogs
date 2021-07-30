const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

//jquery
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 29070;

const io = socketIO(server);
const uri = "mongodb+srv://freg:test123@nrol-39.2degb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let users = new Array();
class ConnectedUser {
    constructor(name, socketid) {
        this.name = name;
        this.socketid = socketid;
    }
}

function getPlayerIndexFromSocket(socket) {
    let returnVal = -1;

    for (let i = 0; i < users.length; i++) {
        if (users[i].socketid == socket.id) {
            returnVal = i;
        }
    }
    return returnVal;
}



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection open with mongodb');
    })
    .catch(err => {
        console.log('oh no didnt connect!');
    })

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Listening on ${PORT}`));


const testSchema = mongoose.Schema({
    name: String,
    age: Number
});

const Anon = mongoose.model('Anon', testSchema);



// Anon.insertMany([
//     { name: 'Freg', age: 24 },
//     { name: 'Bozay', age: 25} ,
//     { name: 'cowboy', age: 1337 }
// ])
//     .then(data => {
//         console.log('insertMany successful');
//         console.log(data);
//     });


io.on('connection', socket => {
    users.push(new ConnectedUser('anon', socket.id));
    console.log('anon connected. socket.id: ' + socket.id);
    io.to(socket.id).emit('server-welcome', `server says welcome. Your socket ID is ${socket.id}. There are ${users.length} users connected.`);

    socket.on('disconnect', () => {
        let index = getPlayerIndexFromSocket(socket);

        if (index != -1) {
            users.splice(index, 1);
        }
    });
});



setInterval(sendPulse, 1000);

function sendPulse() {
    if (users.length > 0) {
        console.log('emitting server-pulse with user count: ' + users.length);
        io.sockets.emit('server-pulse', users.length);
    }
}