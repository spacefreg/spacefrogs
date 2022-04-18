import vec2 from '../../math/vec2.js';
import sfuiElement from '../sfuielement.js';
export default class FrogPlayer {
    constructor(name, playerNumber, panelOrigin) {
        this.isHost = false;
        this.name = name;
        this.fPlayerNumber = playerNumber;
        this.origin = new vec2(0, 0);
        this.panelOrigin = panelOrigin;
        this.frog = new sfuiElement(this.origin, this.name);
        this.frog.setImage('../../res/images/frogs/spaceapu-lobby.png');
        this.frog.setText(this.name);
        this.frog.enableTitle();
        this.readyToPlayButton = new sfuiElement(this.origin, 'Ready to Play');
        this.setFrogPlayerNumber(playerNumber);
    }
    setHost() {
        this.isHost = true;
        this.frog.setText(this.frog.getText() + ' (host)');
    }
    getHost() {
        return this.isHost;
    }
    getName() {
        const n = this.name;
        return n;
    }
    getfPlayerNumber() {
        const n = this.fPlayerNumber;
        return n;
    }
    setFrogPlayerNumber(num) {
        console.log(`calling setFrogPlayerNumber`);
        this.fPlayerNumber = num;
        this.origin = new vec2(5, (this.fPlayerNumber * 45) - 30);
        this.origin.x += this.panelOrigin.x;
        this.origin.y += this.panelOrigin.y;
        this.frog.setOrigin(this.origin);
        const buttonPos = new vec2(this.origin.x + 100, this.origin.y);
        const titleOrigin = new vec2(buttonPos.x + 14, buttonPos.y + 17);
        this.readyToPlayButton.setAsButton();
        this.readyToPlayButton.setSize(new vec2(100, 30));
        this.readyToPlayButton.setOrigin(buttonPos);
        this.readyToPlayButton.setTitleOrigin(titleOrigin);
        this.readyToPlayButton.setBackgroundColor('#ffffff');
        this.readyToPlayButton.setBackgroundOpacity(0.13);
    }
    mouseMove(mousePos) {
        this.frog.mouseMove(mousePos);
        this.readyToPlayButton.mouseMove(mousePos);
    }
    mouseDown(mousePos) {
        this.frog.mouseDown(mousePos);
        this.readyToPlayButton.mouseDown(mousePos);
    }
    render() {
        this.frog.render();
        this.readyToPlayButton.render();
    }
}
export function getFrogPlayerByNumber(num, players) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].getfPlayerNumber() == num) {
            return players[i];
        }
    }
    //(3/27/22) gremlin is the 'player not found' player
    return new FrogPlayer('gremlin', 0, new vec2(0, 0));
}
