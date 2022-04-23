import Player from '../../player.js';
import sfMessage from '../sfmessage.js';
export default class sfStartCampaign extends sfMessage {
    campaignName: string;
    playerList: Array<Player>;
    constructor(campaignName: string, players: Array<Player>);
}
