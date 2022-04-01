import vec2 from '../../core/math/vec2.js';

import sfuiElement from './sfuielement.js';

export default class ChatWindow extends sfuiElement {

    public chatLog: Array<string>;
    public chatInput: HTMLInputElement;
    //public chatWindow: CanvasRect;

    constructor(origin: vec2) {
        super(origin, 'chatWindow', new Image(), '');

        const canvasPos: vec2 = new vec2(this.canvas.offsetLeft, this.canvas.offsetTop);
        const chatSize: vec2 = new vec2(this.canvas.width * .25, this.canvas.height * .05);
        const chatPos: vec2 = new vec2(canvasPos.x + 5, canvasPos.y + 5);

        console.log(`canvasPos: ${canvasPos.x}, ${canvasPos.y}`);
        this.setOrigin(chatPos); 

        this.chatLog = new Array();
        this.chatInput = <HTMLInputElement>document.getElementById('chat-box-input');

        this.chatInput.style.width = chatSize.x + 'px';
        this.chatInput.style.height = chatSize.y + 'px';

        this.chatInput.style.position = 'absolute';
        this.chatInput.style.opacity = '.4';
        this.chatInput.style.borderRadius = '5px';


    }

    public update(dt: number): void {
        const canvasPos: vec2 = new vec2(this.canvas.offsetLeft, this.canvas.offsetTop);
        const chatPos: vec2 = new vec2(canvasPos.x + 5, canvasPos.y + 500);

        this.chatInput.style.left = chatPos.x+'px';
        this.chatInput.style.top = chatPos.y+'px';
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.ctx.fillText('Chat Window', this.origin.x, this.origin.y);
    }
}