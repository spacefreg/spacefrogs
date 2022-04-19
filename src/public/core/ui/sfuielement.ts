import vec2 from '../math/vec2.js';

export default class sfuiElement {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    
    protected origin: vec2;
    protected isButton: boolean = false;
    protected active: boolean = false;
    protected title: string;
    protected titleOrigin: vec2;
    protected titleShowing: boolean = false;

    protected initialized: boolean = false;
    
    protected size: vec2;

    protected hasImage: boolean = false;
    protected imageHTML: HTMLImageElement;
    protected imageSize: vec2;
    
    protected hasOutline: boolean = false;
    protected isMouseHovering: boolean = false;



    protected backgroundColor: string;
    protected opacity: number;

    constructor(origin: vec2, title: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.origin = origin;
        this.title = title;
        this.titleOrigin = new vec2(0, 0);
        this.imageHTML = new Image();
        this.size = new vec2(0, 0);
        this.imageSize = new vec2(0, 0);

        this.backgroundColor = '#5d4178';
        this.opacity = .3;
    }


    //(3/27/22) for passive elements like animations
    public update(dt: number): void {
        this.imageSize.x = this.imageHTML.width;
        this.imageSize.y = this.imageHTML.height;
    }

    public render(): void {
        if (this.titleShowing) {
            if (this.isButton) {
                this.ctx.fillText(this.title, this.titleOrigin.x, this.titleOrigin.y);
            }
            else {
                this.ctx.fillText(this.title, this.origin.x, this.origin.y);
            }
        }
        
        if (this.hasImage) {
            this.ctx.drawImage(this.imageHTML, this.origin.x, this.origin.y);
        }
        if (this.backgroundColor) {
            const oldAlpha: number = this.ctx.globalAlpha;
            const oldFillStyle: string = <string>this.ctx.fillStyle;

            this.ctx.globalAlpha = this.opacity;
            if (this.isMouseHovering && this.isButton) {
                this.ctx.fillStyle = 'purple'
            }
            else {
                this.ctx.fillStyle = this.backgroundColor;
            }
            this.ctx.fillRect(this.origin.x, this.origin.y, this.size.x, this.size.y);

            this.ctx.globalAlpha = oldAlpha;
            this.ctx.fillStyle = oldFillStyle;
        }

        if (this.hasOutline) {
            this.ctx.strokeRect(this.origin.x, this.origin.y, this.size.x, this.size.y);
        }
    }

    //(3/28/22) getters
    public getOrigin(): vec2 {
        return this.origin;
    }

    public setOrigin(origin: vec2): void {
        this.origin = origin;
    }

    public setTitleOrigin(origin: vec2): void {
        this.titleOrigin = origin;
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

    public getImageSize(): vec2 {
        return this.imageSize;
    }

    public setBackgroundColor(color: string): void {
        this.backgroundColor = color;
    }

    public setBackgroundOpacity(opacity: number): void {
        this.opacity = opacity;
    }

    public setImage(src: string): void {
        this.hasImage = true;
        this.imageHTML.src = src;
        
        this.imageHTML.onload = () => {
            this.onImageLoad();
        }
    }

    public setOutline(bool: boolean): void {
        this.hasOutline = bool;
    } 

    protected onImageLoad(): void {
        this.initialized = true;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public isActive(): boolean {
        return this.active;
    }

    public enableTitle(): void {
        this.titleShowing = true;
    }

    public setAsButton(): void {
        this.isButton = true;
        this.titleShowing = true;
    }

    public mouseMove(mousePos: vec2): void {
        if (mousePos.x >= this.origin.x && mousePos.x <= this.origin.x + this.getSize().x &&
            mousePos.y >= this.origin.y && mousePos.y <= this.origin.y + this.getSize().y) {
            this.isMouseHovering = true;
        }
        else {
            this.isMouseHovering = false;
        }
    }

    public mouseDown(mousePos: vec2): void {
        if (this.isMouseHovering && this.isButton) {
            this.active = !this.active;
            //console.log(`${this.title} button active: ${this.active}`);
        }
    }
}