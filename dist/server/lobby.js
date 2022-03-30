import Player from '../public/core/player.js';
export default class Lobby {
    constructor() {
        this.isActive = false;
        this.campaignName = '';
        this.lobbyHostID = '';
        this.lobbyPlayers = new Array();
    }
    activate(hostID, hostName, campaignName) {
        console.log(`server: activating lobby. hostID: ${hostID}, hostName: ${hostName}, campaignName: ${campaignName}`);
        this.isActive = true;
        this.lobbyHostID = hostID;
        this.campaignName = campaignName;
        this.lobbyPlayers.push(new Player(hostID, hostName));
        this.lobbyPlayers[0].setHost();
        console.log(`setting playernumber of ${this.lobbyPlayers[0].name} to 1`);
        this.lobbyPlayers[0].setPlayerNumber(1);
    }
    deactivate() {
        console.log('server: deactivating lobby');
        this.isActive = false;
        this.lobbyHostID = '';
        this.lobbyPlayers.length = 0;
    }
}
