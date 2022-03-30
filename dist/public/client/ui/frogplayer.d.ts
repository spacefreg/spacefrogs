export default class FrogPlayer {
    private name;
    private fPlayerNumber;
    private frog;
    private origin;
    private isHost;
    constructor(name: string, playerNumber: number);
    setHost(): void;
    removeHost(): void;
    getName(): string;
    getfPlayerNumber(): number;
    setFrogPlayerNumber(num: number): void;
    render(ctx: CanvasRenderingContext2D): void;
}
export declare function getFrogPlayerByNumber(num: number, players: Array<FrogPlayer>): FrogPlayer;
