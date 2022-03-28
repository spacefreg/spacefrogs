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

        for (let i = 0; i < lobbyPlayers.length; i++) {
            this.addPlayer(lobbyPlayers[i]);
        }

        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();

    }   

    public update(dt: number): void {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }

        console.log(`frogplayers length: ${this.frogPlayers.length}`);
    }

    public addPlayer(player: Player): void {
        this.frogPlayers.push(new FrogPlayer(player.name, player.playerNumber));
    }

    public dropPlayer(player: Player): void {
        const droppedFrog: FrogPlayer = getFrogPlayerByNumber(player.playerNumber, this.frogPlayers);
        if (droppedFrog) {
            this.frogPlayers.splice(this.frogPlayers.indexOf(droppedFrog), 1);
            console.log(`dropped player: ${droppedFrog.getName(), droppedFrog.getPlayerNumber()}`);
        }

        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].setPlayerNumber(i + 1);
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