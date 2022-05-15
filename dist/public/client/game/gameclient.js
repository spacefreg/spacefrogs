import { getPlayerByID } from '../../core/player.js';
import GameCanvas from './gamecanvas.js';
import { dateToString } from '../../core/utils/sfdate.js';
export default class GameClient {
    constructor(socket, campaignName, gamePlayers) {
        this.isRunning = true;
        this.socket = socket;
        this.selfPlayer = getPlayerByID(socket.id, gamePlayers);
        this.campaignName = campaignName;
        this.gamePlayers = gamePlayers;
        this.gCanvas = new GameCanvas(this.campaignName, this.gamePlayers, this.socket);
        this.socket.on('sfStartCampaign', () => {
            // this.isRunning = false;
            // this.lCanvas.isRunning = false;
            // this.lCanvas.ctx.clearRect(0, 0, 1366, 768);
        });
        this.dt = 0;
        this.timeOfLastUpdate = 0;
        console.log(`game client constructor. self player: ${this.selfPlayer.name}`);
        this.loop();
        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
        this.goTomorrow();
    }
    loop() {
        if (this.isRunning) {
            this.dt = performance.now() - this.timeOfLastUpdate;
            this.timeOfLastUpdate = performance.now();
            this.update(this.dt);
            this.render();
            //(3/27/22) drawing
            //(3/27/22) this.draw();
            requestAnimationFrame(this.loop.bind(this));
        }
        else {
            return;
        }
    }
    update(dt) {
        if (this.isRunning) {
            this.gCanvas.update(dt);
        }
    }
    render() {
        if (this.isRunning) {
            this.gCanvas.render();
        }
    }
    playerJoined() {
        if (this.isRunning) {
            this.socket.on('sfLobbyPlayerJoined', (newPlayer, lobbyPlayers) => {
                //(3/30/22) lobbyPlayers is a light array, it's fine to just remake it every join/drop
                console.log(`${newPlayer.name} joined, number: ${newPlayer.playerNumber}`);
                this.gamePlayers = lobbyPlayers;
                this.gCanvas.addPlayer(newPlayer, this.gamePlayers);
            });
        }
    }
    playerDropped() {
        if (this.isRunning) {
            this.socket.on('sfGamePlayerDropped', (id, players) => {
                console.log(`${players.length} players left`);
                const droppedPlayer = getPlayerByID(id, players);
                console.log(`${droppedPlayer.name} dropped`);
                this.gamePlayers = players;
                this.gCanvas.dropPlayer(droppedPlayer, this.gamePlayers);
            });
        }
    }
    goTomorrow() {
        this.socket.on('sfGoTomorrow', (date) => {
            //console.log(`new date: ${dateToString(date)}`);
            const s = dateToString(date);
            console.log(s);
            this.gCanvas.goTomorrow(date);
        });
    }
}
