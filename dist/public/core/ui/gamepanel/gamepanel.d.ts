import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
export default class GamePanel extends sfuiPanel {
    private lobbyPrompt;
    constructor(origin: vec2, title: string);
    update(dt: number): void;
    render(): void;
    mouseMove(mousePos: vec2): void;
    mouseDown(mousePos: vec2): string;
    gameWindowSelection(selection: string): void;
}
