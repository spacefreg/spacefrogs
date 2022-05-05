import sfDate, { dateEquals, dateToString, setDate } from '../../public/core/math/sfdate.js';
import GameClock from './gameclock.js';
export default class GameSession {
    constructor(io) {
        this.campaignName = '';
        this.gamePlayers = [];
        this.isRunning = false;
        this.io = io;
        this.gClock = new GameClock();
        this.currentDate = new sfDate(2030, 1, 1);
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
                if (!dateEquals(this.currentDate, this.gClock.getDate())) {
                    let y = this.gClock.getDate().year;
                    let m = this.gClock.getDate().month;
                    let d = this.gClock.getDate().day;
                    this.currentDate = setDate(this.currentDate, y, m, d);
                    console.log(`current date: ${dateToString(this.currentDate)}`);
                    this.io.emit('sfGoTomorrow', this.currentDate);
                }
                //(5/4/22) if the game is running and enough time has passed, emit a message to advance one day
            }
        }, 100);
    }
}
