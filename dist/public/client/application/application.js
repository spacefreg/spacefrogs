import WorldTimer from '../world/worldtimer.js';
import WorldCanvas from '../world/worldcanvas.js';
export default class Application {
    constructor() {
        this.worldCanvas = new WorldCanvas();
        WorldTimer.start();
        this.dt = 0;
        this.timeOfLastUpdate = Date.now();
    }
    loop() {
        this.dt = Date.now() - this.timeOfLastUpdate;
        this.timeOfLastUpdate = Date.now();
        this.handleInput();
        this.update(this.dt);
        this.render();
        console.log(WorldTimer.getCurrentTime());
        requestAnimationFrame(this.loop.bind(this));
    }
    handleInput() {
    }
    update(dt) {
        WorldTimer.update(dt);
    }
    render() {
    }
}
window.onkeydown = registerKey;
function registerKey(evt) {
    if (evt.code == 'KeyG') {
        WorldTimer.togglePause();
    }
}
