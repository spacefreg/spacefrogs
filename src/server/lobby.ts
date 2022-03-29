import Player from '../public/core/player.js'

export default class Lobby {
    public isActive: boolean = false;
    public campaignName: string;
    public lobbyPlayers: Array<Player>
    public lobbyHostID: string;

    constructor() {
        this.campaignName = '';
        this.lobbyHostID = '';
        this.lobbyPlayers = new Array();

    }

    public activate(hostID: string, hostName: string, campaignName: string): void {
        console.log(`server: activating lobby. hostID: ${hostID}, hostName: ${hostName}, campaignName: ${campaignName}`);
        this.isActive = true;
        this.lobbyHostID = hostID;
        this.campaignName = campaignName;
        this.lobbyPlayers.push(new Player(hostID, hostName));
        this.lobbyPlayers[0].setHost();
        this.lobbyPlayers[0].setPlayerNumber(1);
    }
    public deactivate(): void {
        console.log('server: deactivating lobby');
        this.isActive = false;
        this.lobbyHostID = '';
        this.lobbyPlayers.length = 0;
    }
}