import WorldTimer from '../world/worldtimer.js';
import WorldCanvas from '../world/worldcanvas.js';
import InputManager from './inputmanager.js';
export default class Application {
    constructor() {
        this.worldCanvas = new WorldCanvas();
        WorldTimer.start();
        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
        InputManager.initCallbacks();
    }
    loop() {
        this.dt = performance.now() - this.timeOfLastUpdate;
        this.timeOfLastUpdate = performance.now();
        this.handleInput();
        this.update(this.dt);
        this.render();
        //console.log(WorldTimer.getCurrentTime());
        requestAnimationFrame(this.loop.bind(this));
    }
    handleInput() {
    }
    update(dt) {
        WorldTimer.update(dt);
        this.worldCanvas.update(dt);
    }
    render() {
        this.worldCanvas.render();
    }
}
window.onkeydown = registerKey;
function registerKey(evt) {
    if (evt.code == 'KeyG') {
        WorldTimer.togglePause();
    }
}
