import vec2 from '../../core/math/vec2.js';
import FrogPlayer from '../../core/ui/leftpanel/frogplayer.js';
import GameWindow from '../../core/ui/gamewindow.js';
import LeftPanel from '../../core/ui/leftpanel/leftpanel.js';
import FrogPanel from '../../core/ui/frogpanel/frogpanel.js';
import RightPanel from '../../core/ui/rightpanel/rightpanel.js';
export default class LobbyCanvas {
    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self, host, campaignName, lobbyPlayers) {
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.frogPlayers = new Array();
        this.addPlayer(self, lobbyPlayers);
        this.gameWindow = new GameWindow(new vec2(230, 10), new vec2(800, 748));
        //(4/12/22) sfuiPanel initialization
        this.panels = new Array();
        const leftPanel = new LeftPanel(new vec2(10, 10), 'left panel');
        this.panels.push(leftPanel);
        const frogPanel = new FrogPanel(new vec2(1, 480), 'frog panel');
        this.panels.push(frogPanel);
        const rightPanel = new RightPanel(new vec2(1040, 10), 'right panel');
        this.panels.push(rightPanel);
        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();
    }
    update(dt) {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
        this.gameWindow.update(dt);
    }
    addPlayer(playerarg, lobbyPlayers) {
        this.frogPlayers.length = 0;
        for (let i = 0; i < lobbyPlayers.length; i++) {
            this.frogPlayers.push(new FrogPlayer(lobbyPlayers[i].name, lobbyPlayers[i].playerNumber));
            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }
    }
    dropPlayer(player, lobbyPlayers) {
        console.log(`dropped player: ${player.name}`);
        this.frogPlayers.length = 0;
        for (let i = 0; i < lobbyPlayers.length; i++) {
            this.frogPlayers.push(new FrogPlayer(lobbyPlayers[i].name, lobbyPlayers[i].playerNumber));
            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }
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
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].render();
        }
        this.gameWindow.render();
        for (let i = 0; i < this.panels.length; i++) {
            this.panels[i].render();
        }
        const fpsTextLength = this.ctx.measureText(this.fpsIndicator).width;
        this.ctx.fillText(this.fpsIndicator, this.canvas.width - fpsTextLength - 3, 10);
    }
}
