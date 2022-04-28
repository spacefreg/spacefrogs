export default class GameClock {
    constructor() {
        this.isPaused = false;
        this.gameDate = 0;
    }
    update(dt) {
        this.gameDate++;
        console.log(`game date: ${this.gameDate}`);
    }
}
