export default class WorldTimer {
    static start() {
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
}
