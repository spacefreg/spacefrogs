import * as socketIO from 'socket.io';
import sfStartCampaign from '../../public/core/messages/server/sfstartcampaign.js';
export default class GameSession {
    private io;
    private campaignName;
    private gamePlayers;
    private isRunning;
    private gClock;
    constructor(io: socketIO.Server);
    start(campaignInfo: sfStartCampaign): void;
    end(): void;
    private loop;
}
