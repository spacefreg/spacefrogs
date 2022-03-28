import { getPlayerByID } from '../../core/player.js';
import LobbyCanvas from './lobbycanvas.js';
export default class LobbyClient {
    constructor(socket, self, host, campaignName, lobbyPlayers) {
        this.socket = socket;
        if (lobbyPlayers.length == 0) {
            this.lobbyPlayers = new Array();
            this.lobbyPlayers.push(host); //(3/27/22) either host or self could be pushed to lobbyPlayers since they are the same here, but host is slightly more explicit
        }
        else {
            this.lobbyPlayers = lobbyPlayers;
        }
        console.log(`selfName: ${self.name}`);
        this.selfPlayer = self;
        //const host = getPlayerByID(hostID, this.lobbyPlayers);
        console.log(`hostName: ${host.name}`);
        this.hostPlayer = host;
        this.campaignName = campaignName;
        this.dt = 0;
        this.timeOfLastUpdate = 0;
        this.lCanvas = new LobbyCanvas(this.selfPlayer, this.hostPlayer, this.campaignName, this.lobbyPlayers);
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
                console.log(`player joined. name: ${player.name}`);
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
    }
    render() {
        this.lCanvas.render();
    }
}
