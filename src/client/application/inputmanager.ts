import Vec2 from "../math/vec2.js";

export default class InputManager {
    private static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canv'); 
    private static isMouseDown: boolean = false;
    private static mousePos: Vec2;


    static initCallbacks(): void {
        this.canvas.addEventListener('mousedown', this.mouseDownEvent.bind(this));
        this.canvas.addEventListener('mousemove', this.mouseMoveEvent.bind(this));
        this.mousePos = new Vec2(0, 0); 
    }

    static mouseMoveEvent(evt: MouseEvent): void {
        const canvasRect: DOMRect = this.canvas.getBoundingClientRect();
        this.mousePos = new Vec2(evt.x - canvasRect.x, evt.y - canvasRect.y);
    }
    static mouseDownEvent(evt: MouseEvent): void {
        const canvasRect: DOMRect = this.canvas.getBoundingClientRect();
        console.log(`InputManager::MouseDownEvent::${evt.x - canvasRect.x}, ${evt.y - canvasRect.y}`);
        this.isMouseDown = true;
    }

    //(3/7/22) getMousePos() COULD return the mousePos directly, instead of creating a new Vec2 and returning that,
    //but by returning a separate Vec2 write access to mousePos remains only inside InputManager. Accidentally changing
    //the values of the Vec2 returned by getMousePos() will have no effect
    static getMousePos(): Vec2 {
        const mousePosReadOnly: Vec2 = new Vec2(this.mousePos.x, this.mousePos.y);
        return mousePosReadOnly;
    }
    
}

//(3/7/22) NAMESPACES, SINGLETONS, STATIC, READ UP!! probably create an InputManager namespace
