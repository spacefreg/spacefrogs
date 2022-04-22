import Player from '../public/core/player.js';
export default class Lobby {
    isActive: boolean;
    campaignName: string;
    lobbyPlayers: Array<Player>;
    lobbyHostID: string;
    readyToStartCampaign: boolean;
    constructor();
    activate(hostID: string, hostName: string, campaignName: string): void;
    addPlayerToLobby(id: string, name: string): Player;
    dropPlayerFromLobby(id: string): void;
    deactivate(): void;
}
