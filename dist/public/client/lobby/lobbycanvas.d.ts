import Player from '../../core/player.js';
export default class LobbyCanvas {
    private canvas;
    private ctx;
    private frogPlayers;
    private fpsIndicator;
    private timeFpsIndicatorLastUpdated;
    constructor(self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>);
    update(dt: number): void;
    addPlayer(playerarg: Player, lobbyPlayers: Array<Player>): void;
    dropPlayer(player: Player, lobbyPlayers: Array<Player>): void;
    render(): void;
}
