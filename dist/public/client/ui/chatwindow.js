import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class ChatWindow extends sfuiElement {
    //public chatWindow: CanvasRect;
    constructor(origin) {
        super(origin, 'chatWindow', new Image(), '');
        const canvasPos = new vec2(this.canvas.offsetLeft, this.canvas.offsetTop);
        const chatSize = new vec2(this.canvas.width * .25, this.canvas.height * .05);
        const chatPos = new vec2(canvasPos.x + 5, canvasPos.y + 5);
        console.log(`canvasPos: ${canvasPos.x}, ${canvasPos.y}`);
        this.setOrigin(chatPos);
        this.chatLog = new Array();
        this.chatInput = document.getElementById('chat-box-input');
        this.chatInput.style.width = chatSize.x + 'px';
        this.chatInput.style.height = chatSize.y + 'px';
        this.chatInput.style.position = 'absolute';
        this.chatInput.style.opacity = '.4';
        this.chatInput.style.borderRadius = '5px';
    }
    update(dt) {
        const canvasPos = new vec2(this.canvas.offsetLeft, this.canvas.offsetTop);
        const chatPos = new vec2(canvasPos.x + 5, canvasPos.y + 500);
        this.chatInput.style.left = chatPos.x + 'px';
        this.chatInput.style.top = chatPos.y + 'px';
    }
    render(ctx) {
        this.ctx.fillText('Chat Window', this.origin.x, this.origin.y);
    }
}
