import { getPlayerByID } from '../../core/player.js';
import LobbyCanvas from './lobbycanvas.js';
export default class LobbyClient {
    constructor(socket, self, host, campaignName, lobbyPlayers) {
        this.socket = socket;
        this.selfPlayer = self;
        this.hostPlayer = host;
        this.campaignName = campaignName;
        if (lobbyPlayers.length == 0) {
            this.lobbyPlayers = new Array();
            this.lobbyPlayers.push(host); //(3/27/22) either host or self could be pushed to lobbyPlayers since they are the same here, but host is slightly more explicit
        }
        else {
            this.lobbyPlayers = lobbyPlayers;
        }
        this.lCanvas = new LobbyCanvas(this.selfPlayer, this.hostPlayer, this.campaignName, this.lobbyPlayers);
        for (let i = 0; i < this.lobbyPlayers.length; i++) {
            this.lCanvas.addPlayer(this.lobbyPlayers[i]);
        }
        //const host = getPlayerByID(hostID, this.lobbyPlayers);
        this.dt = 0;
        this.timeOfLastUpdate = 0;
        this.lCanvas.addPlayer(this.selfPlayer);
        this.loop();
        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
    }
    //(3/27/22) socket callbacks
    playerJoined() {
        this.socket.on('sfLobbyPlayerJoined', (player) => {
            //(3/27/22) this if statement is to prevent the player from being added to the lobby twice
            if (player.id != this.selfPlayer.id) {
                console.log(`player joined. name: ${player.name}, number: ${player.playerNumber}`);
                this.lobbyPlayers.push(player);
                this.lCanvas.addPlayer(player);
                console.log(`new lobby players: ${this.lobbyPlayers.length}`);
            }
        });
    }
    playerDropped() {
        this.socket.on('sfLobbyPlayerDropped', (id) => {
            const player = getPlayerByID(id, this.lobbyPlayers);
            console.log(`${player.name} dropped`);
            this.lobbyPlayers.splice(this.lobbyPlayers.indexOf(player), 1);
            console.log(`new lobby players: ${this.lobbyPlayers.length}`);
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
        // for (let i = 0; i < this.lobbyPlayers.length; i++) {
        //     console.log(`${this.lobbyPlayers[i].name}, ${this.lobbyPlayers[i].playerNumber}`);
        // }
    }
    render() {
        this.lCanvas.render();
    }
}
