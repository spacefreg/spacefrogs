export default class GameClock {
    constructor() {
        this.isPaused = false;
        this.gameDate = 0;
        this.timeSinceLastDateAdvance = 0;
    }
    update(dt) {
        if (!this.isPaused) {
            this.timeSinceLastDateAdvance += dt;
            if (this.timeSinceLastDateAdvance > 500) {
                this.timeSinceLastDateAdvance = 0;
                this.gameDate++;
                console.log(`game date: ${this.gameDate}`);
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
