const debug = true;

//backend imports
const userSchema = require('./schemas/user')


const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 29070;

const io = socketIO(server);

//my way of creating #defines (very bad!)
const BAD_INDEX = -1;


let dbString = debug ? "debugdb" : "productiondb";
let uri = "mongodb+srv://freg:test123@nrol-39.2degb.mongodb.net/" + dbString + "?retryWrites=true&w=majority";


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



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connection open with mongodb'));

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Listening on ${PORT}`));




const UserEntry = mongoose.model('UserEntry', userSchema);



io.on('connection', socket => {
    users.push(new ConnectedUser('anon', socket.id));
    console.log('anon connected. socket.id: ' + socket.id);
    io.to(socket.id).emit('server-welcome', `server says welcome. Your socket ID is ${socket.id}. There are ${users.length} users connected.`);


    socket.on('client-request-usernames', async () => {
        console.log(socket.id + ' requested usernames');
        //allUsers is an object that is an array of objects, each object being an entry
        const allUsers = await UserEntry.find({}, 'name -_id');
        const usernames = allUsers.map(user => user.name);
        io.to(socket.id).emit('server-username-list', usernames);
        console.log(usernames);
    });

    socket.on('client-create-user', (username) => {
        UserEntry.create(
            { name: username, 
              saveData: {
                  gameDate: 0,
                  country: "US",
                  startingTileX: 4,
                  startingTileY: 20
              } 
            });

        console.log(socket.id + ' created user entry with name: ' + username);
    });

    socket.on('disconnect', () => {
        let index = getPlayerIndexFromSocket(socket);
        console.log(socket.id + " disconnected");
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