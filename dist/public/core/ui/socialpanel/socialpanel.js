import vec2 from '../../utils/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import FrogPlayer, { getFrogPlayerByID } from './frogplayer.js';
export default class SocialPanel extends sfuiPanel {
    constructor(origin, title, selfID, socket) {
        super(origin, title);
        this.inGame = false;
        this.socket = socket;
        this.selfID = selfID;
        this.frogPlayers = new Array();
        this.setSize(new vec2(210, 458));
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
        this.socket.on('sfPlayerReady', (id) => {
            const p = getFrogPlayerByID(id, this.frogPlayers);
            p.readyPlayer();
        });
        this.socket.on('sfPlayerNotReady', (id) => {
            const p = getFrogPlayerByID(id, this.frogPlayers);
            p.unreadyPlayer();
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
            if (this.inGame) {
                this.frogPlayers[this.frogPlayers.length - 1].disableLobbyButton();
            }
            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }
    }
    mouseMove(mousePos) {
        super.mouseMove(mousePos);
        const self = getFrogPlayerByID(this.selfID, this.frogPlayers);
        self.mouseMove(mousePos);
    }
    mouseDown(mousePos) {
        super.mouseDown(mousePos);
        const self = getFrogPlayerByID(this.selfID, this.frogPlayers);
        if (self.getCountry() != '') {
            self.mouseDown(mousePos);
        }
    }
    setFrogPlayerCountry(name, country) {
        for (let i = 0; i < this.frogPlayers.length; i++) {
            if (this.frogPlayers[i].getName() == name) {
                this.frogPlayers[i].setCountry(country);
            }
        }
    }
    getHost() {
        return this.frogPlayers[0];
    }
    hide() {
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].hide();
        }
    }
    show() {
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].show();
        }
    }
    setInGame() {
        this.inGame = true;
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
