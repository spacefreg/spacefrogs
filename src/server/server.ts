//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';


//message imports
import sfcNewUser from '../public/core/messages/client/sfcnewuser.js';
import sfcCreateCampaign from '../public/core/messages/client/sfccreatecampaign.js';
import sfLobbyWelcome from '../public/core/messages/server/sflobbywelcome.js';
import sfStartCampaign from '../public/core/messages/server/sfstartcampaign.js';

import Player, { getPlayerByID } from '../public/core/player.js';
import Lobby from './lobby.js';
import GameSession from './game/gamesession.js';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);


class Server {
    private httpServer: http.Server;
    private port: string | number;
    private io: socketIO.Server;

    private tickRateMs: number;

    private gameRunning: boolean = false;
    private gameSession: GameSession;

    //(3/25/22) user fields
    //(3/25/22) receptionGuests holds id:name pairs. these are the guests who have not yet joined the lobby
    private receptionGuests: Map<string, string>;
    private players: Array<Player>;

    private playerHostID: string; 
    private gameLobby: Lobby;

    constructor(port: number) {
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);
        this.gameSession = new GameSession(this.io);

        this.tickRateMs = 50;

        this.receptionGuests = new Map();
        this.players = new Array();

        this.gameLobby = new Lobby();
        this.playerHostID = '';
    }

    public run(): void {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));

        this.io.on('connection', (socket: socketIO.Socket) => {
            this.newSocketConnection(socket.id);
            

            socket.on('sfcNewUser', (msg: sfcNewUser) => {
                this.sfcNewUser(msg);
            });

            socket.on('sfcCreateCampaign', (msg: sfcCreateCampaign ) => {
                this.sfcCreateCampaign(msg);
            });

            socket.on('sfcStartCampaign', () => {
                console.log(`${socket.id} sent sfcStartCampaign. length: ${this.gameLobby.lobbyPlayers.length}`);
                for (let i = 0; i < this.gameLobby.lobbyPlayers.length; i++) {
                    this.players.push(new Player(this.gameLobby.lobbyPlayers[i].id, this.gameLobby.lobbyPlayers[i].name));
                    this.players[i].setCountry(this.gameLobby.lobbyPlayers[i].country);
                    this.players[i].setPlayerNumber(i + 1);
                }

                this.players[0].setHost();

                const startCampaignMessage = new sfStartCampaign(this.gameLobby.campaignName, this.players);
                this.io.emit('sfStartCampaign', startCampaignMessage);
                this.gameLobby.deactivate();
                this.gameRunning = true;
                console.log(`game started: ${this.gameLobby.campaignName}`);
                this.gameSession.start(startCampaignMessage);
            });

            socket.on('sfcPlayerReady', () => {
                this.io.emit('sfPlayerReady', socket.id);
                const player = getPlayerByID(socket.id, this.gameLobby.lobbyPlayers);
                player.isReady = true;
                let readyToStart: boolean = true; 
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
            
            socket.on('sfcSelectionRequest', (selectionCandidate: string) => {
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

            socket.on('sfcTogglePause', () => {
                this.gameSession.togglePause();
            });

            socket.on('disconnect', () => {
                this.receptionGuests.delete(socket.id);

                if (this.gameLobby.isActive) {
                    const lobbyPlayer: Player = getPlayerByID(socket.id, this.gameLobby.lobbyPlayers);
                    if (lobbyPlayer.name != 'gremlin') {
                        console.log(`anonymous disconnection. ID: ${socket.id}`);
                    
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
                }
                else if (this.gameRunning) {
                    const player = getPlayerByID(socket.id, this.players);
                    if (player.name != 'gremlin') {
                        this.players.splice(this.players.indexOf(player), 1);

                        if (this.players.length == 0) {
                            this.gameRunning = false;
                            this.gameSession.end();
                            return;
                        }
                        console.log(`player ${player.name} (${player.id}) left game. size: ${this.players.length}`);

                        if (player.isHost) {
                            console.log(`host left game.`);
                            this.playerHostID = this.players[0].id;
                            this.players[0].setHost();
                            console.log(`new host: ${this.players[0].name}`);
                        }

                        for (let i = 0; i < this.players.length; i++) {
                            this.players[i].setPlayerNumber(i + 1);
                        }
                        this.io.emit('sfGamePlayerDropped', socket.id, this.players);
                    }
                }
            });
        });
    }

    private newSocketConnection(id: string): void {
        this.receptionGuests.set(id, 'nameless');
        console.log(`anonymous connection. ID: ${id}`);
    }

    //(3/26/22) lies below the server's interaction with its patrons

    private sfcNewUser(msg: sfcNewUser): void {
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
            const lobbyWelcomeMessage: sfLobbyWelcome = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHostID, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyWelcome', lobbyWelcomeMessage);
            this.io.emit('sfLobbyPlayerJoined', newestLobbyUser, this.gameLobby.lobbyPlayers);
            
            return;
        }


        //(3/26/22) there's no game session and a player wants to begin
        //give them the choice of starting a new or loading an existing game (file)
        this.io.to(msg.id).emit('sfNewOrLoadGame');
    }

    private sfcCreateCampaign(msg: sfcCreateCampaign): void {
        //(3/27/22) before creating a new lobby, check if there's already one
        if (this.gameLobby.isActive) {
            //(3/27/22) todo: probably should send a message to the user that a lobby already exists
            //(3/27/22) currently, the user silently joins someone's lobby when he was expecting to create his own
            this.gameLobby.addPlayerToLobby(msg.id, msg.name);

            const lobbyWelcomeMessage: sfLobbyWelcome = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHostID, this.gameLobby.lobbyPlayers);
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
            const hostName: string = this.receptionGuests.get(msg.id)!;
            this.gameLobby.activate(this.playerHostID, hostName, msg.campaignName);
            this.io.to(msg.id).emit('sfLobbyCreated', this.gameLobby.lobbyPlayers);
        }

    }
}

const srv = new Server(29070);
srv.run();
// (3/29/22)todo: create a game class and give it three states: inactive, lobby, and active

