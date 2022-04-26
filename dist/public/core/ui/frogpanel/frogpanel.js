import vec2 from '../../math/vec2.js';
import sfuiElement from '../sfuielement.js';
import sfuiPanel from '../sfuipanel.js';
export default class FrogPanel extends sfuiPanel {
    constructor(origin, playerName) {
        super(origin, playerName);
        this.setSize(new vec2(226, 287));
        this.setBackgroundOpacity(0);
        this.frogPortrait = new sfuiElement(new vec2(this.origin.x, this.origin.y + 11), '');
        this.frogPortrait.setImage('res/images/frogs/portrait.png');
        this.frogName = new sfuiElement(new vec2(this.origin.x + this.size.x / 2, this.origin.y + 8), '');
        this.frogName.setFontSize(24);
        this.frogName.setText('commodore ' + playerName);
        console.log(`frog name width: ${this.frogName.getTextWidth()}`);
        this.frogName.setOrigin(new vec2(this.frogName.getOrigin().x - this.frogName.getTextWidth(), this.frogName.getOrigin().y));
        this.frogName.enableTitle();
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
        this.frogPortrait.render();
        this.frogName.render();
    }
}
