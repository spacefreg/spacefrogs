import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class ChatWindow extends sfuiElement {
    constructor(origin) {
        super(origin, '', new Image(), '');
        this.canvasOrigin = new vec2(this.canvas.offsetLeft, this.canvas.offsetTop);
        const chatSize = new vec2(this.canvas.width * .15, this.canvas.height * .025);
        //const chatPos: vec2 = new vec2(this.origin.x + 5, this.origin.y + 5);
        this.chatLog = new Array();
        this.chatInput = document.getElementById('chat-box-input');
        this.chatInput.style.width = chatSize.x + 'px';
        this.chatInput.style.height = chatSize.y + 'px';
        this.chatInput.style.position = 'absolute';
        this.chatInput.style.opacity = '.4';
        this.chatInput.style.outline = 'none';
        this.chatInput.style.borderRadius = '5px';
        this.chatBackground = new sfuiElement(origin, '', new Image(), '');
        this.chatBackground.setSize(new vec2(chatSize.x, 200));
        //this.chatBackground.setOrigin(this.origin);
    }
    update(dt) {
        this.canvasOrigin = new vec2(this.canvas.offsetLeft, this.canvas.offsetTop);
        //const chatBoxY: number = this.origin.y + this.canvasOrigin.y + chatSize.y;
        //const chatBoxVec: vec2 = new vec2(chatPos.x, chatBoxY);
        this.chatInput.style.left = this.origin.x + this.canvasOrigin.x - 4 + 'px';
        this.chatInput.style.top = this.origin.y + this.canvasOrigin.y + this.chatBackground.getSize().y + 'px';
        //this.chatBackground.setOrigin(new vec2(this.chatInput.getBoundingClientRect().x, this.chatInput.getBoundingClientRect().y));
    }
    render() {
        this.ctx.fillText('', this.origin.x, this.origin.y);
        this.chatBackground.render();
    }
}
