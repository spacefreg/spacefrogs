import vec2 from '../../utils/vec2.js';
import LobbyCountrySelection from '../lobbycountryselection.js';
import sfuiPanel from '../sfuipanel.js';
export default class LobbyPanel extends sfuiPanel {
    constructor(origin, title) {
        super(origin, title);
        this.setSize(new vec2(315, 748));
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
        this.lobbyPrompt = new LobbyCountrySelection(new vec2(this.origin.x + 10, this.origin.y + 275), 'Select Country');
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
        this.lobbyPrompt.render();
    }
    mouseMove(mousePos) {
        super.mouseMove(mousePos);
        this.lobbyPrompt.mouseMove(mousePos);
    }
    mouseDown(mousePos) {
        return this.lobbyPrompt.mouseDown(mousePos);
    }
    gameWindowSelection(selection) {
        switch (selection) {
            case 'Earth':
                console.log('gamePanel: selected urf');
                break;
        }
    }
}
