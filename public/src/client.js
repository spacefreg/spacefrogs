let socket = io();


//opening prompt vars
const openingPrompt = document.getElementById('opening-prompt');
const newUserBox = document.getElementById('new-user-box');
const newUserForm = document.getElementById('new-user-prompt');
const newUserButton = document.getElementById('new-user-btn');
const loadUserButton = document.getElementById('load-user-btn');
const dbUsernamesList = document.getElementById('db-usernames-list');

const canvas = document.getElementById('canvas');


loadUserButton.addEventListener('click', () => {
    socket.emit('client-request-usernames');
    hideMenuElement(loadUserButton);
    hideMenuElement(newUserButton);
    //at this point, now waiting on server to emit server-username-list
});

newUserButton.addEventListener('click', () => {
    hideMenuElement(newUserButton);
    hideMenuElement(loadUserButton);
    showMenuElement(newUserBox);
});

newUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('client-create-user', newUserBox.value);
    hideMenuElement(newUserBox);
    showMenuElement(canvas);
});


socket.on('server-pulse', numUsers => {
    console.log('pulse from server (connected users count): ' + numUsers);
});

socket.on('server-welcome', message => {
    console.log(message);
});

socket.on('server-username-list', usernames => {
    showMenuElement(dbUsernamesList);
    for(let i = 0; i < usernames.length; i++) {
        let li = document.createElement('button');
        li.textContent = usernames[i];
        dbUsernamesList.appendChild(li);
    }
    console.log(usernames);
});

//helper functions

function hideMenuElement(element) {
    element.classList.add('hide');
}

function showMenuElement(element) {
    element.classList.remove('hide');
}