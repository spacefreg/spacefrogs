export default class DrawCanvas {
    constructor() {
        this.canvas = document.getElementById('canv');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        console.log('DrawCanvas constructor');
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = `rgb(175, 203, 204)`;
        this.ctx.fill();
    }
    beginDraw(evt) {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(evt.pageX - this.canvas.offsetLeft, evt.pageY - this.canvas.offsetTop);
    }
    continueDraw(evt) {
        if (!this.isDrawing) {
            return;
        }
        this.ctx.lineTo(evt.pageX - this.canvas.offsetLeft, evt.pageY - this.canvas.offsetTop);
        this.ctx.stroke();
    }
    endDraw() {
        if (!this.isDrawing) {
            return;
        }
        this.isDrawing = false;
    }
    init() {
        //mouse event listeners
        this.canvas.addEventListener('mousedown', this.beginDraw.bind(this));
        this.canvas.addEventListener('mousemove', this.continueDraw.bind(this));
        this.canvas.addEventListener('mouseup', this.endDraw.bind(this));
    }
}
