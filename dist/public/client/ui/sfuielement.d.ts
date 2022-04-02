import vec2 from '../../core/math/vec2.js';
export default class sfuiElement {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected text: string;
    protected mainImage: HTMLImageElement;
    protected imgSrc: string;
    protected size: vec2;
    protected origin: vec2;
    protected backgroundColor: string;
    protected opacity: number;
    constructor(origin: vec2, text: string, mainImage: HTMLImageElement, imgSrc: string);
    update(dt: number): void;
    render(): void;
    getOrigin(): vec2;
    setOrigin(origin: vec2): void;
    getText(): string;
    setText(text: string): void;
    setSize(size: vec2): void;
    getSize(): vec2;
    setBackgroundColor(color: string): void;
    setOpacity(opacity: number): void;
}
