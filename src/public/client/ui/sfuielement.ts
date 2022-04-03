import vec2 from '../../core/math/vec2.js';

export default class sfuiElement {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;

    protected title: string;
    
    protected size: vec2;

    protected hasImage: boolean = false;
    protected imageHTML: HTMLImageElement;
    

    protected origin: vec2;

    protected isButton: boolean = false;

    protected backgroundColor: string;
    protected opacity: number;

    constructor(origin: vec2, title: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.origin = origin;
        this.title = title;
        this.imageHTML = new Image();
        this.size = new vec2(0, 0);

        this.backgroundColor = 'red';
        this.opacity = .3;
    }


    //(3/27/22) for passive elements like animations
    public update(dt: number): void {
    }

    public render(): void {
        this.ctx.fillText(this.title, this.origin.x, this.origin.y);
        
        if (this.hasImage) {
            this.ctx.drawImage(this.imageHTML, this.origin.x, this.origin.y);
        }
        if (this.backgroundColor) {
            const oldAlpha: number = this.ctx.globalAlpha;
            const oldFillStyle: string = <string>this.ctx.fillStyle;

            this.ctx.globalAlpha = this.opacity;
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(this.origin.x, this.origin.y, this.size.x, this.size.y);

            this.ctx.globalAlpha = oldAlpha;
            this.ctx.fillStyle = oldFillStyle
        }
    }

    //(3/28/22) getters
    public getOrigin(): vec2 {
        return this.origin;
    }

    public setOrigin(origin: vec2): void {
        this.origin = origin;
    }

    public getText(): string {
        return this.title;
    }

    public setText(text: string): void {
        this.title = text;
    }

    public setSize(size: vec2) {
        this.size = size;
    }

    public getSize(): vec2 {
        return this.size;
    }

    public setBackgroundColor(color: string): void {
        this.backgroundColor = color;
    }

    public setOpacity(opacity: number): void {
        this.opacity = opacity;
    }

    public setImage(src: string): void {
        this.hasImage = true;
        this.imageHTML.src = src;
    }
}