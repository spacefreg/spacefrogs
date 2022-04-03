import vec2 from '../../core/math/vec2.js';
export default class sfuiElement {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected title: string;
    protected size: vec2;
    protected hasImage: boolean;
    protected imageHTML: HTMLImageElement;
    protected origin: vec2;
    protected isButton: boolean;
    protected backgroundColor: string;
    protected opacity: number;
    constructor(origin: vec2, title: string);
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
    setImage(src: string): void;
}
