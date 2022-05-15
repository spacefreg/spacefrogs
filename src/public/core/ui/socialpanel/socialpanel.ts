//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import vec2 from '../../utils/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import FrogPlayer, { getFrogPlayerByID } from './frogplayer.js';

import Player, { getPlayerByID } from '../../player.js';

export default class SocialPanel extends sfuiPanel {

    public frogPlayers: Array<FrogPlayer>;
    private socket: io;
    private selfID: string;

    private inGame: boolean = false;

    constructor(origin: vec2, title: string, selfID: string, socket: io) {
        super(origin, title);

        this.socket = socket;

        this.selfID = selfID;
        this.frogPlayers = new Array<FrogPlayer>();
        this.setSize(new vec2(210, 458));
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);

        this.socket.on('sfPlayerReady', (id: string) => {
            const p = getFrogPlayerByID(id, this.frogPlayers);
            p.readyPlayer();
        });

        this.socket.on('sfPlayerNotReady', (id: string) => {
            const p = getFrogPlayerByID(id, this.frogPlayers);
            p.unreadyPlayer();
        });
    }

    public frogPlayerChanged(player: Player, players: Array<Player>): void {
        //(4/13/22) just delete the existing array and repopulate with the newest players
        this.frogPlayers.length = 0;
        for (let i = 0; i < players.length; i++) {
            let isPlayer: boolean = false;
            if (players[i].id == this.selfID) {
                isPlayer = true;
            }
            this.frogPlayers.push(new FrogPlayer(players[i].name, players[i].id, players[i].playerNumber, this.origin, isPlayer, this.socket));

            if (this.inGame) {
                this.frogPlayers[this.frogPlayers.length - 1].disableLobbyButton();
            }

            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }
    }

    public mouseMove(mousePos: vec2): void {
        super.mouseMove(mousePos);

        const self: FrogPlayer = getFrogPlayerByID(this.selfID, this.frogPlayers);
        self.mouseMove(mousePos);
    }

    public mouseDown(mousePos: vec2): void {
        super.mouseDown(mousePos);

        const self: FrogPlayer = getFrogPlayerByID(this.selfID, this.frogPlayers);
        if (self.getCountry() != '') {
            self.mouseDown(mousePos);
        }
    }

    public setFrogPlayerCountry(name: string, country: string): void {
        for (let i = 0; i < this.frogPlayers.length; i++) {
            if (this.frogPlayers[i].getName() == name) {
                this.frogPlayers[i].setCountry(country);
            }
        }
    } 

    public getHost(): FrogPlayer {
        return this.frogPlayers[0];
    }

    public hide(): void {
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].hide();
        }
    }

    public show(): void {
        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].show();
        }
    }

    public setInGame(): void {
        this.inGame = true;
    }

    public update(dt: number): void {
        super.update(dt);
    }
    
    public render(): void {
        super.render();

        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].render();
        }
    }
}