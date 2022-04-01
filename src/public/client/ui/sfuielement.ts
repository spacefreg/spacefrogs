import vec2 from '../../core/math/vec2.js';

export default class sfuiElement {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;

    protected text: string;
    protected mainImage: HTMLImageElement;
    protected imgSrc: string;
    protected width: number;
    protected height: number;

    protected origin: vec2;

    constructor(origin: vec2, text: string, mainImage: HTMLImageElement, imgSrc: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        
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
    public update(dt: number): void {
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillText(this.text, this.origin.x, this.origin.y);
        ctx.drawImage(this.mainImage, this.origin.x, this.origin.y);
    }

    //(3/28/22) getters
    public getOrigin(): vec2 {
        return this.origin;
    }

    public setOrigin(origin: vec2): void {
        this.origin = origin;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }
}