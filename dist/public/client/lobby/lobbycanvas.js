import vec2 from '../../core/math/vec2.js';
import GameWindow from '../../core/ui/gamewindow.js';
import SocialPanel from '../../core/ui/leftpanel/socialpanel.js';
import FrogPanel from '../../core/ui/frogpanel/frogpanel.js';
import RightPanel from '../../core/ui/rightpanel/rightpanel.js';
export default class LobbyCanvas {
    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self, host, campaignName, lobbyPlayers) {
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameWindow = new GameWindow(new vec2(230, 10), new vec2(800, 748));
        this.socialPanel = new SocialPanel(new vec2(10, 10), 'social panel');
        this.frogPanel = new FrogPanel(new vec2(1, 480), 'frog panel');
        this.gamePanel = new RightPanel(new vec2(1040, 10), 'right panel');
        this.addPlayer(self, lobbyPlayers);
        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();
    }
    ;
    update(dt) {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
        this.gameWindow.update(dt);
    }
    addPlayer(playerarg, lobbyPlayers) {
        this.socialPanel.frogPlayerChanged(lobbyPlayers);
    }
    dropPlayer(player, lobbyPlayers) {
        console.log(`dropped player: ${player.name}`);
        this.socialPanel.frogPlayerChanged(lobbyPlayers);
    }
    mouseDown(evt) {
        if (evt.clientX >= this.canvas.offsetLeft && evt.clientX <= this.canvas.offsetLeft + this.canvas.width && evt.clientY >= this.canvas.offsetTop && evt.clientY <= this.canvas.offsetTop + this.canvas.height) {
            evt.preventDefault();
            console.log(`${evt.clientX - this.canvas.offsetLeft}, ${evt.clientY - this.canvas.offsetTop}`);
        }
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';
        this.gameWindow.render();
        this.socialPanel.render();
        this.frogPanel.render();
        this.gamePanel.render();
        const fpsTextLength = this.ctx.measureText(this.fpsIndicator).width;
        this.ctx.fillText(this.fpsIndicator, this.canvas.width - fpsTextLength - 3, 10);
    }
}
