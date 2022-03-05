export default class WorldTimer {
    private static isPaused;
    private static currentTime;
    static start(): void;
    static update(dt: number): void;
    static togglePause(): void;
    private static registerDeltaTime;
    static getCurrentTime(): number;
}
