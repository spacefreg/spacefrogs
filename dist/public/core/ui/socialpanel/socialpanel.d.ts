import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import Player from '../../player.js';
export default class SocialPanel extends sfuiPanel {
    private frogPlayers;
    private selfID;
    constructor(origin: vec2, title: string, selfID: string);
    frogPlayerChanged(player: Player, players: Array<Player>): void;
    mouseMove(mousePos: vec2): void;
    mouseDown(mousePos: vec2): void;
    update(dt: number): void;
    render(): void;
}
