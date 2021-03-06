//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import Player, { getPlayerByID } from '../../core/player.js';

import vec2 from '../../core/utils/vec2.js';

import GameWindow from '../../core/ui/gamewindow.js';

import SocialPanel from '../../core/ui/socialpanel/socialpanel.js';
import FrogPanel from '../../core/ui/frogpanel/frogpanel.js';
import LobbyPanel from '../../core/ui/lobbypanel/lobbypanel.js';
import sfuiElement from '../../core/ui/sfuielement.js';

import sfStartCampaign from '../../core/messages/server/sfstartcampaign.js';

export default class LobbyCanvas {
    public isRunning: boolean = true;

    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private socket: io;
    
    private gameWindow: GameWindow;

    private fpsIndicator: string;
    private timeFpsIndicatorLastUpdated: number;

    private socialPanel: SocialPanel;
    private frogPanel: FrogPanel;
    private gamePanel: LobbyPanel;

    private playerSelections: Map<string, sfuiElement>;

    private startCampaignButton: sfuiElement;

    private isSelfHost: boolean = false;


    //(3/27/22) campaignName will eventually have to get swapped out for the save file data
    constructor(self: Player, host: Player, campaignName: string, lobbyPlayers: Array<Player>, socket: io) {
        this.canvas = <HTMLCanvasElement>document.getElementById('sf-canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        this.socket = socket;

        this.playerSelections = new Map<string, sfuiElement>();
        this.socket.on('sfPlayerCountrySelection', (p: Player) => {
            this.sfPlayerCountrySelection(p);
        });

        this.socket.on('sfAllowStartCampaign', (id: string) => {
            if (this.isSelfHost) {
                this.startCampaignButton.show();
            }
        });

        this.socket.on('sfPlayerNotReady', (id: string) => {
            this.sfPlayerNotReady(id);
        });

        this.socket.on('sfStartCampaign', (msg: sfStartCampaign) => {
            console.log(`starting campaign: ${campaignName}`);
            //this.socialPanel.show();
        });



        this.gameWindow = new GameWindow(new vec2(230, 10), new vec2(800, 748));

        this.socialPanel = new SocialPanel(new vec2(10, 10), 'social panel', self.id, this.socket);
        this.frogPanel = new FrogPanel(new vec2(1, 480), self.name);
        this.gamePanel = new LobbyPanel(new vec2(1040, 10), 'right panel');

        this.addPlayer(self, lobbyPlayers);

        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);


        this.startCampaignButton = new sfuiElement(new vec2(233, 37), 'Start');
        this.startCampaignButton.enableTitle();
        this.startCampaignButton.setAsButton();
        this.startCampaignButton.setFontSize(18);
        this.startCampaignButton.setTitleOrigin(new vec2(236, 57));
        this.startCampaignButton.setText('Start Campaign');
        this.startCampaignButton.setBackgroundColor('#4d4d4d');
        this.startCampaignButton.setBackgroundOpacity(.7);
        this.startCampaignButton.setSize(new vec2(134, 25));
        this.startCampaignButton.hide();


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

        for (let i = 0; i < lobbyPlayers.length; i++) {
            if (lobbyPlayers[i].country != '') {
                this.sfPlayerCountrySelection(lobbyPlayers[i]);
            }
            else 
            {
                console.log(`player ${lobbyPlayers[i].name} has no country`);
            }

            if (this.startCampaignButton) {
                this.startCampaignButton.hide();
            }
        }

        const self: Player = getPlayerByID(this.socket.id, lobbyPlayers);
        if (self.isHost) {
            this.isSelfHost = true;
        }
    }

    public dropPlayer(player: Player, lobbyPlayers: Array<Player>): void {
        console.log(`dropped player: ${player.name}`);
        this.socialPanel.frogPlayerChanged(player, lobbyPlayers);
        if (this.playerSelections.has(player.name)) {
            this.playerSelections.delete(player.name);
        }

        const self: Player = getPlayerByID(this.socket.id, lobbyPlayers);
        if (self.isHost) {
            this.isSelfHost = true;
        }
        this.startCampaignButton.hide();
    }

    public mouseDown(evt: MouseEvent): void {
        if (this.isRunning) {
            if (evt.clientX >=this.canvas.offsetLeft && evt.clientX <= this.canvas.offsetLeft + this.canvas.width && evt.clientY >= this.canvas.offsetTop && evt.clientY <= this.canvas.offsetTop + this.canvas.height) {
                evt.preventDefault();
                
                const pos: vec2 = new vec2(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
                
                const selectionCandidate: string = this.gamePanel.mouseDown(pos);
                this.socialPanel.mouseDown(pos);
                this.frogPanel.mouseDown(pos);
                if (selectionCandidate != '' ) {
                    this.socket.emit('sfcSelectionRequest', selectionCandidate);
                }

                this.startCampaignButton.mouseDown(pos);

                if (this.startCampaignButton.isActive() ) {
                    for (let i = 0; i < this.socialPanel.frogPlayers.length; i++) {
                        if (this.socialPanel.frogPlayers[i].isReady()) {
                            this.socket.emit('sfcStartCampaign');
                            this.startCampaignButton.hide();
                            this.startCampaignButton.toggleActive();
                            this.startCampaignButton.setSize(new vec2(0, 0));
                            this.startCampaignButton.setOrigin(new vec2(-100, -100));
                            this.socialPanel.hide();
                        }
                    }
                }


            }
        }
    }

    public mouseMove(evt: MouseEvent): void {
        //(4/15/22) todo: add mouse move callback to all the panels and game window
        const pos: vec2 = new vec2(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
        this.socialPanel.mouseMove(pos);
        this.frogPanel.mouseMove(pos);
        this.gamePanel.mouseMove(pos);
        this.gameWindow.mouseMove(pos);

        this.startCampaignButton.mouseMove(pos);
    }

    public render(): void {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'white';

        

        this.gameWindow.render();

        this.socialPanel.render();
        this.frogPanel.render();
        this.gamePanel.render();


        for (const [k, v] of this.playerSelections) {
            v.render();
        }

        //console.log(`rendering lobby canvas`);


        this.startCampaignButton.render();

        const fpsTextLength = this.ctx.measureText(this.fpsIndicator).width;
        this.ctx.fillText(this.fpsIndicator, this.canvas.width - fpsTextLength - 3, 10);
    }

    private sfPlayerCountrySelection(p: Player): void {
        //const player = getPlayerByID(p.id, this.);
        console.log(`player ${p.name} selected country: ${p.country}`);
        let selectionOffset: vec2 = new vec2(0, 100);
        let flagSelectionOrigin: vec2 = new vec2(this.gamePanel.getOrigin().x + 10, this.gamePanel.getOrigin().y + 275);
        switch (p.country) {
            case 'US':
                selectionOffset.x = 58;
                break;
            case 'China':
                selectionOffset.x = 142;
                break;
            case 'Russia':
                selectionOffset.x = 227;
                break;
            case 'India':
                selectionOffset.x = 103;
                selectionOffset.y = 190;
                break;
            case 'Japan':
                selectionOffset.x = 193;
                selectionOffset.y = 190;
                break;
        }
        this.playerSelections.set(p.name, new sfuiElement(new vec2(200, 200), p.name));
        const newestPlayerSelection = this.playerSelections.get(p.name)!;
        newestPlayerSelection.setSize(new vec2(100, 100));
        newestPlayerSelection.setOutline(true);
        newestPlayerSelection.setAsTooltip();
        newestPlayerSelection.setOutlineSize(new vec2(85, 90));
        newestPlayerSelection.setOrigin(new vec2(flagSelectionOrigin.x + selectionOffset.x, flagSelectionOrigin.y + selectionOffset.y));
        newestPlayerSelection.setOutlineOrigin(new vec2(newestPlayerSelection.getOrigin().x - 43, newestPlayerSelection.getOrigin().y - 85));
        newestPlayerSelection.setText(p.name);

        this.socialPanel.setFrogPlayerCountry(p.name, p.country);
    }

    private sfPlayerReady(id: string): void {
        
    }

    private sfPlayerNotReady(id: string): void {
     this.startCampaignButton.hide();   
    }

    public kill(): void {
        this.playerSelections.clear();
        this.socialPanel.hide();
        this.socialPanel.setSize(new vec2(0, 0));

    }
}