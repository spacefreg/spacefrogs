import sfMessage from '../sfmessage.js';
import Player from '../../player.js';
export default class sfLobbyWelcome extends sfMessage {
    campaignName: string;
    playerList: Array<Player>;
    playerHost: Player;
    constructor(campaignName: string, host: Player, players: Array<Player>);
}
