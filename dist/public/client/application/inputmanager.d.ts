import Vec2 from "../math/vec2.js";
export default class InputManager {
    private static canvas;
    private static isMouseDown;
    private static mousePos;
    static initCallbacks(): void;
    static mouseMoveEvent(evt: MouseEvent): void;
    static mouseDownEvent(evt: MouseEvent): void;
    static getMousePos(): Vec2;
}
