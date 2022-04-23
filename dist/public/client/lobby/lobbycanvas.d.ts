import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import Player from '../../core/player.js';
export default class LobbyCanvas {
    isRunning: boolean;
    private canvas;
    ctx: CanvasRenderingContext2D;
    private socket;
    private gameWindow;
    private fpsIndicator;
    private timeFpsIndicatorLastUpdated;
    private socialPanel;
    private frogPanel;
    private gamePanel;
    private playerSelections;
    private startCampaignButton;
    private isSelfHost;
    constructor(self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>, socket: io);
    update(dt: number): void;
    addPlayer(playerarg: Player, lobbyPlayers: Array<Player>): void;
    dropPlayer(player: Player, lobbyPlayers: Array<Player>): void;
    mouseDown(evt: MouseEvent): void;
    mouseMove(evt: MouseEvent): void;
    render(): void;
    private sfPlayerCountrySelection;
    private sfPlayerReady;
    private sfPlayerNotReady;
    kill(): void;
}
