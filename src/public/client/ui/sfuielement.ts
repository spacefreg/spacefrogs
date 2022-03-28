import vec2 from '../../core/math/vec2.js';

export default class sfuiElement {
    private text: string;
    private mainImage: HTMLImageElement;
    private imgSrc: string;
    private width: number;
    private height: number;

    private origin: vec2;

    constructor(origin: vec2, text: string, mainImage: HTMLImageElement, imgSrc: string) {
        this.origin = origin;
        this.text = text;
        this.mainImage = mainImage;
        this.imgSrc = imgSrc;
        this.width = this.mainImage.width;
        this.height = this.mainImage.height;
    }


    //(3/27/22) for passive elements like animations
    public update(): void {

    }

    public render(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.drawImage(this.mainImage, this.origin.x, this.origin.y);
        ctx.fillText(this.text, x, y);
    }

    //(3/28/22) getters
    public getOrigin(): vec2 {
        return this.origin;
    }
}