import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class FrogPlayer {
    constructor(name, playerNumber) {
        this.isHost = false;
        this.name = name;
        this.fPlayerNumber = playerNumber;
        this.origin = new vec2(30, (this.fPlayerNumber * 100) + 30);
        this.frog = new sfuiElement(this.origin, this.name, new Image(), '../../res/spaceapu.png');
        this.setPlayerNumber(playerNumber);
    }
    setHost() {
        this.isHost = true;
    }
    removeHost() {
        this.isHost = false;
    }
    getName() {
        const n = this.name;
        return n;
    }
    getPlayerNumber() {
        const n = this.fPlayerNumber;
        return n;
    }
    setPlayerNumber(num) {
        this.fPlayerNumber = num;
        this.origin = new vec2(30, (this.fPlayerNumber * 100) + 30);
        this.frog.setOrigin(this.origin);
        this.frog.setText(this.name + ': ' + this.fPlayerNumber);
    }
    render(ctx) {
        this.frog.render(ctx);
    }
}
export function getFrogPlayerByNumber(num, players) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].getPlayerNumber() == num) {
            return players[i];
        }
    }
    //(3/27/22) gremlin is the 'player not found' player
    return new FrogPlayer('gremlin', 0);
}
