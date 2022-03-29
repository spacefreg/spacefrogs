import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';


export default class FrogPlayer {
    private name: string;
    private fPlayerNumber: number;
    private frog: sfuiElement;
    private origin: vec2;

    private isHost: boolean = false;

    constructor(name: string, playerNumber: number) {
        this.name = name;
        this.fPlayerNumber = playerNumber
        this.origin = new vec2(30, (this.fPlayerNumber * 100) + 30);
        this.frog = new sfuiElement(this.origin, this.name, new Image(), '../../res/spaceapu.png');
        this.setPlayerNumber(playerNumber);
    }

    public setHost(): void {
        this.isHost = true;
    }

    public removeHost(): void {
        this.isHost = false;
    }

    public getName(): string {
        const n = this.name
        return n;
    }

    public getPlayerNumber(): number {
        const n = this.fPlayerNumber;
        return n;
    }

    public setPlayerNumber(num: number): void {
        this.fPlayerNumber = num;
        this.origin = new vec2(30, (this.fPlayerNumber * 100) + 30);
        this.frog.setOrigin(this.origin);
        this.frog.setText(this.name + ': ' + this.fPlayerNumber);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.frog.render(ctx);
    }
}

export function getFrogPlayerByNumber(num: number, players: Array<FrogPlayer>): FrogPlayer {
    for (let i = 0; i < players.length; i++) {
        if (players[i].getPlayerNumber() == num) {
            return players[i];
        }
    }
    //(3/27/22) gremlin is the 'player not found' player
    return new FrogPlayer('gremlin', 0);
}