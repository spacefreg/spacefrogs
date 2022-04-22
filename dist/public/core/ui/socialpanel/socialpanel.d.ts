import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import FrogPlayer from './frogplayer.js';
import Player from '../../player.js';
export default class SocialPanel extends sfuiPanel {
    frogPlayers: Array<FrogPlayer>;
    private socket;
    private selfID;
    constructor(origin: vec2, title: string, selfID: string, socket: io);
    frogPlayerChanged(player: Player, players: Array<Player>): void;
    mouseMove(mousePos: vec2): void;
    mouseDown(mousePos: vec2): void;
    setFrogPlayerCountry(name: string, country: string): void;
    getHost(): FrogPlayer;
    hide(): void;
    show(): void;
    update(dt: number): void;
    render(): void;
}
