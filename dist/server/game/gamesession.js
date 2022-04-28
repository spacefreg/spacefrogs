import GameClock from './gameclock.js';
export default class GameSession {
    constructor(io) {
        this.campaignName = '';
        this.gamePlayers = [];
        this.isRunning = false;
        this.io = io;
        this.gClock = new GameClock();
        console.log(`SERVER: gamesession constructor`);
    }
    start(campaignInfo) {
        this.campaignName = campaignInfo.campaignName;
        this.gamePlayers = campaignInfo.playerList;
        console.log(`SERVER: game session start`);
        this.isRunning = true;
        this.loop();
    }
    end() {
        console.log(`SERVER: game session end`);
        this.isRunning = false;
    }
    loop() {
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
