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
    constructor(origin: vec2, text: string, mainImage: HTMLImageElement, imgSrc: string);
    update(dt: number): void;
    render(ctx: CanvasRenderingContext2D): void;
    getOrigin(): vec2;
    setOrigin(origin: vec2): void;
    getText(): string;
    setText(text: string): void;
}
