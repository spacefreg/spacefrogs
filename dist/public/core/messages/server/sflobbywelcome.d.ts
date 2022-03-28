import sfMessage from '../sfmessage.js';
import Player from '../../player.js';
export default class sfLobbyWelcome extends sfMessage {
    campaignName: string;
    playerList: Array<Player>;
    playerHostID: string;
    constructor(campaignName: string, hostID: string, players: Array<Player>);
}
