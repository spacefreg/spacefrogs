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

import Player from '../public/core/player.js';
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

    //(3/27/22) these fields are type 'any' because it lets me get away with calling their constructors after the server constructor 
    private playerHost: any; //Player
    private gameLobby: any; //Lobby

    constructor(port: number) {
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);

        this.tickRateMs = 50;

        this.receptionGuests = new Map();
        this.players = new Array();
    }

    public run(): void {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));

        this.io.on('connection', (socket: socketIO.Socket) => {
            this.newSocketConnection(socket.id);
            

            socket.on('sfcNewUser', (msg: sfcNewUser) => {
                this.sfcNewUser(msg);
            });;

            socket.on('sfcCreateCampaign', (msg: sfcCreateCampaign ) => {
                //(3/27/22) no lobby already exists so the host is starting one
                this.sfcCreateCampaign(msg);
            });

            socket.on('disconnect', () => {
                console.log(`gamer disconnect: ${socket.id}`);
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
        else if (this.gameLobby) {
            //(3/27/22) give the new user the lobby info directly and let them join the lobby 
            const lobbyWelcomeMessage: sfLobbyWelcome = new sfLobbyWelcome(this.gameLobby.campaignName, this.playerHost, this.gameLobby.lobbyPlayers);
            this.io.to(msg.id).emit('sfLobbyWelcome', lobbyWelcomeMessage);
            return;
        }


        //(3/26/22) there's no game session and a player wants to begin
        //give them the choice of starting a new or loading an existing game (file)
        this.playerHost = new Player(msg.id, msg.name);
        this.io.to(msg.id).emit('sfNewOrLoadGame');
    }

    private sfcCreateCampaign(msg: sfcCreateCampaign): void {
        this.gameLobby = new Lobby(this.playerHost, msg.campaignName);
        console.log(`${msg.id} sent createCampaign: ${msg.campaignName}`);
    }
}

const srv = new Server(29070);
srv.run();