import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
export default class SocialPanel extends sfuiPanel {
    private frogPlayers;
    constructor(origin: vec2, title: string);
    update(dt: number): void;
    render(): void;
}
