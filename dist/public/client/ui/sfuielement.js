export default class sfuiElement {
    constructor(origin, text, mainImage, imgSrc) {
        this.origin = origin;
        this.text = text;
        this.mainImage = mainImage;
        this.imgSrc = imgSrc;
        this.mainImage.src = this.imgSrc;
        this.width = this.mainImage.width;
        this.height = this.mainImage.height;
        console.log(`sfuiElement constructor. mainImage: ${mainImage.width}`);
        console.log(`w:${this.width}, h:${this.height}`);
    }
    //(3/27/22) for passive elements like animations
    update() {
    }
    render(ctx) {
        ctx.fillText(this.text, this.origin.x, this.origin.y);
        console.log(this.width);
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.origin.x, this.origin.y, this.width, this.height);
        ctx.drawImage(this.mainImage, this.origin.x, this.origin.y);
        ctx.fillStyle = 'white';
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
