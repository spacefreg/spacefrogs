//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';
import sfLobbyWelcome from '../public/core/messages/server/sflobbywelcome.js';
import Player from '../public/core/player.js';
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
    }
    run() {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));
        this.io.on('connection', (socket) => {
            this.newSocketConnection(socket.id);
            socket.on('sfcNewUser', (msg) => {
                this.sfcNewUser(msg);
            });
            ;
            socket.on('sfcCreateCampaign', (msg) => {
                //(3/27/22) no lobby already exists so the host is starting one
                this.sfcCreateCampaign(msg);
            });
            socket.on('disconnect', () => {
                console.log(`gamer disconnect: ${socket.id}`);
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
        else if (this.gameLobby) {
            //(3/27/22) give the new user the lobby info directly and let them join the lobby 
            this.gameLobby.lobbyPlayers.push(new Player(msg.id, msg.name));
            const lobbyWelcomeMessage = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHost, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyWelcome', lobbyWelcomeMessage);
            return;
        }
        //(3/26/22) there's no game session and a player wants to begin
        //give them the choice of starting a new or loading an existing game (file)
        this.playerHost = new Player(msg.id, msg.name);
        this.io.to(msg.id).emit('sfNewOrLoadGame');
    }
    sfcCreateCampaign(msg) {
        //(3/27/22) before creating a new lobby, check if there's already one
        if (this.gameLobby) {
            //(3/27/22) todo: probably should send a message to the user that a lobby already exists
            //(3/27/22) currently, the user silently joins someone's lobby when he was expecting to create his own
            const lobbyWelcomeMessage = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHost, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyWelcome', lobbyWelcomeMessage);
        }
        /*else if (game is running) {
            //(3/27/22) this happens when a user is trying to create a new campaign but someone has
            //beaten them to the punch and already advanced from a lobby to starting a game session (very rare situation)

            //(3/27/22) todo: tell the new user to ask the host to join the existing game
            //this.io.to(msg.id).emit('sfNewUserInvite');
        }
        */
        else {
            this.io.to(msg.id).emit('sfLobbyCreated');
        }
        this.gameLobby = new Lobby(this.playerHost, msg.campaignName);
        console.log(`${msg.id} sent createCampaign: ${msg.campaignName}`);
    }
}
const srv = new Server(29070);
srv.run();
