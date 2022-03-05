export default class WorldTimer {
    private static isPaused: boolean;
    private static currentTime: number;

    static start(): void {
        this.isPaused = false;
        this.currentTime = 0;
    }

    static update(dt: number): void {
        this.registerDeltaTime(dt);

    }

    static togglePause(): void {
        this.isPaused = !this.isPaused;
    }

    private static registerDeltaTime(dt: number): void {
        if (!this.isPaused) {
            this.currentTime += dt;
        }
    }

    static getCurrentTime(): number {
        return this.currentTime;
    }
    
}