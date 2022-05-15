import sfDate, { addOneDay } from '../../public/core/utils/sfdate.js';
export default class GameClock {
    constructor() {
        this.isPaused = true;
        this.gameDate = new sfDate(2030, 1, 1);
        this.timeSinceLastDateAdvance = 0;
    }
    update(dt) {
        if (!this.isPaused) {
            this.timeSinceLastDateAdvance += dt;
            if (this.timeSinceLastDateAdvance > 100) {
                this.timeSinceLastDateAdvance = 0;
                this.gameDate = addOneDay(this.gameDate);
            }
        }
    }
    togglePause() {
        this.isPaused = !this.isPaused;
    }
    getDate() {
        return this.gameDate;
    }
}
