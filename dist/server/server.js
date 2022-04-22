//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';
import sfLobbyWelcome from '../public/core/messages/server/sflobbywelcome.js';
import { getPlayerByID } from '../public/core/player.js';
import Lobby from './lobby.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.dirname(__dirname);
class Server {
    constructor(port) {
        this.gameRunning = false;
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));
        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);
        this.tickRateMs = 50;
        this.receptionGuests = new Map();
        this.players = new Array();
        this.gameLobby = new Lobby();
        this.playerHostID = '';
    }
    run() {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));
        this.io.on('connection', (socket) => {
            this.newSocketConnection(socket.id);
            socket.on('sfcNewUser', (msg) => {
                this.sfcNewUser(msg);
            });
            socket.on('sfcCreateCampaign', (msg) => {
                this.sfcCreateCampaign(msg);
            });
            socket.on('sfcStartCampaign', () => {
                console.log(`${socket.id} sent sfcStartCampaign`);
                this.io.emit('sfStartCampaign');
            });
            socket.on('sfcPlayerReady', () => {
                this.io.emit('sfPlayerReady', socket.id);
                const player = getPlayerByID(socket.id, this.gameLobby.lobbyPlayers);
                player.isReady = true;
                let readyToStart = true;
                for (let i = 0; i < this.gameLobby.lobbyPlayers.length; i++) {
                    if (this.gameLobby.lobbyPlayers[i].isReady == false) {
                        console.log(`${this.gameLobby.lobbyPlayers[i].name} is not ready`);
                        readyToStart = false;
                        break;
                    }
                }
                if (readyToStart) {
                    this.io.emit('sfAllowStartCampaign');
                    console.log(`all players are ready to start`);
                }
            });
            socket.on('sfcPlayerNotReady', () => {
                this.io.emit('sfPlayerNotReady', socket.id);
                const player = getPlayerByID(socket.id, this.gameLobby.lobbyPlayers);
                player.isReady = false;
            });
            socket.on('sfcSelectionRequest', (selectionCandidate) => {
                //console.log(`${socket.id} sent sfcSelectionRequest: ${selectionCandidate}`);
                const player = getPlayerByID(socket.id, this.gameLobby.lobbyPlayers);
                for (let i = 0; i < this.gameLobby.lobbyPlayers.length; i++) {
                    if (this.gameLobby.lobbyPlayers[i].country == selectionCandidate) {
                        console.log(`request for country that's already selected`);
                        return;
                    }
                }
                player.country = selectionCandidate;
                this.io.emit('sfPlayerCountrySelection', player);
            });
            socket.on('disconnect', () => {
                this.receptionGuests.delete(socket.id);
                if (this.gameLobby.isActive) {
                    const lobbyPlayer = getPlayerByID(socket.id, this.gameLobby.lobbyPlayers);
                    this.gameLobby.lobbyPlayers.splice(this.gameLobby.lobbyPlayers.indexOf(lobbyPlayer), 1);
                    console.log(`player ${lobbyPlayer.name} (${lobbyPlayer.id}) left lobby. size: ${this.gameLobby.lobbyPlayers.length}`);
                    if (this.gameLobby.lobbyPlayers.length == 0) {
                        this.gameLobby.deactivate();
                    }
                    else {
                        if (lobbyPlayer.isHost) {
                            console.log(`host left lobby.`);
                            this.playerHostID = this.gameLobby.lobbyPlayers[0].id;
                            this.gameLobby.lobbyPlayers[0].setHost();
                            console.log(`new host: ${this.gameLobby.lobbyPlayers[0].name}`);
                        }
                        for (let i = 0; i < this.gameLobby.lobbyPlayers.length; i++) {
                            this.gameLobby.lobbyPlayers[i].setPlayerNumber(i + 1);
                        }
                        this.io.emit('sfLobbyPlayerDropped', socket.id, this.gameLobby.lobbyPlayers);
                    }
                }
            });
        });
    }
    newSocketConnection(id) {
        this.receptionGuests.set(id, 'nameless');
        console.log(`anonymous connection. ID: ${id}`);
    }
    //(3/26/22) lies below the server's interaction with its patrons
    sfcNewUser(msg) {
        this.receptionGuests.set(msg.id, msg.name);
        console.log(`${msg.id} sent sfcNewUser: ${msg.name}`);
        if (this.gameRunning) {
            //(3/27/22) tell the new user to ask the host to join the existing game
            this.io.to(msg.id).emit('sfNewUserInvite');
            return;
        }
        else if (this.gameLobby.isActive) {
            //(3/27/22) give the new user the lobby info directly and let them join the lobby 
            const newestLobbyUser = this.gameLobby.addPlayerToLobby(msg.id, msg.name);
            const lobbyWelcomeMessage = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHostID, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyWelcome', lobbyWelcomeMessage);
            this.io.emit('sfLobbyPlayerJoined', newestLobbyUser, this.gameLobby.lobbyPlayers);
            return;
        }
        //(3/26/22) there's no game session and a player wants to begin
        //give them the choice of starting a new or loading an existing game (file)
        this.io.to(msg.id).emit('sfNewOrLoadGame');
    }
    sfcCreateCampaign(msg) {
        //(3/27/22) before creating a new lobby, check if there's already one
        if (this.gameLobby.isActive) {
            //(3/27/22) todo: probably should send a message to the user that a lobby already exists
            //(3/27/22) currently, the user silently joins someone's lobby when he was expecting to create his own
            this.gameLobby.addPlayerToLobby(msg.id, msg.name);
            const lobbyWelcomeMessage = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHostID, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyAlreadyExists', lobbyWelcomeMessage);
            return;
        }
        /*else if (game is running) {
            //(3/27/22) this happens when a user is trying to create a new campaign but someone has
            //beaten them to the punch and already advanced from a lobby to starting a game session (very rare situation)

            //(3/27/22) todo: tell the new user to ask the host to join the existing game
            //this.io.to(msg.id).emit('sfNewUserInvite');
        }
        */
        else {
            this.playerHostID = msg.id;
            const hostName = this.receptionGuests.get(msg.id);
            this.gameLobby.activate(this.playerHostID, hostName, msg.campaignName);
            this.io.to(msg.id).emit('sfLobbyCreated', this.gameLobby.lobbyPlayers);
        }
    }
}
const srv = new Server(29070);
srv.run();
// (3/29/22)todo: create a game class and give it three states: inactive, lobby, and active
