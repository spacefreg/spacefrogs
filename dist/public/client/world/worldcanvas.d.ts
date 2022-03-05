import Tile from '../tile.js';
export default class WorldCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    isDrawing: boolean;
    testTile: Tile;
    constructor();
    drawTile(tile: Tile): void;
}
