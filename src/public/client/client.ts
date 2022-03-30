//(3/27/22) client.ts  handles all of the client html as well as managing the behavior of the page before the user joins or creates a lobby
//(3/27/22) upon joining or creating a lobby, control passes to lobbyclient.ts

//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
const socket = io();

import sfcNewUser from '../core/messages/client/sfcnewuser.js';
import sfcCreateCampaign from '../core/messages/client/sfccreatecampaign.js';
import sfLobbyWelcome from '../core/messages/server/sflobbywelcome.js';

import LobbyClient from './lobby/lobbyclient.js';
import Player, { getPlayerByID } from '../core/player.js';


//(3/25/22) begin space bouncer code
//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer: HTMLDivElement = <HTMLDivElement>document.getElementById('spacebouncer');
const introVideo: HTMLVideoElement = <HTMLVideoElement>document.getElementById('fullscreen-video-intro');

const selfUsername: HTMLFormElement = <HTMLFormElement>document.getElementById('name-form');
const inpFormVal: HTMLInputElement = <HTMLInputElement>document.getElementById('textbox');

let playerName: string = '';
let campaignName: string = '';


selfUsername.onsubmit = submitPlayerName;



function submitPlayerName(e: SubmitEvent) {
    e.preventDefault();
    playerName = inpFormVal.value;
    const newUserMessage: sfcNewUser = new sfcNewUser(socket.id, playerName); 
    socket.emit('sfcNewUser', newUserMessage);
}

//(3/25/22) end space bouncer code


function submitNewCampaignRequest(e: SubmitEvent): void {
    e.preventDefault();

    const campaignTextbox : HTMLInputElement = <HTMLInputElement>document.getElementById('campaign-textbox');
    campaignName = campaignTextbox.value; 
    
    const createCampaignMessage: sfcCreateCampaign = new sfcCreateCampaign(socket.id, playerName, campaignName);
    socket.emit('sfcCreateCampaign', createCampaignMessage);

    
    const gameStartup: HTMLDivElement = <HTMLDivElement>document.getElementById('game-startup');
    gameStartup.remove();
    //(3/27/22) at this point, the user is waiting for either a sfLobbyCreated or sfLobbyAlreadyExists message
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

function receiveUserInvite() {
    const requestToJoinDiv: HTMLDivElement = <HTMLDivElement>document.createElement('div');
    document.body.appendChild(requestToJoinDiv);

    const requestToJoinPrompt: HTMLParagraphElement = document.createElement('p');
    requestToJoinPrompt.id = 'request-to-join-prompt';
    requestToJoinPrompt.textContent = 'There is a game in progress. Do you wish to join?';
    requestToJoinDiv.appendChild(requestToJoinPrompt);

    const requestToJoinButton: HTMLButtonElement = document.createElement('button');
    requestToJoinButton.id = 'request-to-join-button';
    requestToJoinButton.textContent = 'Request to Join';
    requestToJoinDiv.appendChild(requestToJoinButton);
}

socket.on('sfNewUserInvite', () => {
    console.log('a game is in progress. would you like to join?');
    spaceBouncer.remove();

    receiveUserInvite();

});

socket.on('sfNewOrLoadGame', () => {
    spaceBouncer.remove();
    console.log('create a new or load an existing game?');

    const gameStartup: HTMLDivElement = document.createElement('div');
    gameStartup.id = 'game-startup';


    const campaignTextbox: HTMLInputElement = document.createElement('input');
    campaignTextbox.id = 'campaign-textbox';
    campaignTextbox.type = 'text';
    campaignTextbox.placeholder = 'name of campaign';
    campaignTextbox.autocomplete = 'off';
    campaignTextbox.spellcheck = false;
    
    const campaignForm: HTMLFormElement = document.createElement('form');
    campaignForm.id = 'campaign-form';
    campaignForm.onsubmit = submitNewCampaignRequest;
    
    campaignForm.appendChild(campaignTextbox);
    gameStartup.appendChild(campaignForm);
    document.body.appendChild(gameStartup);
    
    campaignTextbox.focus();
});

socket.on('sfLobbyWelcome', (msg: sfLobbyWelcome) => {
    createGameHTML();
    const selfPlayer: Player = new Player(socket.id, playerName);
    const hostPlayer: Player = getPlayerByID(msg.playerHostID, msg.playerList);
    const lc = new LobbyClient(socket, selfPlayer, hostPlayer, msg.campaignName, msg.playerList);
    
    const hostName: string = getPlayerByID(msg.playerHostID, msg.playerList).name;
    console.log(`joined lobby: ${msg.campaignName} hosted by ${hostName} (${msg.playerList.length} players)`);
});

socket.on('sfLobbyCreated', () => {
    createGameHTML();
    const selfHost: Player = new Player(socket.id, playerName);
    selfHost.setPlayerNumber(1);

    const lobbyPlayersOnlyHost: Player[] = [selfHost];
    const lc = new LobbyClient(socket, selfHost, selfHost, campaignName, lobbyPlayersOnlyHost);
    console.log(`created a new campaign lobby: ${campaignName}`);
});

socket.on('sfLobbyAlreadyExists', (msg: sfLobbyWelcome) => {
    //(3/27/22) the user tried creating a lobby but someone beat them to the punch. connect to the new lobby
    //normally as if there was a normal sfLobbyWelcome message (because there was, lole)
    createGameHTML();
    const selfPlayer: Player = new Player(socket.id, playerName);
    const hostPlayer: Player = getPlayerByID(msg.playerHostID, msg.playerList);
    const lc = new LobbyClient(socket, selfPlayer, hostPlayer, msg.campaignName, msg.playerList);
    
    const hostName: string = getPlayerByID(msg.playerHostID, msg.playerList).name;
    console.log(`joined lobby: ${msg.campaignName} hosted by ${hostName} (${msg.playerList.length} players)`);
});
