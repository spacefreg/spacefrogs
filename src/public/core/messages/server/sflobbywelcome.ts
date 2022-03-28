import sfMessage from '../sfmessage.js';

import Player from '../../player.js';

export default class sfLobbyWelcome extends sfMessage {
    public campaignName: string;
    public playerList: Array<Player>;
    public playerHostID: string;
    constructor(campaignName: string, hostID: string, players : Array<Player>) {
        super('server', 'sfServer', Date.now());
        this.campaignName = campaignName;
        this.playerHostID = hostID;
        this.playerList = players;
    }
}