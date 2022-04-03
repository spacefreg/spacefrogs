import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class FrogPlayer {
    constructor(name, playerNumber) {
        this.isHost = false;
        this.name = name;
        this.fPlayerNumber = playerNumber;
        this.origin = new vec2(0, 0);
        this.frog = new sfuiElement(this.origin, this.name);
        this.frog.setImage('../../res/images/frogs/spaceapu-lobby.png');
        this.frog.setText(this.name);
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
        this.fPlayerNumber = num;
        this.origin = new vec2(5, (this.fPlayerNumber * 45) - 30);
        this.frog.setOrigin(this.origin);
        const buttonPos = new vec2(this.origin.x + 100, this.origin.y);
        this.readyToPlayButton.setOrigin(buttonPos);
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
    return new FrogPlayer('gremlin', 0);
}
