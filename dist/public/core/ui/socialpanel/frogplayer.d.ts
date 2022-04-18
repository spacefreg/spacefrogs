import vec2 from '../../math/vec2.js';
export default class FrogPlayer {
    private name;
    private fPlayerNumber;
    private frog;
    private panelOrigin;
    private origin;
    private readyToPlayButton;
    private readyIndicator;
    private isHost;
    private isPlayer;
    constructor(name: string, playerNumber: number, panelOrigin: vec2, isPlayer: boolean);
    setHost(): void;
    getHost(): boolean;
    getName(): string;
    getfPlayerNumber(): number;
    setFrogPlayerNumber(num: number): void;
    mouseMove(mousePos: vec2): void;
    mouseDown(mousePos: vec2): void;
    render(): void;
}
export declare function getFrogPlayerByNumber(num: number, players: Array<FrogPlayer>): FrogPlayer;
