import { getPlayerByID } from '../../core/player.js';
import LobbyCanvas from './lobbycanvas.js';
export default class LobbyClient {
    constructor(socket, self, host, campaignName, lobbyPlayers) {
        this.socket = socket;
        this.selfPlayer = self;
        this.hostPlayer = host;
        this.campaignName = campaignName;
        this.lCanvas = new LobbyCanvas(this.selfPlayer, this.hostPlayer, this.campaignName, lobbyPlayers);
        this.lobbyPlayers = lobbyPlayers;
        this.dt = 0;
        this.timeOfLastUpdate = 0;
        this.loop();
        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
    }
    //(3/27/22) socket callbacks
    playerJoined() {
        this.socket.on('sfLobbyPlayerJoined', (newPlayer, lobbyPlayers) => {
            //(3/30/22) lobbyPlayers is a light array, it's fine to just remake it every join/drop
            console.log(`${newPlayer.name} joined, number: ${newPlayer.playerNumber}`);
            this.lobbyPlayers = lobbyPlayers;
            this.lCanvas.addPlayer(newPlayer, this.lobbyPlayers);
        });
    }
    playerDropped() {
        this.socket.on('sfLobbyPlayerDropped', (id, lobbyPlayers) => {
            // const player = getPlayerByID(id, this.lobbyPlayers);
            const droppedPlayer = getPlayerByID(id, this.lobbyPlayers);
            console.log(`${droppedPlayer.name} dropped`);
            this.lobbyPlayers = lobbyPlayers;
            this.lCanvas.dropPlayer(droppedPlayer, this.lobbyPlayers);
        });
    }
    //end of socket callbacks
    loop() {
        this.dt = performance.now() - this.timeOfLastUpdate;
        this.timeOfLastUpdate = performance.now();
        this.update(this.dt);
        this.render();
        //(3/27/22) drawing
        //(3/27/22) this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }
    update(dt) {
        this.lCanvas.update(dt);
    }
    render() {
        this.lCanvas.render();
    }
}
