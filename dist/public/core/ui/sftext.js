import vec2 from '../utils/vec2.js';
import { ctx } from '../utils/ctx.js';
export default class sfText {
    constructor(textContent, topLeftPos, fontSize, font) {
        this.backgroundShowing = false;
        this.textContent = textContent;
        this.topLeftPos = new vec2(topLeftPos.x, topLeftPos.y);
        this.fontSize = fontSize;
        this.font = font;
        this.size = new vec2(0, 0);
        this.size.x = ctx.measureText(this.textContent).width * (this.fontSize / 12);
        this.size.y = this.fontSize;
    }
    setText(textContent) {
        this.textContent = textContent;
        this.size.x = ctx.measureText(this.textContent).width * (this.fontSize / 12);
    }
    getText() {
        return this.textContent;
    }
    setPosition(topLeftPos) {
        this.topLeftPos = new vec2(topLeftPos.x, topLeftPos.y);
    }
    toggleBackground() {
        this.backgroundShowing = !this.backgroundShowing;
    }
    getTextCenter() {
        return new vec2(this.topLeftPos.x + (this.size.x / 2), this.topLeftPos.y + (this.size.y / 2));
    }
    getHalfSize() {
        return new vec2(this.size.x / 2, this.size.y / 2);
    }
    render() {
        ctx.save();
        ctx.textBaseline = 'top';
        ctx.font = this.fontSize + 'px ' + this.font;
        if (this.backgroundShowing) {
            ctx.fillStyle = 'rgba(0, 50, 120, 0.5)';
            ctx.fillRect(this.topLeftPos.x, this.topLeftPos.y, this.size.x, this.size.y);
        }
        ctx.fillStyle = 'white';
        ctx.fillText(this.textContent, this.topLeftPos.x, this.topLeftPos.y);
        ctx.restore();
    }
}
