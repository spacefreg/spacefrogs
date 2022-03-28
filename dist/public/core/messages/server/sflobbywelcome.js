import sfMessage from '../sfmessage.js';
export default class sfLobbyWelcome extends sfMessage {
    constructor(campaignName, hostID, players) {
        super('server', 'sfServer', Date.now());
        this.campaignName = campaignName;
        this.playerHostID = hostID;
        this.playerList = players;
    }
}
