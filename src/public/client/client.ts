//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import sfcNewUser from '../core/messages/sfcnewuser.js';

//(3/25/22) begin space bouncer code
//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer: HTMLDivElement = <HTMLDivElement>document.getElementById('spacebouncer');
const inpForm: HTMLFormElement = <HTMLFormElement>document.getElementById('name-form');
const inpFormVal: HTMLInputElement = <HTMLInputElement>document.getElementById('textbox');
const anonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('anon-button');

inpForm.onsubmit = submitPlayerName;
anonButton.onclick = goAnon;

const socket = io();

function submitPlayerName(e: SubmitEvent) {
    e.preventDefault();
    createGameHTML();
    const name: string = inpFormVal.value;
    const newUserMessage: sfcNewUser = new sfcNewUser(socket.id, name); 
    socket.emit('sfcNewUser', newUserMessage);
    //gc.receiveIDFromUser(name);
}

function goAnon(e: MouseEvent) {
    e.preventDefault();
    createGameHTML();
    const newUserMessage: sfcNewUser = new sfcNewUser(socket.id, 'anon'); 
    socket.emit('sfcNewUser', newUserMessage);
    //gc.receiveIDFromUser('anon');
}
//(3/25/22) end space bouncer code


function createGameHTML() {
    spaceBouncer.remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'sf-canvas';
    canvas.width = 1366;
    canvas.height = 768;
    document.body.append(canvas);

}
