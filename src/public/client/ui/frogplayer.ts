import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';


export default class FrogPlayer {
    private name: string;
    private playerNumber: number;
    private frog: sfuiElement;

    private isHost: boolean = false;

    constructor(name: string, playerNumber: number) {
        this.name = name;
        this.playerNumber = playerNumber;
        const origin = new vec2(30, (playerNumber * 100) + 30);
        this.frog = new sfuiElement(origin, this.name, new Image(), '../../res/spaceapu.png');
    }

    public setHost(): void {
        this.isHost = true;
    }

    public removeHost(): void {
        this.isHost = false;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.frog.render(ctx, this.frog.getOrigin().x, this.frog.getOrigin().y);
    }
}