import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
export default class SocialPanel extends sfuiPanel {
    constructor(origin, title) {
        super(origin, title);
        this.frogPlayers = new Array();
        this.setSize(new vec2(210, 500));
        this.setBackgroundColor('#74a653');
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
}
