import Player from '../../core/player.js';

import FrogPlayer, { getFrogPlayerByNumber } from '../ui/frogplayer.js';

export default class LobbyCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    
    private frogPlayers: Array<FrogPlayer>;

    private fpsIndicator: string;
    private timeFpsIndicatorLastUpdated: number;


    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.frogPlayers = new Array();

        this.addPlayer(self, lobbyPlayers);



        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();

    }   

    public update(dt: number): void {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }

        //console.log(`frogplayers length: ${this.frogPlayers.length}`);
    }

    public addPlayer(playerarg: Player, lobbyPlayers: Array<Player>): void {
        
        this.frogPlayers.length = 0;
        for (let i = 0; i < lobbyPlayers.length; i++) {
            this.frogPlayers.push(new FrogPlayer(lobbyPlayers[i].name, lobbyPlayers[i].playerNumber));

            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }

    }

    public dropPlayer(player: Player, lobbyPlayers: Array<Player>): void {
        console.log(`dropped player: ${player.name}`);

        this.frogPlayers.length = 0;
        for (let i = 0; i < lobbyPlayers.length; i++) {
            this.frogPlayers.push(new FrogPlayer(lobbyPlayers[i].name, lobbyPlayers[i].playerNumber));

            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }

    }

    public render(): void {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';

        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].render(this.ctx);
        }


        this.ctx.fillText(this.fpsIndicator, 10, 20);
    }


}