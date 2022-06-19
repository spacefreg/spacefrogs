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
        this.fregID = '';
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));
        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);
    }
    run() {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));
        this.io.on('connection', (socket) => {
            socket.on('c-requestAccess', (name) => {
                console.log(`${name} has requested access`);
                if (name == 'water') {
                    this.fregID = socket.id;
                    //(7/18/22) fetch either the entire database or some portion of it and send it to the user
                    socket.emit('s-accessGranted', this.fregID);
                    console.log(`${name} has been granted access`);
                }
                else {
                    socket.emit('s-accessDenied');
                    console.log(`${name} has been denied access`);
                }
            });
            socket.on('disconnect', () => {
                if (socket.id == this.fregID) {
                    console.log('shutting off');
                }
            });
        });
    }
}
const srv = new Server(29070);
srv.run();
