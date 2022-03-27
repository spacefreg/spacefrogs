import Player from '../public/core/player.js';
export default class Lobby {
    isActive: boolean;
    campaignName: string;
    lobbyPlayers: Array<Player>;
    lobbyHost: Player | null;
    constructor(host: Player, campaignName: string);
    deactivate(): void;
}
