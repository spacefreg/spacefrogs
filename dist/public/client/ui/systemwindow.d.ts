import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class SystemWindow extends sfuiElement {
    constructor(origin: vec2, size: vec2);
    render(): void;
}
