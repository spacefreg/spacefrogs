export default class Lobby {
    constructor(host, campaignName) {
        this.isActive = false;
        this.isActive = true;
        this.campaignName = campaignName;
        this.lobbyHost = host;
        this.lobbyPlayers = new Array();
        this.lobbyPlayers.push(this.lobbyHost);
    }
    deactivate() {
        this.isActive = false;
        this.lobbyHost = null;
        this.lobbyPlayers.length = 0;
    }
}
