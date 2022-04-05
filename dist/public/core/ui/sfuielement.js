import vec2 from '../math/vec2.js';
export default class sfuiElement {
    constructor(origin, title) {
        this.titleShowing = false;
        this.initialized = false;
        this.hasImage = false;
        this.hasOutline = false;
        this.isButton = false;
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.origin = origin;
        this.title = title;
        this.imageHTML = new Image();
        this.size = new vec2(0, 0);
        this.imageSize = new vec2(0, 0);
        this.backgroundColor = '#5d4178';
        this.opacity = .3;
    }
    //(3/27/22) for passive elements like animations
    update(dt) {
        this.imageSize.x = this.imageHTML.width;
        this.imageSize.y = this.imageHTML.height;
    }
    render() {
        if (this.titleShowing) {
            this.ctx.fillText(this.title, this.origin.x, this.origin.y);
        }
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
        if (this.hasOutline) {
            this.ctx.strokeStyle;
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
    getImageSize() {
        return this.imageSize;
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
        this.imageHTML.onload = () => {
            this.onImageLoad();
        };
    }
    setOutline(bool) {
        this.hasOutline = bool;
    }
    onImageLoad() {
        this.initialized = true;
    }
    isInitialized() {
        return this.initialized;
    }
    enableTitle() {
        this.titleShowing = true;
    }
}
