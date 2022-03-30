//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import Player, { getPlayerByID } from '../../core/player.js';
import LobbyCanvas from './lobbycanvas.js';

import { getFrogPlayerByNumber } from '../ui/frogplayer.js';

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

        console.log(`LOBBYCLIENT CONSTRUCTOR: ${lobbyPlayers.length}`);
        this.lCanvas = new LobbyCanvas(this.selfPlayer, this.hostPlayer, this.campaignName, lobbyPlayers);
        
        if (lobbyPlayers.length == 0) {
            this.lobbyPlayers = new Array();
            console.log(`DOES THIS EVER HAPPEN?`);
            //this.lobbyPlayers.push(host); //(3/27/22) either host or self could be pushed to lobbyPlayers since they are the same here, but host is slightly more explicit
            this.lCanvas.addPlayer(this.hostPlayer); 
        }
        else {

            this.lobbyPlayers = lobbyPlayers;
        }
        
        



        this.dt = 0;
        this.timeOfLastUpdate = 0;


        this.loop();

        //(3/27/22) socket callbacks
        this.playerDropped();
        this.playerJoined();
    }
    
    //(3/27/22) socket callbacks

    public playerJoined(): void {
        this.socket.on('sfLobbyPlayerJoined', (player: Player) => {
            //(3/27/22) this if statement is to prevent the player from being added to the lobby twice
            if (player.id != this.selfPlayer.id) {
                console.log(`player joined. name: ${player.name}, number: ${player.playerNumber}`);
                this.lobbyPlayers.push(player);
                this.lCanvas.addPlayer(player);
                console.log(`new lobby players: ${this.lobbyPlayers.length}`);
            }
            else {
                console.log(`IDK: ${player.id}`);
            }
        });
    }

    public playerDropped(): void {
        this.socket.on('sfLobbyPlayerDropped', (id: string) => {

            const player = getPlayerByID(id, this.lobbyPlayers);
            this.lCanvas.dropPlayer(player);
            console.log(`${player.name} dropped`);
            this.lobbyPlayers.splice(this.lobbyPlayers.indexOf(player), 1);
            console.log(`new lobby players: ${this.lobbyPlayers.length}`);
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


