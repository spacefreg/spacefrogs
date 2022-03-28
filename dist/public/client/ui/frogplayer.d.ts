export default class FrogPlayer {
    private name;
    private playerNumber;
    private frog;
    private isHost;
    constructor(name: string, playerNumber: number);
    setHost(): void;
    removeHost(): void;
    getName(): string;
    getPlayerNumber(): number;
    render(ctx: CanvasRenderingContext2D): void;
}
