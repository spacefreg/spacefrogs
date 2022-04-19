import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import FrogPlayer, { getFrogPlayerByID } from './frogplayer.js';
export default class SocialPanel extends sfuiPanel {
    constructor(origin, title, selfID, socket) {
        super(origin, title);
        this.socket = socket;
        this.selfID = selfID;
        this.frogPlayers = new Array();
        this.setSize(new vec2(210, 461));
        this.setBackgroundColor('#74a653');
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
        this.socket.on('sfPlayerReady', (id) => {
            const p = getFrogPlayerByID(id, this.frogPlayers);
            p.readyPlayer();
            //console.log(`${this.name}: ${id} is ready`);
        });
        this.socket.on('sfPlayerNotReady', (id) => {
            const p = getFrogPlayerByID(id, this.frogPlayers);
            p.unreadyPlayer();
            //this.unreadyPlayer();
            //console.log(`${this.name}: ${id} is not ready`);
        });
    }
    frogPlayerChanged(player, players) {
        //(4/13/22) just delete the existing array and repopulate with the newest players
        this.frogPlayers.length = 0;
        for (let i = 0; i < players.length; i++) {
            let isPlayer = false;
            if (players[i].id == this.selfID) {
                isPlayer = true;
            }
            this.frogPlayers.push(new FrogPlayer(players[i].name, players[i].id, players[i].playerNumber, this.origin, isPlayer, this.socket));
            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }
    }
    mouseMove(mousePos) {
        super.mouseMove(mousePos);
        const fp = getFrogPlayerByID(this.selfID, this.frogPlayers);
        fp.mouseMove(mousePos);
    }
    mouseDown(mousePos) {
        super.mouseDown(mousePos);
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].mouseDown(mousePos);
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
