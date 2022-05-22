//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import vec2 from '../../core/utils/vec2.js';

import SocialPanel from '../../core/ui/socialpanel/socialpanel.js';
import GameWindow from '../../core/ui/gamewindow.js';

import Player, { getPlayerByID } from '../../core/player.js';
import FrogPanel from '../../core/ui/frogpanel/frogpanel.js';
import sfDate from '../../core/utils/sfdate.js';


export default class GameCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private socket: io;

    private socialPanel: SocialPanel;
    private frogPanel: FrogPanel;
    private gameWindow: GameWindow;

    private selfID: string = 'gremlin';

    constructor(campaignName: string, players: Array<Player>, socket: io) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.socket = socket;

        const selfPlayer: Player = getPlayerByID(this.socket.id, players);
        this.selfID = this.socket.id;


        this.gameWindow = new GameWindow(new vec2(230, 10), new vec2(800, 748));
        this.gameWindow.setInGame();
        this.socialPanel = new SocialPanel(new vec2(10, 10), 'social panel', this.socket.id, this.socket);
        this.socialPanel.setInGame();
        this.frogPanel = new FrogPanel(new vec2(1, 480), selfPlayer.name);

        this.addPlayer(selfPlayer, players);

        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);

        document.onkeydown = this.keyDown.bind(this);
    }

    public addPlayer(p: Player, players: Array<Player>): void {
        this.socialPanel.frogPlayerChanged(p, players);
    }

    public dropPlayer(player: Player, lobbyPlayers: Array<Player>): void {
        console.log(`dropped player: ${player.name}`);
        this.socialPanel.frogPlayerChanged(player, lobbyPlayers);
    }

    public mouseMove(evt: MouseEvent): void {
        //(4/15/22) todo: add mouse move callback to all the panels and game window
        const pos: vec2 = new vec2(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
        this.socialPanel.mouseMove(pos);
        this.frogPanel.mouseMove(pos);
        //this.gamePanel.mouseMove(pos);
        this.gameWindow.mouseMove(pos);
    }

    public mouseDown(evt: MouseEvent): void {
        evt.preventDefault();
    }

    public keyDown(evt: KeyboardEvent): void {
        switch (evt.code) {
            case 'Space':
                if (this.socialPanel.getHost().getID() == this.selfID) {
                    this.socket.emit('sfcTogglePause');
                }
                break;
        }
    }

    public goTomorrow(date: sfDate): void {
        this.gameWindow.goTomorrow(date);
        
    }

    public update(dt: number): void {
        this.gameWindow.update(dt);
        this.socialPanel.update(dt);
        this.frogPanel.update(dt);
    }

    public render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';

        this.socialPanel.render();
        this.gameWindow.render();
        this.frogPanel.render();
    }
}