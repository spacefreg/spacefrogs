import vec2 from '../utils/vec2.js';

export default class sfuiElement {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    
    protected origin: vec2;
    protected isButton: boolean = false;
    protected hasToggle: boolean = false;
    protected isTooltip: boolean = false;
    protected active: boolean = false;
    protected title: string;
    protected titleOrigin: vec2;
    protected titleShowing: boolean = false;
    protected titleFontSize: number = 12;

    protected initialized: boolean = false;
    
    protected size: vec2;
    protected outlineSize: vec2 = new vec2(0, 0);
    protected outlineOrigin: vec2 = new vec2(0, 0);

    protected hasImage: boolean = false;
    protected imageHTML: HTMLImageElement;
    protected imageSize: vec2;
    
    protected hasOutline: boolean = false;
    protected isMouseHovering: boolean = false;


    protected isHidden: boolean = false;

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

        this.backgroundColor = '#271E4C';
        this.opacity = 0;
    }


    //(3/27/22) for passive elements like animations
    public update(dt: number): void {
        this.imageSize.x = this.imageHTML.width;
        this.imageSize.y = this.imageHTML.height;
    }

    //(4/19/22) please clean this up someday soon
    public render(): void {
        const oldAlpha: number = this.ctx.globalAlpha;
        const oldFillStyle: string = <string>this.ctx.fillStyle;
        if (!this.isHidden) {

            if (this.hasImage) {
                this.ctx.drawImage(this.imageHTML, this.origin.x, this.origin.y);

                if (this.isMouseHovering && this.isButton) {
                    this.ctx.globalAlpha = 0.33;
                    this.ctx.fillStyle = 'purple';
                    
                    this.ctx.fillRect(this.origin.x, this.origin.y, this.size.x, this.size.y);
                }
            }
            if (this.backgroundColor) {


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
                if (this.outlineSize.x > 0) {
                    this.ctx.strokeRect(this.outlineOrigin.x, this.outlineOrigin.y, this.outlineSize.x, this.outlineSize.y);
                }
                else {
                    this.ctx.strokeRect(this.origin.x, this.origin.y, this.size.x, this.size.y);
                }
            }

            const oldFont = this.ctx.font;
            this.ctx.font = `${this.titleFontSize}px Arial`;

            if (this.titleShowing) {
                if (this.isButton) {
                    this.ctx.fillText(this.title, this.titleOrigin.x, this.titleOrigin.y);
                }
                else {
                    this.ctx.fillText(this.title, this.origin.x, this.origin.y);
                }
            }
            else if (this.isTooltip) {
                //console.log(`tooltip draw: ${this.title}`);
                this.ctx.fillText(this.title, this.titleOrigin.x, this.titleOrigin.y);
            }

            this.ctx.font = oldFont;
        }
    }

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

        if (this.isTooltip) {
            this.size.x = this.getTextWidth();
            this.size.y = this.titleFontSize;

            this.origin.x = this.origin.x - this.size.x / 2;
            this.origin.y -= 12;
            this.titleOrigin.x = this.origin.x;
            this.titleOrigin.y = this.origin.y + 10;
        }
    }

    public setFontSize(size: number): void {
        this.titleFontSize = size;
    }

    public setOutlineSize(size: vec2): void {
        this.outlineSize = size;
    }

    public setOutlineOrigin(origin: vec2): void {
        this.outlineOrigin = origin;
    }

    public getTextWidth(): number {
        return this.ctx.measureText(this.title).width;
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
        this.size.x = this.imageHTML.width;
        this.size.y = this.imageHTML.height;
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

    public setAsTooltip(): void {
        this.isTooltip = true;
    }

    public setAsButton(): void {
        this.isButton = true;
        this.titleShowing = true;
    }
    
    public setAsToggle(): void {
        this.hasToggle = true;
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
        if (!this.isHidden) {
            if (this.isMouseHovering && this.hasToggle) {
                this.toggleActive();
            }
            else if (this.isMouseHovering) {
            this.active = true; 
            }
            else 
            {
                if (!this.hasToggle) {
                    this.active = false;
                }
            } 
        }
    }

    public isHovering(): boolean {
        return this.isMouseHovering;
    }

    public setHovering(bool: boolean): void {
        this.isMouseHovering = bool;
    }

    public hide(): void {
        this.isHidden = true;
        this.active = false;
    }

    public show(): void {
        this.isHidden = false;
    }

    public toggleActive(): void {
        this.active = !this.active;
    }
}