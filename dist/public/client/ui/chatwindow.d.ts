import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class ChatWindow extends sfuiElement {
    chatLog: Array<string>;
    chatInput: HTMLInputElement;
    private chatBackground;
    private canvasOrigin;
    constructor(origin: vec2);
    update(dt: number): void;
    render(): void;
}
