const path = require('path');
const http = require('http');
const express = require('express');
//const socketIO = require('socket.io');
const mongoose = require('mongoose');

//jquery
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 29070;

//const io = socketIO(server);
const uri = "mongodb+srv://freg:test123@nrol-39.2degb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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

Anon.insertMany([
    { name: 'Freg', age: 24 },
    { name: 'Bozay', age: 25} ,
    { name: 'cowboy', age: 1337 }
])
    .then(data => {
        console.log('insertMany successful');
        console.log(data);
    });


//mothballing socket.io until some kind of multiplayer is added (7/25/21)

// io.on('connection', socket => {
//     socket.on('c-message', msg => {
//         console.log(`anonymous user sent: ${msg}`);
//         io.sockets.emit('s-message', msg);
//     });
// });