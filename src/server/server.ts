//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';


//message imports
import sfcNewUser from '../public/core/messages/client/sfcnewuser.js';

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
    //(3/25/22) lobbyUsers holds id:name pairs. users who advance from the lobby to the game move to the players array
    private lobbyUsers: Map<string, string>;
    private players: Array<any>;
    private playerHost: any; //will soon be a Player type

    constructor(port: number) {
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);

        this.tickRateMs = 50;

        this.lobbyUsers = new Map();
        this.players = new Array();
    }

    public run(): void {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));

        this.io.on('connection', (socket: socketIO.Socket) => {
            this.newSocketConnection(socket.id);
            

            socket.on('sfcNewUser', (msg: sfcNewUser) => {
                this.sfcNewUser(msg);
            });;

            socket.on('disconnect', () => {
                console.log('gamer disconnect');
            });
        });
    }

    private newSocketConnection(id: string): void {
        this.lobbyUsers.set(id, 'nameless');
        console.log(`anonymous connection. ID: ${id}`);
    }

    //(3/26/22) lies below the server's interaction with its patrons
    private sfcNewUser(msg: sfcNewUser): void {
        this.lobbyUsers.set(msg.id, msg.name);
        console.log(`${msg.id} sent sfcNewUser: ${msg.name}`);

        if (this.gameRunning) {
            this.io.to(msg.id).emit('sfNewUserInvite');
            return;
        } 


        //(3/26/22) there's no game session and a player wants to begin
        //give them the choice of starting a new or loading an existing game (file)
        this.io.to(msg.id).emit('sfNewOrLoadGame');
        this.gameRunning = true;
    }
}

const srv = new Server(29070);
srv.run();