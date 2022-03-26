//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';


//message imports
import sfcNewUser from '../public/core/messages/sfcnewuser.js';


const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);


class Server {
    private httpServer: http.Server;
    private port: string | number;
    private io: socketIO.Server;

    private tickRateMs: number;

    constructor(port: number) {
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);

        this.tickRateMs = 50;
    }

    public run(): void {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('gamer connect');

            socket.on('sfcNewUser', (msg: sfcNewUser) => {
                console.log(`${msg.id} sent sfcNewUser: ${msg.name}`);
            });

            socket.on('disconnect', () => {
                console.log('gamer disconnect');
            });
        });
    }
}

const srv = new Server(29070);
srv.run();