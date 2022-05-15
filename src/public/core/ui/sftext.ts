import vec2 from '../utils/vec2.js';
import { ctx } from '../utils/ctx.js'

export default class sfText {
    private textContent: string;
    private topLeftPos: vec2;
    private fontSize: number;
    private font: string;
    private size: vec2;

    constructor(textContent: string, topLeftPos: vec2, fontSize: number, font: string) {
        this.textContent = textContent.valueOf();
        this.topLeftPos = new vec2(topLeftPos.x, topLeftPos.y);
        this.fontSize = fontSize;
        this.font = font;
        this.size = new vec2(0, 0);

        this.size.x = ctx.measureText(this.textContent).width;
        this.size.y = this.fontSize;
    }

    public setText(textContent: string): void {
        this.textContent = textContent.valueOf();
        this.size.x = ctx.measureText(this.textContent).width;
    }

    public render(): void {
        ctx.save();
        ctx.font = this.fontSize + 'px ' + this.font;
        ctx.fillText(this.textContent, this.topLeftPos.x, this.topLeftPos.y);
        ctx.restore();
    }
}