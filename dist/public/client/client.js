//(3/27/22) client.ts  handles all of the client html as well as managing the behavior of the page before the user joins or creates a lobby
//(3/27/22) upon joining or creating a lobby, control passes to lobbyclient.ts
//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import { canvas } from '../core/utils/ctx.js';
class Client {
    constructor() {
        this.socket = io();
        this.bouncer = document.getElementById('bouncer');
        this.introVideo = document.getElementById('fullscreen-video-intro');
        this.nameForm = document.getElementById('name-form');
        this.inpFormVal = document.getElementById('textbox');
        this.selfName = '';
        this.selfID = '';
        this.nameForm.onsubmit = this.submitSelfName.bind(this);
        this.socket.on('s-accessGranted', (id) => {
            console.log('access granted');
            this.selfID = id;
            this.createMainHTML();
        });
        this.socket.on('s-accessDenied', () => {
            console.log('access denied');
        });
    }
    submitSelfName(e) {
        e.preventDefault();
        this.selfName = this.inpFormVal.value;
        this.socket.emit('c-requestAccess', this.selfName);
    }
    createMainHTML() {
        this.introVideo.remove();
        this.bouncer.remove();
        canvas.style.visibility = 'visible';
        canvas.oncontextmenu = () => false;
    }
}
const ct = new Client();
