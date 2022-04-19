import vec2 from '../../math/vec2.js';
import sfuiElement from '../sfuielement.js';
import sfuiPanel from '../sfuipanel.js';
export default class FrogPanel extends sfuiPanel {
    constructor(origin, playerName) {
        super(origin, playerName);
        this.setSize(new vec2(275, 287));
        this.setBackgroundOpacity(0);
        this.frogPortrait = new sfuiElement(new vec2(this.origin.x + 15, this.origin.y + 10), '');
        this.frogPortrait.setImage('res/images/frogs/portrait.png');
        this.frogName = new sfuiElement(new vec2(this.origin.x + this.size.x / 2, this.origin.y + 3), '');
        this.frogName.setText('commodore ' + playerName);
        this.frogName.setOrigin(new vec2(this.frogName.getOrigin().x - this.frogName.getTextWidth() / 2, this.frogName.getOrigin().y));
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
