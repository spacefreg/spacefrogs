//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import Player, { getPlayerByID } from '../../core/player.js';
import LobbyCanvas from './lobbycanvas.js';


export default class LobbyClient {
    private socket: io;
    private selfPlayer: Player;
    private hostPlayer: Player;
    private campaignName: string;
    private lobbyPlayers: Array<Player>;

    //(3/27/22) drawing fields
    private lCanvas: LobbyCanvas;
    private dt: number;
    private timeOfLastUpdate: number;

    constructor(socket: io, self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>) {
        this.socket = socket;
        this.selfPlayer = self;
        this.hostPlayer = host;
        this.campaignName = campaignName;

        this.lobbyPlayers = lobbyPlayers;
        this.lCanvas = new LobbyCanvas(this.selfPlayer, this.hostPlayer, this.campaignName, this.lobbyPlayers, this.socket);

        

        this.dt = 0;
        this.timeOfLastUpdate = 0;

        this.loop();

        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
    }
    
    //(3/27/22) socket callbacks

    public playerJoined(): void {
        this.socket.on('sfLobbyPlayerJoined', (newPlayer: Player, lobbyPlayers: Array<Player>) => {

            //(3/30/22) lobbyPlayers is a light array, it's fine to just remake it every join/drop
            console.log(`${newPlayer.name} joined, number: ${newPlayer.playerNumber}`);
            this.lobbyPlayers = lobbyPlayers;
            this.lCanvas.addPlayer(newPlayer, this.lobbyPlayers);
        });
    }

    public playerDropped(): void {
        this.socket.on('sfLobbyPlayerDropped', (id: string, lobbyPlayers: Array<Player>) => {

            // const player = getPlayerByID(id, this.lobbyPlayers);

            const droppedPlayer = getPlayerByID(id, this.lobbyPlayers);
            console.log(`${droppedPlayer.name} dropped`);
            this.lobbyPlayers = lobbyPlayers;
            this.lCanvas.dropPlayer(droppedPlayer, this.lobbyPlayers);
        });
    }

    //end of socket callbacks

    private loop(): void {
        this.dt = performance.now() - this.timeOfLastUpdate;
        this.timeOfLastUpdate = performance.now();

        this.update(this.dt);
        this.render();
        //(3/27/22) drawing
        //(3/27/22) this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    private update(dt: number): void {
        this.lCanvas.update(dt);
    }

    private render(): void {
        this.lCanvas.render();
    }
}


