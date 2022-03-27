import sfMessage from '../sfmessage.js';

import Player from '../../player.js';

export default class sfLobbyWelcome extends sfMessage {
    public campaignName: string;
    public playerList: Array<Player>;
    public playerHost: Player;
    constructor(campaignName: string, host: Player, players : Array<Player>) {
        super('server', Date.now());
        this.campaignName = campaignName;
        this.playerHost = host;
        this.playerList = players;
    }
}