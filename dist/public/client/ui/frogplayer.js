import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class FrogPlayer {
    constructor(name, playerNumber) {
        this.isHost = false;
        this.name = name;
        this.playerNumber = playerNumber;
        const origin = new vec2(30, (playerNumber * 100) + 30);
        this.frog = new sfuiElement(origin, this.name, new Image(), '../../res/spaceapu.png');
    }
    setHost() {
        this.isHost = true;
    }
    removeHost() {
        this.isHost = false;
    }
    render(ctx) {
        this.frog.render(ctx, this.frog.getOrigin().x, this.frog.getOrigin().y);
    }
}
