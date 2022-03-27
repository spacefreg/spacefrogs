import Player from '../public/core/player.js'

export default class Lobby {
    public isActive: boolean = false;
    public campaignName: string;
    public lobbyPlayers: Array<Player>
    public lobbyHost: Player | null;

    constructor(host: Player, campaignName: string) {
        this.isActive = true;
        this.campaignName = campaignName;
        this.lobbyHost = host;
        this.lobbyPlayers = new Array();
        this.lobbyPlayers.push(this.lobbyHost);
    }

    public deactivate(): void {
        this.isActive = false;
        this.lobbyHost = null;
        this.lobbyPlayers.length = 0;
    }
}