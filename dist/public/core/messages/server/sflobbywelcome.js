import sfMessage from '../sfmessage.js';
export default class sfLobbyWelcome extends sfMessage {
    constructor(campaignName, host, players) {
        super('server', Date.now());
        this.campaignName = campaignName;
        this.playerHost = host;
        this.playerList = players;
    }
}
