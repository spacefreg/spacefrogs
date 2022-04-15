import vec2 from '../../math/vec2.js';
export default class FrogPlayer {
    private name;
    private fPlayerNumber;
    private frog;
    private panelOrigin;
    private origin;
    private readyToPlayButton;
    private isHost;
    constructor(name: string, playerNumber: number, panelOrigin: vec2);
    setHost(): void;
    getHost(): boolean;
    getName(): string;
    getfPlayerNumber(): number;
    setFrogPlayerNumber(num: number): void;
    render(): void;
}
export declare function getFrogPlayerByNumber(num: number, players: Array<FrogPlayer>): FrogPlayer;
