import Tile from '../tile.js';
export default class WorldCanvas {
    constructor() {
        this.canvas = document.getElementById('canv');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        console.log('DrawCanvas constructor');
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = `rgb(20, 20, 20)`;
        this.ctx.fill();
        this.testTile = new Tile(200, 200, 50);
        this.drawTile(this.testTile);
    }
    // init(): void {
    //     //mouse event listeners
    //     console.log('calling init in drawcanvas');
    // }
    drawTile(tile) {
        tile.render(this);
    }
}
