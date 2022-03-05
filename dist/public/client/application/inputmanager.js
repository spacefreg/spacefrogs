export default class InputManager {
    static initCallbacks() {
        this.canvas.addEventListener('mousedown', this.mouseDownEvent.bind(this));
    }
    static mouseDownEvent(evt) {
        const canvasRect = this.canvas.getBoundingClientRect();
        console.log(`InputManager::MouseDownEvent::${evt.x - canvasRect.x}, ${evt.y - canvasRect.y}`);
    }
}
InputManager.canvas = document.getElementById('canv');
