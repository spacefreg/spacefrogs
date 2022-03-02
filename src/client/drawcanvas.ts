
export default class DrawCanvas {
    public canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canv')!; 
    public ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    isDrawing: boolean = false;

    constructor() {
        console.log('DrawCanvas constructor');
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = `rgb(175, 203, 204)`;
        this.ctx.fill();
    }

    
    public beginDraw(evt: MouseEvent): void {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(evt.pageX - this.canvas.offsetLeft, evt.pageY - this.canvas.offsetTop);
    }


    public continueDraw(evt: MouseEvent): void {
        if (!this.isDrawing) {
            return;
        } 
        this.ctx.lineTo(evt.pageX - this.canvas.offsetLeft, evt.pageY - this.canvas.offsetTop);
        this.ctx.stroke();
    }

    public endDraw(): void {
        if (!this.isDrawing) {
            return;
        }
        this.isDrawing = false;
    }

    public init(): void {
        //mouse event listeners
        this.canvas.addEventListener('mousedown', this.beginDraw.bind(this));
        this.canvas.addEventListener('mousemove', this.continueDraw.bind(this));
        this.canvas.addEventListener('mouseup', this.endDraw.bind(this));
    }

}