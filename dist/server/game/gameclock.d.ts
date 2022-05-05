import sfDate from '../../public/core/math/sfdate.js';
export default class GameClock {
    private isPaused;
    private gameDate;
    private timeSinceLastDateAdvance;
    constructor();
    update(dt: number): void;
    togglePause(): void;
    getDate(): sfDate;
}
