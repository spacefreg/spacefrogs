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

newUserForm.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('client-create-user', newUserBox.value);
    hideMenuElement(newUserBox);
    showMenuElement(canvas);
});

dbUsernamesList.addEventListener('click', e => {
    if (e.target.tagName == 'BUTTON') {
        console.log('requesting to load file from server: ' + e.target.textContent);
        socket.emit('client-request-saveFile', e.target.textContent);
        hideMenuElement(dbUsernamesList);
        showMenuElement(canvas);
    }
});


socket.on('server-pulse', numUsers => {
    console.log('pulse from server (connected users count): ' + numUsers);
});

socket.on('server-welcome', message => {
    console.log(message);
});

socket.on('server-username-list', userEntries => {
    showMenuElement(dbUsernamesList);
    for(let i = 0; i < userEntries.length; i++) {
        //first create a div to contain the username, the date the save was created, and the current save game date
        let userEntryDiv = document.createElement('div');
        userEntryDiv.setAttribute('id', userEntries[i].name + '-div');
        dbUsernamesList.appendChild(userEntryDiv);

        //create the username button and place in this entry's div
        let usernameButton = document.createElement('button');
        usernameButton.textContent = userEntries[i].name;
        userEntryDiv.appendChild(usernameButton);

        //add some helpful info about the save entry to the div
        let userSaveInfo = document.createElement('p');
        userSaveInfo.textContent += 'Created: ' + userEntries[i].createdAt;
        userSaveInfo.textContent += ' - Game Date: ' + userEntries[i].saveData.gameDate;
        userEntryDiv.appendChild(userSaveInfo);

    }
    console.log(userEntries);
});

socket.on('server-dispatch-saveFile', file => {
    console.log('received save file from server');
    console.log(file);
});

//helper functions

function hideMenuElement(element) {
    element.classList.add('hide');
}

function showMenuElement(element) {
    element.classList.remove('hide');
}