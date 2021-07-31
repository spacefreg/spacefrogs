const debug = false;

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

//my way of creating #defines (very bad!)
const BAD_INDEX = -1;

let uri;

if (debug) {
    uri = "mongodb+srv://freg:test123@nrol-39.2degb.mongodb.net/debugdb?retryWrites=true&w=majority";
}
else {
    uri = "mongodb+srv://freg:test123@nrol-39.2degb.mongodb.net/productiondb?retryWrites=true&w=majority";
}

let users = new Array();
class ConnectedUser {
    constructor(name, socketid) {
        this.name = name;
        this.socketid = socketid;
    }
}

function getPlayerIndexFromSocket(socket) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].socketid == socket.id) {
            return i;
        }
    }
    return BAD_INDEX;
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

    // Anon.create({ name: socket.id, age: 69 })
    //     .then(data => {
    //         console.log('successful insert');
    //         console.log(data);
    // });

    socket.on('disconnect', () => {
        let index = getPlayerIndexFromSocket(socket);

        if (index != BAD_INDEX) {
            users.splice(index, 1);
        }
    });
});



setInterval(sendPulse, 1000);

function sendPulse() {
    if (users.length > 0) {
        io.sockets.emit('server-pulse', users.length);
    }
}