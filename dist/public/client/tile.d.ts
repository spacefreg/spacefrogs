import WorldCanvas from './world/worldcanvas.js';
export default class Tile {
    xPosition: number;
    yPosition: number;
    size: number;
    constructor(x: number, y: number, size: number);
    render(dc: WorldCanvas): void;
}
