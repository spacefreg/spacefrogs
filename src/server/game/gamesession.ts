import * as socketIO from 'socket.io';
import sfDate, { dateEquals, dateToString, setDate } from '../../public/core/utils/sfdate.js';

import sfStartCampaign from '../../public/core/messages/server/sfstartcampaign.js';
import sfGoTomorrow from '../../public/core/messages/server/sfgotomorrow.js';

import Player from '../../public/core/player.js';
import GameClock from './gameclock.js';
import GameTiles from './sim/gametiles.js';

export default class GameSession {
    private io: socketIO.Server;
    private campaignName: string = '';
    private gamePlayers: Array<Player> = [];

    private isRunning: boolean = false;

    private gClock: GameClock;
    private currentDate: sfDate;

    private gameTiles: GameTiles;

    constructor(io: socketIO.Server) {
        this.io = io;
        this.gClock = new GameClock();
        this.currentDate = new sfDate(2030, 1, 1);

        this.gameTiles = new GameTiles();
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
                
                if (!dateEquals(this.currentDate, this.gClock.getDate())) {
                    let y = this.gClock.getDate().year;
                    let m = this.gClock.getDate().month;
                    let d = this.gClock.getDate().day;
                    this.currentDate = setDate(this.currentDate, y, m, d);
                    console.log(`current date: ${dateToString(this.currentDate)}`);

                    //let gameTileInfo = new GameTileInfo();
                    //gameTileInfo.populate(this.gameTiles.mercuryTiles, this.gameTiles.venusTiles, this.gameTiles.earthTiles, this.gameTiles.moonTiles, this.gameTiles.marsTiles);

                    let goTomorrowMsg = new sfGoTomorrow(this.currentDate);
                    goTomorrowMsg.populate(this.gameTiles.mercuryTiles, this.gameTiles.venusTiles, this.gameTiles.earthTiles, this.gameTiles.moonTiles, this.gameTiles.marsTiles);
                    this.io.emit('sfGoTomorrow', goTomorrowMsg);
                }
                //(5/4/22) if the game is running and enough time has passed, emit a message to advance one day
                
            }
        }, 100);
    }

    

}