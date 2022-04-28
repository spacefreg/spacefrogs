export default class GameClock {
    private isPaused: boolean = false;
    private gameDate: number;
    constructor() {
        this.gameDate = 0;
    }

    public update(dt: number): void {
        this.gameDate++;
        console.log(`game date: ${this.gameDate}`);
    }

    public togglePause(): void {
        this.isPaused = !this.isPaused;
    }
}