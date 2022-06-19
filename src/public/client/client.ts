//(3/27/22) client.ts  handles all of the client html as well as managing the behavior of the page before the user joins or creates a lobby
//(3/27/22) upon joining or creating a lobby, control passes to lobbyclient.ts

//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import { canvas } from '../core/utils/ctx.js';



class Client {
    private socket: io = io();

    private bouncer: HTMLDivElement = <HTMLDivElement>document.getElementById('bouncer');
    private introVideo: HTMLVideoElement = <HTMLVideoElement>document.getElementById('fullscreen-video-intro');

    private nameForm: HTMLFormElement = <HTMLFormElement>document.getElementById('name-form');
    private inpFormVal: HTMLInputElement = <HTMLInputElement>document.getElementById('textbox'); 

    private selfName: string= '';
    private selfID: string = '';

    constructor() {
        this.nameForm.onsubmit = this.submitSelfName.bind(this);

        
        this.socket.on('s-accessGranted', (id: string) => {
            console.log('access granted');
            this.selfID = id;
            this.createMainHTML();
        });

        
        this.socket.on('s-accessDenied', () => {
            console.log('access denied');
        });
    }
    
    public submitSelfName(e: SubmitEvent) {
        e.preventDefault();
        this.selfName = this.inpFormVal.value;
        this.socket.emit('c-requestAccess', this.selfName);
    
    }

    private createMainHTML() {
        this.introVideo.remove();
        this.bouncer.remove();
        canvas.style.visibility = 'visible';
        canvas.oncontextmenu = () => false;
    
    }

    
}

const ct: Client = new Client();