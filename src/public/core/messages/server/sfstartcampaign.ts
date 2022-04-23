import Player from '../../player.js';
import sfMessage from '../sfmessage.js';

export default class sfStartCampaign extends sfMessage {
    public campaignName: string;
    public playerList: Array<Player>;
    constructor(campaignName: string, players: Array<Player>) {
        super('server', 'sfServer', Date.now());
        this.campaignName = campaignName;
        this.playerList = players;
    }
}