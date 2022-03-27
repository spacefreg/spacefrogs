//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import sfcNewUser from '../core/messages/client/sfcnewuser.js';
import sfcCreateCampaign from '../core/messages/client/sfccreatecampaign.js';
//(3/25/22) begin space bouncer code
//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer = document.getElementById('spacebouncer');
const introVideo = document.getElementById('fullscreen-video-intro');
const selfUsername = document.getElementById('name-form');
const inpFormVal = document.getElementById('textbox');
selfUsername.onsubmit = submitPlayerName;
const socket = io();
function submitPlayerName(e) {
    e.preventDefault();
    const name = inpFormVal.value;
    const newUserMessage = new sfcNewUser(socket.id, name);
    socket.emit('sfcNewUser', newUserMessage);
}
//(3/25/22) end space bouncer code
function beginFrogCampaign(e) {
    e.preventDefault();
    const campaignTextbox = document.getElementById('campaign-textbox');
    const campName = campaignTextbox.value;
    const createCampaignMessage = new sfcCreateCampaign(socket.id, campName);
    socket.emit('sfcCreateCampaign', createCampaignMessage);
    console.log('creating a lobby!');
    const gameStartup = document.getElementById('game-startup');
    gameStartup.remove();
    createGameHTML();
}
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
    spaceBouncer.remove();
    const requestToJoinDiv = document.createElement('div');
    document.body.appendChild(requestToJoinDiv);
    const requestToJoinPrompt = document.createElement('p');
    requestToJoinPrompt.id = 'request-to-join-prompt';
    requestToJoinPrompt.textContent = 'There is a game in progress. Do you wish to join?';
    requestToJoinDiv.appendChild(requestToJoinPrompt);
    const requestToJoinButton = document.createElement('button');
    requestToJoinButton.id = 'request-to-join-button';
    requestToJoinButton.textContent = 'Request to Join';
    requestToJoinDiv.appendChild(requestToJoinButton);
});
socket.on('sfNewOrLoadGame', () => {
    spaceBouncer.remove();
    console.log('create a new or load an existing game?');
    const gameStartup = document.createElement('div');
    gameStartup.id = 'game-startup';
    const campaignTextbox = document.createElement('input');
    campaignTextbox.id = 'campaign-textbox';
    campaignTextbox.type = 'text';
    campaignTextbox.placeholder = 'name of campaign';
    campaignTextbox.autocomplete = 'off';
    campaignTextbox.spellcheck = false;
    const campaignForm = document.createElement('form');
    campaignForm.id = 'campaign-form';
    campaignForm.onsubmit = beginFrogCampaign;
    campaignForm.appendChild(campaignTextbox);
    gameStartup.appendChild(campaignForm);
    document.body.appendChild(gameStartup);
    campaignTextbox.focus();
});
socket.on('sfLobbyWelcome', (msg) => {
    console.log(`joined lobby: ${msg.campaignName} hosted by ${msg.playerHost.name}`);
    createGameHTML();
});
