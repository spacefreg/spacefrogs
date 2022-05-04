import GameClock from './gameclock.js';
export default class GameSession {
    constructor(io) {
        this.campaignName = '';
        this.gamePlayers = [];
        this.isRunning = false;
        this.io = io;
        this.gClock = new GameClock();
        this.currentDate = 0;
    }
    start(campaignInfo) {
        this.campaignName = campaignInfo.campaignName;
        this.gamePlayers = campaignInfo.playerList;
        console.log(`SERVER: game session start`);
        this.isRunning = true;
        this.loop();
    }
    togglePause() {
        this.gClock.togglePause();
    }
    end() {
        console.log(`SERVER: game session end`);
        this.isRunning = false;
    }
    loop() {
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
