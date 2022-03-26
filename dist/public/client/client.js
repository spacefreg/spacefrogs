//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import sfcNewUser from '../core/messages/client/sfcnewuser.js';
//(3/25/22) begin space bouncer code
//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer = document.getElementById('spacebouncer');
const inpForm = document.getElementById('name-form');
const inpFormVal = document.getElementById('textbox');
const anonButton = document.getElementById('anon-button');
const introVideo = document.getElementById('fullscreen-video-intro');
inpForm.onsubmit = submitPlayerName;
anonButton.onclick = goAnon;
const socket = io();
function submitPlayerName(e) {
    e.preventDefault();
    createGameHTML();
    const name = inpFormVal.value;
    const newUserMessage = new sfcNewUser(socket.id, name);
    socket.emit('sfcNewUser', newUserMessage);
    //gc.receiveIDFromUser(name);
}
function goAnon(e) {
    e.preventDefault();
    createGameHTML();
    const newUserMessage = new sfcNewUser(socket.id, 'anon');
    socket.emit('sfcNewUser', newUserMessage);
    //gc.receiveIDFromUser('anon');
}
//(3/25/22) end space bouncer code
function createGameHTML() {
    introVideo.remove();
    spaceBouncer.remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'sf-canvas';
    canvas.width = 1366;
    canvas.height = 768;
    document.body.append(canvas);
}
socket.on('sfNewUserInvite', () => {
    console.log('a game is in progress. would you like to join?');
});
socket.on('sfNewOrLoadGame', () => {
    console.log('create a new or load an existing game?');
});
