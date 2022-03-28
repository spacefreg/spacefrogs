export default class sfuiElement {
    constructor(origin, text, mainImage, imgSrc) {
        this.origin = origin;
        this.text = text;
        this.mainImage = mainImage;
        this.imgSrc = imgSrc;
        this.width = this.mainImage.width;
        this.height = this.mainImage.height;
    }
    //(3/27/22) for passive elements like animations
    update() {
    }
    render(ctx, x, y) {
        ctx.drawImage(this.mainImage, this.origin.x, this.origin.y);
        ctx.fillText(this.text, x, y);
    }
    //(3/28/22) getters
    getOrigin() {
        return this.origin;
    }
}
