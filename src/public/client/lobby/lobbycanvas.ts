import Player from '../../core/player.js';

import FrogPlayer from '../ui/frogplayer.js';

export default class LobbyCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    
    private frogplayers: Array<FrogPlayer>;

    private fpsIndicator: string;
    private timeFpsIndicatorLastUpdated: number;


    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.frogplayers = new Array();


        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();

    }

    public update(dt: number): void {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
    }

    public render(): void {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';

        for (let i = 0; i < this.frogplayers.length; i++) {
            console.log('calling render in lobbycanvas');
            this.frogplayers[i].render(this.ctx);
        }


        this.ctx.fillText(this.fpsIndicator, 10, 20);
    }

    public addPlayer(player: Player): void {
        console.log('adding player to lobbycanvas');
        this.frogplayers.push(new FrogPlayer(player.name, 1));
    }
}