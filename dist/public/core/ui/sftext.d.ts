import vec2 from '../utils/vec2.js';
export default class sfText {
    private textContent;
    private topLeftPos;
    private fontSize;
    private font;
    private size;
    private backgroundShowing;
    constructor(textContent: string, topLeftPos: vec2, fontSize: number, font: string);
    setText(textContent: string): void;
    getText(): string;
    setPosition(topLeftPos: vec2): void;
    toggleBackground(): void;
    getTextCenter(): vec2;
    getHalfSize(): vec2;
    render(): void;
}
