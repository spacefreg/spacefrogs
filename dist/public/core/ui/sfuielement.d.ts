import vec2 from '../math/vec2.js';
export default class sfuiElement {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    protected origin: vec2;
    protected isButton: boolean;
    protected title: string;
    protected titleOrigin: vec2;
    protected titleShowing: boolean;
    protected initialized: boolean;
    protected size: vec2;
    protected hasImage: boolean;
    protected imageHTML: HTMLImageElement;
    protected imageSize: vec2;
    protected hasOutline: boolean;
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
    getImageSize(): vec2;
    setBackgroundColor(color: string): void;
    setBackgroundOpacity(opacity: number): void;
    setImage(src: string): void;
    setOutline(bool: boolean): void;
    protected onImageLoad(): void;
    isInitialized(): boolean;
    enableTitle(): void;
    setAsButton(): void;
}
