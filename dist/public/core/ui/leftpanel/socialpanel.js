import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import FrogPlayer from './frogplayer.js';
export default class SocialPanel extends sfuiPanel {
    constructor(origin, title) {
        super(origin, title);
        this.frogPlayers = new Array();
        this.setSize(new vec2(210, 500));
        this.setBackgroundColor('#74a653');
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
    }
    frogPlayerChanged(players) {
        //(4/13/22) just delete the existing array and repopulate with the newest players
        this.frogPlayers.length = 0;
        for (let i = 0; i < players.length; i++) {
            this.frogPlayers.push(new FrogPlayer(players[i].name, players[i].playerNumber, this.origin));
            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].render();
        }
    }
}
