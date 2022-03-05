import WorldTimer from '../world/worldtimer.js';
import WorldCanvas from '../world/worldcanvas.js';

export default class Application {
    private worldCanvas: WorldCanvas;
    private dt: number;
    private timeOfLastUpdate: number;

    constructor() {
        this.worldCanvas = new WorldCanvas();
        WorldTimer.start();
        this.dt = 0;
        this.timeOfLastUpdate = Date.now();
    }
    loop(): void {


        this.dt = Date.now() - this.timeOfLastUpdate;
        this.timeOfLastUpdate = Date.now();

        this.handleInput();
        this.update(this.dt);
        this.render();

        console.log(WorldTimer.getCurrentTime());

        requestAnimationFrame(this.loop.bind(this));
    }

    handleInput(): void {

    }

    update(dt: number): void {
        WorldTimer.update(dt);
    }

    render(): void {

    }
}

window.onkeydown = registerKey;

function registerKey(evt: KeyboardEvent) {
    if (evt.code == 'KeyG') {
        WorldTimer.togglePause();
    }
}