import Tile from '../tile.js';

export default class WorldCanvas {
    canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canv')!; 
    ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    isDrawing: boolean = false;

    testTile: Tile;

    constructor() {
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

    

    drawTile(tile: Tile): void {
        tile.render(this);
    }
}