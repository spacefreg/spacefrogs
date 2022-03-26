//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';
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
        this.lobbyUsers = new Map();
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
            socket.on('disconnect', () => {
                console.log('gamer disconnect');
            });
        });
    }
    newSocketConnection(id) {
        this.lobbyUsers.set(id, 'nameless');
        console.log(`anonymous connection. ID: ${id}`);
    }
    //(3/26/22) lies below the server's interaction with its patrons
    sfcNewUser(msg) {
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
