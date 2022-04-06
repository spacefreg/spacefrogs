import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';


export default class FrogPlayer {
    private name: string;
    private fPlayerNumber: number;
    private frog: sfuiElement;
    private origin: vec2;

    private readyToPlayButton: sfuiElement;

    private isHost: boolean = false;

    constructor(name: string, playerNumber: number) {
        this.name = name;
        this.fPlayerNumber = playerNumber
        this.origin = new vec2(0, 0);
        this.frog = new sfuiElement(this.origin, this.name);
        this.frog.setImage('../../res/images/frogs/spaceapu-lobby.png');
        this.frog.setText(this.name);
        this.frog.enableTitle();
        this.readyToPlayButton = new sfuiElement(this.origin, 'Ready to Play');

        this.setFrogPlayerNumber(playerNumber);

    }

    public setHost(): void {
        this.isHost = true;
        this.frog.setText(this.frog.getText() + ' (host)');
    }

    public getHost(): boolean {
        return this.isHost;
    }

    public getName(): string {
        const n = this.name
        return n;
    }

    public getfPlayerNumber(): number {
        const n = this.fPlayerNumber;
        return n;
    }

    public setFrogPlayerNumber(num: number): void {

        this.fPlayerNumber = num;
        this.origin = new vec2(5, (this.fPlayerNumber * 45) - 30);
        this.frog.setOrigin(this.origin);

        const buttonPos: vec2 = new vec2(this.origin.x + 100, this.origin.y);
        this.readyToPlayButton.setOrigin(buttonPos);
        
    }

    public render(): void {
        this.frog.render();
        this.readyToPlayButton.render();
    }
}

export function getFrogPlayerByNumber(num: number, players: Array<FrogPlayer>): FrogPlayer {
    for (let i = 0; i < players.length; i++) {
        if (players[i].getfPlayerNumber() == num) {
            return players[i];
        }
    }
    //(3/27/22) gremlin is the 'player not found' player
    return new FrogPlayer('gremlin', 0);
}