import sfDate, { addOneDay, dateToString } from '../../public/core/math/sfdate.js';

export default class GameClock {
    private isPaused: boolean = true;
    private gameDate: sfDate;

    private timeSinceLastDateAdvance: number;

    constructor() {
        this.gameDate = new sfDate(2030, 1, 1);
        this.timeSinceLastDateAdvance = 0;
    }

    public update(dt: number): void {

        if (!this.isPaused) {
            this.timeSinceLastDateAdvance += dt;
            if (this.timeSinceLastDateAdvance > 100) {
                this.timeSinceLastDateAdvance = 0;
                this.gameDate = addOneDay(this.gameDate);
            }
        }
    }

    public togglePause(): void {
        this.isPaused = !this.isPaused;
    }

    public getDate(): sfDate {
        return this.gameDate;
    }
}