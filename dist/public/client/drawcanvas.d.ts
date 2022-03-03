import Tile from "./tile.js";
export default class DrawCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    isDrawing: boolean;
    testTile: Tile;
    constructor();
    init(): void;
    beginDraw(evt: MouseEvent): void;
    continueDraw(evt: MouseEvent): void;
    endDraw(): void;
    drawTile(tile: Tile): void;
}
