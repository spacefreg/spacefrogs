import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import Player from '../../core/player.js';
export default class LobbyClient {
    private socket;
    private selfPlayer;
    private hostPlayer;
    private campaignName;
    private lobbyPlayers;
    private lCanvas;
    private dt;
    private timeOfLastUpdate;
    constructor(socket: io, self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>);
    playerJoined(): void;
    playerDropped(): void;
    private loop;
    private update;
    private render;
}
