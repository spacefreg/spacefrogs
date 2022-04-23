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

    private isRunning: boolean = true;

    constructor(socket: io, self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>) {
        this.socket = socket;
        this.selfPlayer = self;
        this.hostPlayer = host;
        this.campaignName = campaignName;

        this.lobbyPlayers = lobbyPlayers;
        this.lCanvas = new LobbyCanvas(this.selfPlayer, this.hostPlayer, this.campaignName, this.lobbyPlayers, this.socket);

        
        this.socket.on('sfStartCampaign', () => {
            this.isRunning = false;
            this.lCanvas.isRunning = false;
            this.lCanvas.ctx.clearRect(0, 0, 1366, 768);
        });


        this.dt = 0;
        this.timeOfLastUpdate = 0;

        this.loop();


        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
    }
    
    //(3/27/22) socket callbacks

    public playerJoined(): void {
        if (this.isRunning) {
            this.socket.on('sfLobbyPlayerJoined', (newPlayer: Player, lobbyPlayers: Array<Player>) => {

                //(3/30/22) lobbyPlayers is a light array, it's fine to just remake it every join/drop
                console.log(`${newPlayer.name} joined, number: ${newPlayer.playerNumber}`);
                this.lobbyPlayers = lobbyPlayers;
                this.lCanvas.addPlayer(newPlayer, this.lobbyPlayers);
            });
        }
    }

    public playerDropped(): void {
        if (this.isRunning) {
            this.socket.on('sfLobbyPlayerDropped', (id: string, lobbyPlayers: Array<Player>) => {

                // const player = getPlayerByID(id, this.lobbyPlayers);

                const droppedPlayer = getPlayerByID(id, this.lobbyPlayers);
                console.log(`${droppedPlayer.name} dropped`);
                this.lobbyPlayers = lobbyPlayers;
                this.lCanvas.dropPlayer(droppedPlayer, this.lobbyPlayers);
            });
        }
    }

    //end of socket callbacks

    private loop(): void {
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

    private update(dt: number): void {
        if (this.isRunning) {
            this.lCanvas.update(dt);
        }
    }

    private render(): void {
        if (this.isRunning) {
            this.lCanvas.render();
        }
    }
}


