import Tile from '../tile.js';
import WorldTimer from './worldtimer.js';
export default class WorldCanvas {
    constructor() {
        this.canvas = document.getElementById('canv');
        this.ctx = this.canvas.getContext('2d');
        console.log('DrawCanvas constructor');
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = `rgb(20, 20, 20)`;
        this.ctx.fill();
        this.testTile = new Tile(200, 200, 50);
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = Date.now();
        this.drawTile(this.testTile);
    }
    update(dt) {
        if (Date.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = Date.now();
        }
    }
    render() {
        this.ctx.fillStyle = `rgb(20, 20, 20)`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '24px helvetica';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(WorldTimer.getCurrentTime().toString(), 500, 200);
        this.ctx.fillText(this.fpsIndicator, 0, 20);
        this.drawTile(this.testTile);
    }
    drawTile(tile) {
        tile.render(this);
    }
}
