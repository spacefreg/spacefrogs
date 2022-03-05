import WorldCanvas from './world/worldcanvas.js';

export default class Tile {
    xPosition: number;
    yPosition: number;
    size: number;

    constructor(x: number, y: number, size: number) {
        this.xPosition = x;
        this.yPosition = y;
        this.size = size;
    }

    render(dc: WorldCanvas) {
        dc.ctx.beginPath();
        dc.ctx.rect(this.xPosition, this.yPosition, this.size, this.size);
        dc.ctx.stroke();
    }
}