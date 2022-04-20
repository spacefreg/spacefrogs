import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class GameWindow extends sfuiElement {
    private sun;
    private earth;
    private moon;
    private mars;
    private venus;
    private mercury;
    private currentPlanetHover;
    private planetHoverElement;
    private currentMousePos;
    constructor(origin: vec2, size: vec2);
    update(dt: number): void;
    render(): void;
    getCenter(): vec2;
    mouseMove(mousePos: vec2): void;
}
