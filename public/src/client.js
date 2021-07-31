let socket = io();

//opening prompt vars
const openingPrompt = document.getElementById('opening-prompt');
const newUserBox = document.getElementById('new-user-box');
const newUserButton = document.getElementById('new-user-btn');
const loadUserButton = document.getElementById('load-user-btn');



socket.on('server-pulse', numUsers => {
    console.log('pulse from server (connected users count): ' + numUsers);
});

socket.on('server-welcome', message => {
    console.log(message);
});