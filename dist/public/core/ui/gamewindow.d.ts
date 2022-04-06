import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class GameWindow extends sfuiElement {
    private sun;
    private earth;
    constructor(origin: vec2, size: vec2);
    update(dt: number): void;
    render(): void;
    getCenter(): vec2;
}
