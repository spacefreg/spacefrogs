import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import Player from '../../core/player.js';
import sfDate from '../../core/math/sfdate.js';
export default class GameCanvas {
    private canvas;
    private ctx;
    private socket;
    private socialPanel;
    private frogPanel;
    private gameWindow;
    private selfID;
    constructor(campaignName: string, players: Array<Player>, socket: io);
    addPlayer(p: Player, players: Array<Player>): void;
    dropPlayer(player: Player, lobbyPlayers: Array<Player>): void;
    mouseMove(evt: MouseEvent): void;
    keyDown(evt: KeyboardEvent): void;
    goTomorrow(date: sfDate): void;
    update(dt: number): void;
    render(): void;
}
