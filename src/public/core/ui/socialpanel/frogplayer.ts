import vec2 from '../../math/vec2.js';
import sfuiElement from '../sfuielement.js';


export default class FrogPlayer {
    private name: string;
    private fPlayerNumber: number;
    private frog: sfuiElement;
    private panelOrigin: vec2;
    private origin: vec2;

    private readyToPlayButton: sfuiElement;
    private readyIndicator: sfuiElement;

    private isHost: boolean = false;
    private isPlayer: boolean = false;

    constructor(name: string, playerNumber: number, panelOrigin: vec2, isPlayer: boolean) {
        this.name = name;
        console.log(`${name}: isPlayer: ${isPlayer}`);
        this.isPlayer = isPlayer;
        this.fPlayerNumber = playerNumber;
        this.origin = new vec2(0, 0);
        this.panelOrigin = panelOrigin;
        this.frog = new sfuiElement(this.origin, this.name);
        this.frog.setImage('../../res/images/frogs/spaceapu-lobby.png');
        this.frog.setText(this.name);
        this.frog.enableTitle();
        this.readyToPlayButton = new sfuiElement(this.origin, 'Ready to Play');


        this.setFrogPlayerNumber(playerNumber);

        const indicatorOrigin: vec2 = new vec2(this.origin.x + 68, this.origin.y);
        this.readyIndicator = new sfuiElement(indicatorOrigin, 'Ready Indicator');
        this.readyIndicator.setImage('../../res/images/ui/frogplayernotready.png');
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
        console.log(`calling setFrogPlayerNumber`);
        this.fPlayerNumber = num;
        this.origin = new vec2(5, (this.fPlayerNumber * 45) - 30);
        this.origin.x += this.panelOrigin.x;
        this.origin.y += this.panelOrigin.y;
        this.frog.setOrigin(this.origin);

        const buttonPos: vec2 = new vec2(this.origin.x + 100, this.origin.y);
        const titleOrigin: vec2 = new vec2(buttonPos.x + 14, buttonPos.y + 17);

        this.readyToPlayButton.setAsButton();
        this.readyToPlayButton.setSize(new vec2(100, 30));

        this.readyToPlayButton.setOrigin(buttonPos);
        this.readyToPlayButton.setTitleOrigin(titleOrigin);
        this.readyToPlayButton.setBackgroundColor('#ffffff');
        this.readyToPlayButton.setBackgroundOpacity(0.13);

    }

    public mouseMove(mousePos: vec2): void {
        this.frog.mouseMove(mousePos);
        this.readyToPlayButton.mouseMove(mousePos);
    }

    public mouseDown(mousePos: vec2): void {
        if (this.isPlayer) {
            this.frog.mouseDown(mousePos);
            this.readyToPlayButton.mouseDown(mousePos);
        }


        if (this.readyToPlayButton.isActive()) {
            this.readyIndicator.setImage('../../res/images/ui/frogplayerready.png');
        }
        else {
            this.readyIndicator.setImage('../../res/images/ui/frogplayernotready.png');
        }
    }

    public render(): void {
        this.frog.render();
        this.readyIndicator.render();
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
    return new FrogPlayer('gremlin', 0, new vec2(0, 0), false);
}