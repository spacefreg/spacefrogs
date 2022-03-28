import Player from '../public/core/player.js';
export default class Lobby {
    isActive: boolean;
    campaignName: string;
    lobbyPlayers: Array<Player>;
    lobbyHostID: string;
    constructor();
    activate(hostID: string, hostName: string, campaignName: string): void;
    deactivate(): void;
}
