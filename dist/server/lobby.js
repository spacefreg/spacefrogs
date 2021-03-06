import Player from '../public/core/player.js';
export default class Lobby {
    constructor() {
        this.isActive = false;
        this.readyToStartCampaign = false;
        this.campaignName = '';
        this.lobbyHostID = '';
        this.lobbyPlayers = new Array();
    }
    activate(hostID, hostName, campaignName) {
        console.log(`lobby: activating. hostID: ${hostID}, hostName: ${hostName}, campaignName: ${campaignName}`);
        this.isActive = true;
        this.lobbyHostID = hostID;
        this.campaignName = campaignName;
        this.lobbyPlayers.push(new Player(hostID, hostName));
        this.lobbyPlayers[0].setHost();
        this.lobbyPlayers[0].setPlayerNumber(1);
    }
    addPlayerToLobby(id, name) {
        console.log(`lobby: adding player to lobby. id: ${id}, name: ${name}`);
        this.lobbyPlayers.push(new Player(id, name));
        const newIndex = this.lobbyPlayers.length - 1;
        this.lobbyPlayers[newIndex].setPlayerNumber(this.lobbyPlayers.length);
        return this.lobbyPlayers[newIndex];
    }
    dropPlayerFromLobby(id) {
        console.log(`lobby: dropping player from lobby. id: ${id}`);
        for (let i = 0; i < this.lobbyPlayers.length; i++) {
            if (this.lobbyPlayers[i].id === id) {
                this.lobbyPlayers.splice(i, 1);
                break;
            }
        }
    }
    deactivate() {
        console.log('lobby: deactivating');
        this.isActive = false;
        this.lobbyHostID = '';
        this.lobbyPlayers.length = 0;
    }
}
