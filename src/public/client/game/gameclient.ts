//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import Player, { getPlayerByID } from '../../core/player.js';

import GameCanvas from './gamecanvas.js';

export default class GameClient {
    private socket: io;
    private selfPlayer: Player;
    private campaignName: string;
    private gamePlayers: Array<Player>;

    private gCanvas: GameCanvas;
    private dt: number;
    private timeOfLastUpdate: number;

    private isRunning: boolean = true;

    constructor(socket: io, campaignName: string, gamePlayers: Array<Player>) {
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

        this.socket.on('sfNewDate', (date: number) => {
            console.log(`new date: ${date}`);
        });

        this.socket.on()

        this.dt = 0;
        this.timeOfLastUpdate = 0;

        console.log(`game client constructor. self player: ${this.selfPlayer.name}`);

        this.loop();

        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
    }

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
            this.gCanvas.update(dt);
        }
    }

    private render(): void {
        if (this.isRunning) {
            this.gCanvas.render();
        }
    }

    public playerJoined(): void {
        if (this.isRunning) {
            this.socket.on('sfLobbyPlayerJoined', (newPlayer: Player, lobbyPlayers: Array<Player>) => {

                //(3/30/22) lobbyPlayers is a light array, it's fine to just remake it every join/drop
                console.log(`${newPlayer.name} joined, number: ${newPlayer.playerNumber}`);
                this.gamePlayers = lobbyPlayers;
                this.gCanvas.addPlayer(newPlayer, this.gamePlayers);
            });
        }
    }

    public playerDropped(): void {
        if (this.isRunning) {
            this.socket.on('sfGamePlayerDropped', (id: string, players: Array<Player>) => {
                console.log(`${players.length} players left`);
                const droppedPlayer = getPlayerByID(id, players);
                console.log(`${droppedPlayer.name} dropped`);
                this.gamePlayers = players;
                this.gCanvas.dropPlayer(droppedPlayer, this.gamePlayers);
            });
        }
    }
}