import vec2 from '../../core/math/vec2.js';
export default class sfuiElement {
    constructor(origin, title) {
        this.hasImage = false;
        this.isButton = false;
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.origin = origin;
        this.title = title;
        this.imageHTML = new Image();
        this.size = new vec2(0, 0);
        this.backgroundColor = 'red';
        this.opacity = .3;
    }
    //(3/27/22) for passive elements like animations
    update(dt) {
    }
    render() {
        this.ctx.fillText(this.title, this.origin.x, this.origin.y);
        if (this.hasImage) {
            this.ctx.drawImage(this.imageHTML, this.origin.x, this.origin.y);
        }
        if (this.backgroundColor) {
            const oldAlpha = this.ctx.globalAlpha;
            const oldFillStyle = this.ctx.fillStyle;
            this.ctx.globalAlpha = this.opacity;
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(this.origin.x, this.origin.y, this.size.x, this.size.y);
            this.ctx.globalAlpha = oldAlpha;
            this.ctx.fillStyle = oldFillStyle;
        }
    }
    //(3/28/22) getters
    getOrigin() {
        return this.origin;
    }
    setOrigin(origin) {
        this.origin = origin;
    }
    getText() {
        return this.title;
    }
    setText(text) {
        this.title = text;
    }
    setSize(size) {
        this.size = size;
    }
    getSize() {
        return this.size;
    }
    setBackgroundColor(color) {
        this.backgroundColor = color;
    }
    setOpacity(opacity) {
        this.opacity = opacity;
    }
    setImage(src) {
        this.hasImage = true;
        this.imageHTML.src = src;
    }
}
