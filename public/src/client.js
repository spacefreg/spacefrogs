let socket = io();


//opening prompt vars
const openingPrompt = document.getElementById('opening-prompt');
const newUserBox = document.getElementById('new-user-box');
const newUserForm = document.getElementById('new-user-prompt');
const newUserButton = document.getElementById('new-user-btn');
const loadUserButton = document.getElementById('load-user-btn');

const canvas = document.getElementById('canvas');

loadUserButton.addEventListener('click', () => {
    socket.emit('client-request-usernames');
});

newUserButton.addEventListener('click', () => {
    newUserButton.classList.add('hide');
    loadUserButton.classList.add('hide');
    newUserBox.classList.remove('hide');
});

newUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(newUserBox.value);
    socket.emit('client-create-user', newUserBox.value);
    newUserBox.value = '';
    newUserBox.classList.add('hide');
    canvas.classList.remove('hide');
});




socket.on('server-pulse', numUsers => {
    console.log('pulse from server (connected users count): ' + numUsers);
});

socket.on('server-welcome', message => {
    console.log(message);
});