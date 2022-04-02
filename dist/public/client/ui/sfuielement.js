import vec2 from '../../core/math/vec2.js';
export default class sfuiElement {
    constructor(origin, text, mainImage, imgSrc) {
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.origin = origin;
        this.text = text;
        this.mainImage = mainImage;
        this.imgSrc = imgSrc;
        this.mainImage.src = this.imgSrc;
        this.size = new vec2(0, 0);
        this.backgroundColor = 'red';
        this.opacity = .3;
    }
    //(3/27/22) for passive elements like animations
    update(dt) {
    }
    render() {
        this.ctx.fillText(this.text, this.origin.x, this.origin.y);
        this.ctx.drawImage(this.mainImage, this.origin.x, this.origin.y);
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
        return this.text;
    }
    setText(text) {
        this.text = text;
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
}
