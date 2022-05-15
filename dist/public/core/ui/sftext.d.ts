import vec2 from '../utils/vec2.js';
export default class sfText {
    private textContent;
    private topLeftPos;
    private fontSize;
    private font;
    private size;
    constructor(textContent: string, topLeftPos: vec2, fontSize: number, font: string);
    setText(textContent: string): void;
    render(): void;
}
