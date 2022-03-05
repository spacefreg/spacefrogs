export default class InputManager {
    static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canv'); 


    static initCallbacks(): void {
        this.canvas.addEventListener('mousedown', this.mouseDownEvent.bind(this));
    }
    static mouseDownEvent(evt: MouseEvent): void {
        const canvasRect: DOMRect  = this.canvas.getBoundingClientRect();
        console.log(`InputManager::MouseDownEvent::${evt.x - canvasRect.x}, ${evt.y - canvasRect.y}`);
    }
    
}

