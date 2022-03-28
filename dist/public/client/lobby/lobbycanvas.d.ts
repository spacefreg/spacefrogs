import Player from '../../core/player.js';
export default class LobbyCanvas {
    private canvas;
    private ctx;
    private frogplayers;
    private fpsIndicator;
    private timeFpsIndicatorLastUpdated;
    constructor(self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>);
    update(dt: number): void;
    render(): void;
    addPlayer(player: Player): void;
}
