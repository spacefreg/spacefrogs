import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';
import FrogPlayer from './frogplayer.js';

import Player from '../../player.js';

export default class SocialPanel extends sfuiPanel {

    private frogPlayers: Array<FrogPlayer>;
    private selfID: string;

    constructor(origin: vec2, title: string, selfID: string) {
        super(origin, title);

        this.selfID = selfID;
        this.frogPlayers = new Array<FrogPlayer>();
        this.setSize(new vec2(210, 461));
        this.setBackgroundColor('#74a653');
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
    }

    public frogPlayerChanged(player: Player, players: Array<Player>): void {
        //(4/13/22) just delete the existing array and repopulate with the newest players
        this.frogPlayers.length = 0;
        for (let i = 0; i < players.length; i++) {
            let isPlayer: boolean = false;
            if (players[i].id == this.selfID) {
                isPlayer = true;
            }
            this.frogPlayers.push(new FrogPlayer(players[i].name, players[i].playerNumber, this.origin, isPlayer));

            if (i == 0) {
                this.frogPlayers[i].setHost();
            }
        }
    }

    public mouseMove(mousePos: vec2): void {
        super.mouseMove(mousePos);

        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].mouseMove(mousePos);
        }
    }

    public mouseDown(mousePos: vec2): void {
        super.mouseDown(mousePos);

        for (let i = 0; i < this.frogPlayers.length; i++) {
            this.frogPlayers[i].mouseDown(mousePos);
        }
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