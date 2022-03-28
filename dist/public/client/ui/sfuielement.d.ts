import vec2 from '../../core/math/vec2.js';
export default class sfuiElement {
    private text;
    private mainImage;
    private imgSrc;
    private width;
    private height;
    private origin;
    constructor(origin: vec2, text: string, mainImage: HTMLImageElement, imgSrc: string);
    update(): void;
    render(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    getOrigin(): vec2;
}
