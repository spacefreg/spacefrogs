export default class DrawCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    isDrawing: boolean;
    constructor();
    beginDraw(evt: MouseEvent): void;
    continueDraw(evt: MouseEvent): void;
    endDraw(): void;
    init(): void;
}
