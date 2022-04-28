import * as socketIO from 'socket.io';

import sfStartCampaign from '../../public/core/messages/server/sfstartcampaign.js';

import Player from '../../public/core/player.js';
import GameClock from './gameclock.js';

export default class GameSession {
    private io: socketIO.Server;
    private campaignName: string = '';
    private gamePlayers: Array<Player> = [];

    private isRunning: boolean = false;

    private gClock: GameClock;

    constructor(io: socketIO.Server) {
        this.io = io;
        this.gClock = new GameClock();
        console.log(`SERVER: gamesession constructor`);
    }

    public start(campaignInfo: sfStartCampaign): void {
        this.campaignName = campaignInfo.campaignName;
        this.gamePlayers = campaignInfo.playerList;
        console.log(`SERVER: game session start`);
        this.isRunning = true;

        this.loop();
    }
    
    public end(): void {
        console.log(`SERVER: game session end`);
        this.isRunning = false;
    }

    private loop(): void {
        const interval = setInterval(() => {
            if (!this.isRunning) {
                console.log(`stopping game`);
                clearInterval(interval);
            }
            else {
                this.gClock.update(100);
            }
        }, 100);
    }

}