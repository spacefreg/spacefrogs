export default class Tile {
    constructor(x, y, size) {
        this.xPosition = x;
        this.yPosition = y;
        this.size = size;
    }
    render(dc) {
        dc.ctx.beginPath();
        dc.ctx.rect(this.xPosition, this.yPosition, this.size, this.size);
        dc.ctx.stroke();
    }
}
