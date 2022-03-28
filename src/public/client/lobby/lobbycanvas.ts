
export default class LobbyCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private fpsIndicator: string;
    private timeFpsIndicatorLastUpdated: number;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();
    }

    public update(dt: number): void {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.fpsIndicator, 10, 20);
    }
}