//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import Player from '../../core/player.js';

import vec2 from '../../core/math/vec2.js';

import GameWindow from '../../core/ui/gamewindow.js';

import SocialPanel from '../../core/ui/socialpanel/socialpanel.js';
import FrogPanel from '../../core/ui/frogpanel/frogpanel.js';
import GamePanel from '../../core/ui/gamepanel/gamepanel.js';

export default class LobbyCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private socket: io;
    
    private gameWindow: GameWindow;

    private fpsIndicator: string;
    private timeFpsIndicatorLastUpdated: number;

    private socialPanel: SocialPanel;
    private frogPanel: FrogPanel;
    private gamePanel: GamePanel;

    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>, socket: io) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.socket = socket;



        this.gameWindow = new GameWindow(new vec2(230, 10), new vec2(800, 748));


        this.socialPanel = new SocialPanel(new vec2(10, 10), 'social panel', self.id, this.socket);

        this.frogPanel = new FrogPanel(new vec2(1, 480), self.name);

        this.gamePanel = new GamePanel(new vec2(1040, 10), 'right panel');

        this.addPlayer(self, lobbyPlayers);

        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);


        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();

    }   

    public update(dt: number): void {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }

        this.gameWindow.update(dt);
    }

    public addPlayer(playerarg: Player, lobbyPlayers: Array<Player>): void {
        this.socialPanel.frogPlayerChanged(playerarg, lobbyPlayers);
    }

    public dropPlayer(player: Player, lobbyPlayers: Array<Player>): void {
        console.log(`dropped player: ${player.name}`);
        this.socialPanel.frogPlayerChanged(player, lobbyPlayers);
    }

    public mouseDown(evt: MouseEvent): void {
        if (evt.clientX >=this.canvas.offsetLeft && evt.clientX <= this.canvas.offsetLeft + this.canvas.width && evt.clientY >= this.canvas.offsetTop && evt.clientY <= this.canvas.offsetTop + this.canvas.height) {
            evt.preventDefault();
            const pos: vec2 = new vec2(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
            //console.log(`${evt.clientX - this.canvas.offsetLeft}, ${evt.clientY - this.canvas.offsetTop}`);
            this.socialPanel.mouseDown(pos);
            this.frogPanel.mouseDown(pos);
            this.gamePanel.mouseDown(pos);
        }
    }

    public mouseMove(evt: MouseEvent): void {
        //(4/15/22) todo: add mouse move callback to all the panels and game window
        const pos: vec2 = new vec2(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
        this.socialPanel.mouseMove(pos);
        this.frogPanel.mouseMove(pos);
        this.gamePanel.mouseMove(pos);
    }

    public render(): void {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';

        

        this.gameWindow.render();

        this.socialPanel.render();
        this.frogPanel.render();
        this.gamePanel.render();

        const fpsTextLength = this.ctx.measureText(this.fpsIndicator).width;
        this.ctx.fillText(this.fpsIndicator, this.canvas.width - fpsTextLength - 3, 10);
    }

}