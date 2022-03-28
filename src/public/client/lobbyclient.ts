//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import sfLobbyWelcome from '../core/messages/server/sflobbywelcome.js';
import Player, { getPlayerByID } from '../core/player.js';

export default class LobbyClient {
    private socket: io;
    private selfPlayer: Player;
    private hostPlayer: Player;
    private lobbyPlayers: Array<Player>;

    constructor(socket: io, self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>) {
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

    public playerJoined(): void {
        this.socket.on('sfLobbyPlayerJoined', (player: Player) => {
            if (player.id != this.selfPlayer.id) {
                console.log(`player joined. name: ${player.name}`);
                this.lobbyPlayers.push(player);
                console.log(`new lobby players: ${this.lobbyPlayers.length}`);
        }
        });
    }

    public playerDropped(): void {
        this.socket.on('sfLobbyPlayerDropped', (id: string) => {

            const player = getPlayerByID(id, this.lobbyPlayers);

            console.log(`${player.name} dropped`);
            this.lobbyPlayers.splice(this.lobbyPlayers.indexOf(player), 1);
            console.log(`new lobby players: ${this.lobbyPlayers.length}`);
        });
    }
}



//maybe make this a static class
