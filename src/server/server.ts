//backend networking imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import http from 'http';
import * as socketIO from 'socket.io';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);


class Server {
    private httpServer: http.Server;
    private port: string | number;
    private io: socketIO.Server;

    private fregID: string = '';

    constructor(port: number) {
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.httpServer = new http.Server(expressApp);
        this.io = new socketIO.Server(this.httpServer);


    }

    public run(): void {
        this.httpServer.listen(this.port, () => console.log(`server listening on ${this.port}`));

        this.io.on('connection', (socket: socketIO.Socket) => {
            

            socket.on('c-requestAccess', (name: string) => {
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

