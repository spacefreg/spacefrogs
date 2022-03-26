//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import coreFunction from '../core/common.js';

//(3/25/22) the space bouncer has to get the user's name (or be told the user is anonymous)
const spaceBouncer: HTMLDivElement = <HTMLDivElement>document.getElementById('spacebouncer');
const inpForm: HTMLFormElement = <HTMLFormElement>document.getElementById('name-form');
const inpFormVal: HTMLInputElement = <HTMLInputElement>document.getElementById('textbox');
const anonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('anon-button');

inpForm.onsubmit = submitPlayerName;
anonButton.onclick = goAnon;

function submitPlayerName(e: SubmitEvent) {
    e.preventDefault();
    createGameHTML();
    const name: string = inpFormVal.value;
    //gc.receiveIDFromUser(name);
}

function goAnon(e: MouseEvent) {
    e.preventDefault();
    createGameHTML();
    //gc.receiveIDFromUser('anon');
}

//(3/15/22) this function now also controls the release/patch version. remember to sync it with github releases!
function createGameHTML() {
    //commonFunction('commmmmmmmmmmmmmmon');
    spaceBouncer.remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'sf-canvas';
    canvas.width = 1366;
    canvas.height = 768;
    document.body.append(canvas);

}
