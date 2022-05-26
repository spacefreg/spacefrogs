import vec2 from '../utils/vec2.js';
import { ctx } from '../utils/ctx.js'

export default class sfText {
    private textContent: string;
    private topLeftPos: vec2;
    private fontSize: number;
    private font: string;
    private size: vec2;

    private backgroundShowing: boolean = false;

    constructor(textContent: string, topLeftPos: vec2, fontSize: number, font: string) {
        this.textContent = textContent;
        this.topLeftPos = new vec2(topLeftPos.x, topLeftPos.y);
        this.fontSize = fontSize;
        this.font = font;
        this.size = new vec2(0, 0);

        this.size.x = ctx.measureText(this.textContent).width * (this.fontSize / 12);
        this.size.y = this.fontSize;
    }

    public setText(textContent: string): void {
        this.textContent = textContent;
        this.size.x = ctx.measureText(this.textContent).width * (this.fontSize / 12);
    }

    public getText(): string {
        return this.textContent;
    }

    public setPosition(topLeftPos: vec2): void {
        this.topLeftPos = new vec2(topLeftPos.x, topLeftPos.y);
    }

    public toggleBackground(): void {
        this.backgroundShowing = !this.backgroundShowing;
    }

    public getTextCenter(): vec2 {
        return new vec2(this.topLeftPos.x + (this.size.x / 2), this.topLeftPos.y + (this.size.y / 2));
    }

    public getHalfSize(): vec2 {
        return new vec2(this.size.x / 2, this.size.y / 2);
    }

    public render(): void {
        ctx.save();
        ctx.textBaseline = 'top';
        ctx.font = this.fontSize + 'px ' + this.font;

        if (this.backgroundShowing) {
            ctx.fillStyle = 'rgba(0, 50, 120, 0.5)';
            ctx.fillRect(this.topLeftPos.x, this.topLeftPos.y, this.size.x, this.size.y);
        }

        ctx.fillStyle = 'white';
        ctx.fillText(this.textContent, this.topLeftPos.x, this.topLeftPos.y);

  
        ctx.restore();
    }
}