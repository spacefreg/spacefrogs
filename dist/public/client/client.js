//(3/27/22) client.ts  handles all of the client html as well as managing the behavior of the page before the user joins or creates a lobby
//(3/27/22) upon joining or creating a lobby, control passes to lobbyclient.ts
//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
const socket = io();
import { canvas } from '../core/utils/ctx.js';
import sfcNewUser from '../core/messages/client/sfcnewuser.js';
import sfcCreateCampaign from '../core/messages/client/sfccreatecampaign.js';
import LobbyClient from './lobby/lobbyclient.js';
import Player, { getPlayerByID } from '../core/player.js';
import GameClient from './game/gameclient.js';
//(3/25/22) begin space bouncer code
//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer = document.getElementById('spacebouncer');
const introVideo = document.getElementById('fullscreen-video-intro');
const selfUsername = document.getElementById('name-form');
const inpFormVal = document.getElementById('textbox');
let playerName = '';
let campaignName = '';
selfUsername.onsubmit = submitPlayerName;
function submitPlayerName(e) {
    e.preventDefault();
    playerName = inpFormVal.value;
    const newUserMessage = new sfcNewUser(socket.id, playerName);
    socket.emit('sfcNewUser', newUserMessage);
}
//(3/25/22) end space bouncer code
function submitNewCampaignRequest(e) {
    e.preventDefault();
    const campaignTextbox = document.getElementById('campaign-textbox');
    campaignName = campaignTextbox.value;
    const createCampaignMessage = new sfcCreateCampaign(socket.id, playerName, campaignName);
    socket.emit('sfcCreateCampaign', createCampaignMessage);
    const gameStartup = document.getElementById('game-startup');
    gameStartup.remove();
    //(3/27/22) at this point, the user is waiting for either a sfLobbyCreated or sfLobbyAlreadyExists message
}
function createGameHTML() {
    introVideo.remove();
    spaceBouncer.remove();
    canvas.style.visibility = 'visible';
    canvas.oncontextmenu = () => false;
}
function receiveUserInvite() {
    const requestToJoinDiv = document.createElement('div');
    document.body.appendChild(requestToJoinDiv);
    const requestToJoinPrompt = document.createElement('p');
    requestToJoinPrompt.id = 'request-to-join-prompt';
    requestToJoinPrompt.textContent = 'There is a game in progress. Do you wish to spectate?';
    requestToJoinDiv.appendChild(requestToJoinPrompt);
    const requestToJoinButton = document.createElement('button');
    requestToJoinButton.id = 'request-to-join-button';
    requestToJoinButton.textContent = 'Watch';
    requestToJoinDiv.appendChild(requestToJoinButton);
}
socket.on('sfNewUserInvite', () => {
    console.log('a game is in progress. do you wish to spectate?');
    spaceBouncer.remove();
    receiveUserInvite();
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
    campaignForm.onsubmit = submitNewCampaignRequest;
    campaignForm.appendChild(campaignTextbox);
    gameStartup.appendChild(campaignForm);
    document.body.appendChild(gameStartup);
    campaignTextbox.focus();
});
socket.on('sfLobbyWelcome', (msg) => {
    createGameHTML();
    const selfPlayer = new Player(socket.id, playerName);
    for (let i = 0; i < msg.playerList.length; i++) {
        if (msg.playerList[i].id == socket.id) {
            selfPlayer.setPlayerNumber(i + 1);
        }
    }
    const hostPlayer = getPlayerByID(msg.playerHostID, msg.playerList);
    const lc = new LobbyClient(socket, selfPlayer, hostPlayer, msg.campaignName, msg.playerList);
    const hostName = getPlayerByID(msg.playerHostID, msg.playerList).name;
    console.log(`joined lobby: ${msg.campaignName} hosted by ${hostName} (${msg.playerList.length} players)`);
});
socket.on('sfLobbyCreated', (lobbyPlayersOnlyHost) => {
    createGameHTML();
    const lc = new LobbyClient(socket, lobbyPlayersOnlyHost[0], lobbyPlayersOnlyHost[0], campaignName, lobbyPlayersOnlyHost);
    console.log(`created a new campaign lobby: ${campaignName}`);
});
socket.on('sfLobbyAlreadyExists', (msg) => {
    //(3/27/22) the user tried creating a lobby but someone beat them to the punch. connect to the new lobby
    //normally as if there was a normal sfLobbyWelcome message (because there was, lole)
    createGameHTML();
    const selfPlayer = new Player(socket.id, playerName);
    const hostPlayer = getPlayerByID(msg.playerHostID, msg.playerList);
    const lc = new LobbyClient(socket, selfPlayer, hostPlayer, msg.campaignName, msg.playerList);
    const hostName = getPlayerByID(msg.playerHostID, msg.playerList).name;
    console.log(`joined lobby: ${msg.campaignName} hosted by ${hostName} (${msg.playerList.length} players)`);
});
socket.on('sfStartCampaign', (msg) => {
    console.log(`client: start campaign`);
    console.log(`campaign length: ${msg.playerList.length}`);
    console.log(`${msg.playerList[0].name} is host`);
    //(4/22/22) creating the gameclient goes here
    const gc = new GameClient(socket, msg.campaignName, msg.playerList);
});
