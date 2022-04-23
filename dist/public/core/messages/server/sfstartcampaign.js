import sfMessage from '../sfmessage.js';
export default class sfStartCampaign extends sfMessage {
    constructor(campaignName, players) {
        super('server', 'sfServer', Date.now());
        this.campaignName = campaignName;
        this.playerList = players;
    }
}
