export default class FrogPlayer {
    private name;
    private playerNumber;
    private frog;
    private origin;
    private isHost;
    constructor(name: string, playerNumber: number);
    setHost(): void;
    removeHost(): void;
    getName(): string;
    getPlayerNumber(): number;
    setPlayerNumber(num: number): void;
    render(ctx: CanvasRenderingContext2D): void;
}
export declare function getFrogPlayerByNumber(num: number, players: Array<FrogPlayer>): FrogPlayer;
