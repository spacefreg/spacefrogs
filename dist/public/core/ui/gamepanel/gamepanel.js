import vec2 from '../../math/vec2.js';
import LobbyCountrySelection from '../lobbycountryselection.js';
import sfuiPanel from '../sfuipanel.js';
export default class GamePanel extends sfuiPanel {
    constructor(origin, title) {
        super(origin, title);
        this.setSize(new vec2(315, 748));
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
        this.countrySelect = new LobbyCountrySelection(new vec2(this.origin.x + 10, this.origin.y + 100), 'Select Country');
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
        this.countrySelect.render();
    }
    gameWindowSelection(selection) {
        switch (selection) {
            case 'Earth':
                console.log('gamePanel: selected urf');
                break;
        }
    }
}
