export default class WorldTimer {
    static start() {
        this.timeOfClockStart = new Date();
        this.isPaused = false;
        this.currentTime = 0;
    }
    static update(dt) {
        this.registerDeltaTime(dt);
    }
    static togglePause() {
        this.isPaused = !this.isPaused;
    }
    static registerDeltaTime(dt) {
        if (!this.isPaused) {
            this.currentTime += dt;
        }
    }
    static getCurrentTime() {
        return this.currentTime;
    }
    static getElapsedSeconds() {
        return Math.floor((Date.now() - this.timeOfClockStart.getTime()) / 1000);
    }
    static getElapsedMilliseconds() {
        return Date.now() - this.timeOfClockStart.getTime();
    }
}
