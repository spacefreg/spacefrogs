import { getPlayerByID } from '../core/player.js';
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
        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
    }
    playerJoined() {
        this.socket.on('sfLobbyPlayerJoined', (player) => {
            if (player.id != this.selfPlayer.id) {
                console.log(`player joined. name: ${player.name}`);
                this.lobbyPlayers.push(player);
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
}
//maybe make this a static class
