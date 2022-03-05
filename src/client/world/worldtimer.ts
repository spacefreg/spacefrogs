export default class WorldTimer {
    static worldDaysSinceStart: number;
    private static timeOfClockStart: Date;
    private static isPaused: boolean;
    private static lastPauseTime: Date;
    private static currentTime: number;
    private static totalSimTime: number;


    private static elapsedTime: number;

    static start(): void {
        this.timeOfClockStart = new Date();
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
    
    static getElapsedSeconds(): number {
        return Math.floor((Date.now() - this.timeOfClockStart.getTime()) / 1000);
    }
    static getElapsedMilliseconds(): number {
        return Date.now() - this.timeOfClockStart.getTime();
    }
}