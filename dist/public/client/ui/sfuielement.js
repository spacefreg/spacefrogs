export default class sfuiElement {
    constructor(origin, text, mainImage, imgSrc) {
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.origin = origin;
        this.text = text;
        this.mainImage = mainImage;
        this.imgSrc = imgSrc;
        this.mainImage.src = this.imgSrc;
        this.width = this.mainImage.width;
        this.height = this.mainImage.height;
        console.log(`sfuiElement constructor. mainImage: ${mainImage.width}`);
    }
    //(3/27/22) for passive elements like animations
    update(dt) {
    }
    render(ctx) {
        ctx.fillText(this.text, this.origin.x, this.origin.y);
        ctx.drawImage(this.mainImage, this.origin.x, this.origin.y);
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
}
