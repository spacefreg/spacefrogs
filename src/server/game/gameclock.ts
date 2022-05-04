export default class GameClock {
    private isPaused: boolean = false;
    private gameDate: number;

    private timeSinceLastDateAdvance: number;

    constructor() {
        this.gameDate = 0;
        this.timeSinceLastDateAdvance = 0;
    }

    public update(dt: number): void {

        if (!this.isPaused) {
            this.timeSinceLastDateAdvance += dt;
            if (this.timeSinceLastDateAdvance > 500) {
                this.timeSinceLastDateAdvance = 0;
                this.gameDate++;
                console.log(`game date: ${this.gameDate}`);
            }
        }
    }

    public togglePause(): void {
        this.isPaused = !this.isPaused;
    }

    public getDate(): number {
        return this.gameDate;
    }
}