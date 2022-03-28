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

import Player, { getPlayerByID } from '../public/core/player.js';
import Lobby from './lobby.js';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);


class Server {
    private httpServer: http.Server;
    private port: string | number;
    private io: socketIO.Server;

    private tickRateMs: number;

    private gameRunning: boolean = false;

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
            });;

            socket.on('sfcCreateCampaign', (msg: sfcCreateCampaign ) => {
                this.sfcCreateCampaign(msg);
            });

            socket.on('disconnect', () => {
                if (this.gameLobby.isActive) {
                    const lobbyPlayer: Player = getPlayerByID(socket.id, this.gameLobby.lobbyPlayers);
                    this.gameLobby.lobbyPlayers.splice(this.gameLobby.lobbyPlayers.indexOf(lobbyPlayer), 1);
                    console.log(`player ${lobbyPlayer.name} (${lobbyPlayer.id}) left lobby. size: ${this.gameLobby.lobbyPlayers.length}`);

                    if (this.gameLobby.lobbyPlayers.length == 0) {
                        this.gameLobby.deactivate();
                    }
                    else {
                        this.io.emit('sfLobbyPlayerDropped', socket.id);
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
            this.gameLobby.lobbyPlayers.push(new Player(msg.id, msg.name));
            const newestLobbyUser: Player = getPlayerByID(msg.id, this.gameLobby.lobbyPlayers);
            const lobbyWelcomeMessage: sfLobbyWelcome = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHostID, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyWelcome', lobbyWelcomeMessage);
            this.io.emit('sfLobbyPlayerJoined', newestLobbyUser);
            
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
            this.gameLobby.lobbyPlayers.push(new Player(msg.id, msg.name));
            const lobbyWelcomeMessage: sfLobbyWelcome = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHostID, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyWelcome', lobbyWelcomeMessage);
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
            this.io.to(msg.id).emit('sfLobbyCreated');
            this.gameLobby.activate(this.playerHostID, hostName, msg.campaignName);
        }

    }
}

const srv = new Server(29070);
srv.run();