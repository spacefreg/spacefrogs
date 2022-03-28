export default class LobbyCanvas {
    constructor() {
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();
    }
    update(dt) {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.fpsIndicator, 10, 20);
    }
}
