import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import Player from '../../core/player.js';
import sfGoTomorrow from '../../core/messages/server/sfgotomorrow.js';
export default class GameCanvas {
    private canvas;
    private ctx;
    private socket;
    private socialPanel;
    private frogPanel;
    private gameWindow;
    private gamePanel;
    private selfID;
    private gameTileInfo;
    constructor(campaignName: string, players: Array<Player>, socket: io);
    addPlayer(p: Player, players: Array<Player>): void;
    dropPlayer(player: Player, lobbyPlayers: Array<Player>): void;
    mouseMove(evt: MouseEvent): void;
    mouseDown(evt: MouseEvent): void;
    keyDown(evt: KeyboardEvent): void;
    goTomorrow(goTomorrowMsg: sfGoTomorrow): void;
    update(dt: number): void;
    render(): void;
}
