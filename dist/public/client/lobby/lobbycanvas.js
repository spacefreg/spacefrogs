import FrogPlayer from '../ui/frogplayer.js';
export default class LobbyCanvas {
    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self, host, campaignName, lobbyPlayers) {
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.frogplayers = new Array();
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();
    }
    update(dt) {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';
        for (let i = 0; i < this.frogplayers.length; i++) {
            console.log('calling render in lobbycanvas');
            this.frogplayers[i].render(this.ctx);
        }
        this.ctx.fillText(this.fpsIndicator, 10, 20);
    }
    addPlayer(player) {
        console.log('adding player to lobbycanvas');
        this.frogplayers.push(new FrogPlayer(player.name, 1));
    }
}
