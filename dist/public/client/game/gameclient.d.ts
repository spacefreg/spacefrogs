import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import Player from '../../core/player.js';
export default class GameClient {
    private socket;
    private selfPlayer;
    private campaignName;
    private gamePlayers;
    private gCanvas;
    private dt;
    private timeOfLastUpdate;
    private isRunning;
    constructor(socket: io, campaignName: string, gamePlayers: Array<Player>);
    private loop;
    private update;
    private render;
    playerJoined(): void;
    playerDropped(): void;
    private goTomorrow;
}
