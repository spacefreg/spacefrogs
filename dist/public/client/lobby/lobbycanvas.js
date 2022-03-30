import FrogPlayer, { getFrogPlayerByNumber } from '../ui/frogplayer.js';
export default class LobbyCanvas {
    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self, host, campaignName, lobbyPlayers) {
        this.canvas = document.getElementById('sf-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.frogPlayers = new Array();
        for (let i = 0; i < lobbyPlayers.length; i++) {
            this.addPlayer(lobbyPlayers[i]);
        }
        console.log(`LOBBYCANVAS: frog players length: ${this.frogPlayers.length}`);
        console.log(`LOBBYCANVAS: lobby players length: ${lobbyPlayers.length}`);
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();
    }
    update(dt) {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
        //console.log(`frogplayers length: ${this.frogPlayers.length}`);
    }
    addPlayer(playerarg) {
        console.log(`inside lobbyCanvas.addPlayer: adding player: ${playerarg.name}`);
        const newfrog = playerarg;
        this.frogPlayers.push(new FrogPlayer(newfrog.name, newfrog.playerNumber));
    }
    dropPlayer(player) {
        const droppedFrog = getFrogPlayerByNumber(player.playerNumber, this.frogPlayers);
        if (droppedFrog) {
            this.frogPlayers.splice(this.frogPlayers.indexOf(droppedFrog), 1);
            console.log(`dropped player: ${droppedFrog.getName(), droppedFrog.getPlayerNumber()}`);
        }
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].render(this.ctx);
        }
        this.ctx.fillText(this.fpsIndicator, 10, 20);
    }
}
