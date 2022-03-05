import Tile from '../tile.js';
export default class WorldCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    testTile: Tile;
    fpsIndicator: string;
    timeFpsIndicatorLastUpdated: number;
    constructor();
    update(dt: number): void;
    render(): void;
    drawTile(tile: Tile): void;
}
