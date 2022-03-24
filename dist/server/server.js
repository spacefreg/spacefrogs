//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';
//core imports
//import coreFunction from '../public/core/common.js'; //example
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.dirname(__dirname);
class Server {
    constructor(port) {
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));
        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);
        this.tickRateMs = 50;
    }
    run() {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));
        this.io.on('connection', (socket) => {
            console.log('gamer connect');
            socket.on('disconnect', () => {
                console.log('gamer disconnect');
            });
        });
    }
}
const srv = new Server(29070);
srv.run();
