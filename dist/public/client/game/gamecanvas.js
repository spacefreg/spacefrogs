import vec2 from '../../core/utils/vec2.js';
import SocialPanel from '../../core/ui/socialpanel/socialpanel.js';
import GameWindow from '../../core/ui/gamewindow.js';
import { getPlayerByID } from '../../core/player.js';
import FrogPanel from '../../core/ui/frogpanel/frogpanel.js';
export default class GameCanvas {
    constructor(campaignName, players, socket) {
        this.selfID = 'gremlin';
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.socket = socket;
        const selfPlayer = getPlayerByID(this.socket.id, players);
        this.selfID = this.socket.id;
        this.gameWindow = new GameWindow(new vec2(230, 10), new vec2(800, 748));
        this.gameWindow.setInGame();
        this.socialPanel = new SocialPanel(new vec2(10, 10), 'social panel', this.socket.id, this.socket);
        this.socialPanel.setInGame();
        this.frogPanel = new FrogPanel(new vec2(1, 480), selfPlayer.name);
        this.addPlayer(selfPlayer, players);
        //this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
        document.onkeydown = this.keyDown.bind(this);
    }
    addPlayer(p, players) {
        this.socialPanel.frogPlayerChanged(p, players);
    }
    dropPlayer(player, lobbyPlayers) {
        console.log(`dropped player: ${player.name}`);
        this.socialPanel.frogPlayerChanged(player, lobbyPlayers);
    }
    mouseMove(evt) {
        //(4/15/22) todo: add mouse move callback to all the panels and game window
        const pos = new vec2(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
        this.socialPanel.mouseMove(pos);
        this.frogPanel.mouseMove(pos);
        //this.gamePanel.mouseMove(pos);
        this.gameWindow.mouseMove(pos);
    }
    keyDown(evt) {
        switch (evt.code) {
            case 'Space':
                if (this.socialPanel.getHost().getID() == this.selfID) {
                    this.socket.emit('sfcTogglePause');
                }
                break;
        }
    }
    goTomorrow(date) {
        this.gameWindow.goTomorrow(date);
    }
    update(dt) {
        this.gameWindow.update(dt);
        this.socialPanel.update(dt);
        this.frogPanel.update(dt);
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';
        this.socialPanel.render();
        this.gameWindow.render();
        this.frogPanel.render();
    }
}
