import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
export default class FrogPanel extends sfuiPanel {
    private frogPortrait;
    private frogName;
    constructor(origin: vec2, playerName: string);
    update(dt: number): void;
    render(): void;
}
