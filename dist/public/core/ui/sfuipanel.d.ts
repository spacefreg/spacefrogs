import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class sfuiPanel extends sfuiElement {
    private elements;
    constructor(origin: vec2, title: string);
    adduiElement(origin: vec2, title: string): void;
    mouseMove(mousePos: vec2): void;
    update(dt: number): void;
    render(): void;
}
