export default class WorldTimer {
    static worldDaysSinceStart: number;
    private static timeOfClockStart;
    private static isPaused;
    private static lastPauseTime;
    private static currentTime;
    private static totalSimTime;
    private static elapsedTime;
    static start(): void;
    static update(dt: number): void;
    static togglePause(): void;
    private static registerDeltaTime;
    static getCurrentTime(): number;
    static getElapsedSeconds(): number;
    static getElapsedMilliseconds(): number;
}
