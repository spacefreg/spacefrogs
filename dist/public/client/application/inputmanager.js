import Vec2 from "../math/vec2.js";
export default class InputManager {
    static initCallbacks() {
        this.canvas.addEventListener('mousedown', this.mouseDownEvent.bind(this));
        this.canvas.addEventListener('mousemove', this.mouseMoveEvent.bind(this));
        this.mousePos = new Vec2(0, 0);
    }
    static mouseMoveEvent(evt) {
        const canvasRect = this.canvas.getBoundingClientRect();
        this.mousePos = new Vec2(evt.x - canvasRect.x, evt.y - canvasRect.y);
    }
    static mouseDownEvent(evt) {
        const canvasRect = this.canvas.getBoundingClientRect();
        console.log(`InputManager::MouseDownEvent::${evt.x - canvasRect.x}, ${evt.y - canvasRect.y}`);
        this.isMouseDown = true;
    }
    //(3/7/22) getMousePos() COULD return the mousePos directly, instead of creating a new Vec2 and returning that,
    //but by returning a separate Vec2 write access to mousePos remains only inside InputManager. Accidentally changing
    //the values of the Vec2 returned by getMousePos() will have no effect
    static getMousePos() {
        const mousePosReadOnly = new Vec2(this.mousePos.x, this.mousePos.y);
        return mousePosReadOnly;
    }
}
InputManager.canvas = document.getElementById('canv');
InputManager.isMouseDown = false;
//(3/7/22) NAMESPACES, SINGLETONS, STATIC, READ UP!! probably create an InputManager namespace
