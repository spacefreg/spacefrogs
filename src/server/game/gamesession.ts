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
    private currentDate: number;

    constructor(io: socketIO.Server) {
        this.io = io;
        this.gClock = new GameClock();
        this.currentDate = 0;
    }

    public start(campaignInfo: sfStartCampaign): void {
        this.campaignName = campaignInfo.campaignName;
        this.gamePlayers = campaignInfo.playerList;
        console.log(`SERVER: game session start`);
        this.isRunning = true;

        this.loop();
    }

    public togglePause(): void {
        this.gClock.togglePause();
    }
    
    public end(): void {
        console.log(`SERVER: game session end`);
        this.isRunning = false;
    }

    private loop(): void {
        const interval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(interval);
            }
            else {
                this.gClock.update(100);
                
                if (this.currentDate != this.gClock.getDate()) {
                    this.currentDate = this.gClock.getDate();
                    this.io.emit('sfNewDate', this.currentDate);
                }
                //(5/4/22) if the game is running and enough time has passed, emit a message to advance one day
                
            }
        }, 100);
    }

    

}