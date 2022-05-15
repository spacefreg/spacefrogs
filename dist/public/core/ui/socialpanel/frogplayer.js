import vec2 from '../../utils/vec2.js';
import sfuiElement from '../sfuielement.js';
export default class FrogPlayer {
    constructor(name, id, playerNumber, panelOrigin, isPlayer, socket) {
        this.isHost = false;
        this.isPlayer = false;
        this.name = name;
        this.id = id;
        this.socket = socket;
        this.isPlayer = isPlayer;
        this.fPlayerNumber = playerNumber;
        this.origin = new vec2(0, 0);
        this.country = '';
        this.panelOrigin = panelOrigin;
        this.frog = new sfuiElement(this.origin, this.name);
        this.frog.setImage('../../res/images/frogs/spaceapu-lobby.png');
        this.frog.setText(this.name);
        this.frog.enableTitle();
        this.readyToPlayButton = new sfuiElement(this.origin, 'Ready to Play');
        this.playerIndicator = new sfuiElement(this.origin, 'Player Indicator');
        if (this.isPlayer) {
            this.playerIndicator.setImage('../../res/images/frogs/playerindicator.png');
        }
        this.setFrogPlayerNumber(playerNumber);
        const readyOrigin = new vec2(this.origin.x + 68, this.origin.y);
        this.readyIndicator = new sfuiElement(readyOrigin, 'Ready Indicator');
        this.readyIndicator.setImage('../../res/images/ui/frogplayernotready.png');
    }
    setHost() {
        this.isHost = true;
        this.frog.setText(this.frog.getText() + ' (host)');
    }
    getHost() {
        return this.isHost;
    }
    getName() {
        const n = this.name;
        return n;
    }
    getfPlayerNumber() {
        const n = this.fPlayerNumber;
        return n;
    }
    setCountry(name) {
        this.country = name;
    }
    getCountry() {
        return this.country;
    }
    getID() {
        return this.id;
    }
    setFrogPlayerNumber(num) {
        //console.log(`calling setFrogPlayerNumber`);
        this.fPlayerNumber = num;
        this.origin = new vec2(5, (this.fPlayerNumber * 45) - 30);
        this.origin.x += this.panelOrigin.x;
        this.origin.y += this.panelOrigin.y;
        this.frog.setOrigin(this.origin);
        const buttonPos = new vec2(this.origin.x + 100, this.origin.y);
        const titleOrigin = new vec2(buttonPos.x + 14, buttonPos.y + 17);
        this.readyToPlayButton.setAsButton();
        this.readyToPlayButton.setAsToggle();
        this.readyToPlayButton.setSize(new vec2(100, 30));
        this.readyToPlayButton.setOrigin(buttonPos);
        this.readyToPlayButton.setTitleOrigin(titleOrigin);
        this.readyToPlayButton.setBackgroundColor('#ffffff');
        this.readyToPlayButton.setBackgroundOpacity(0.13);
        this.playerIndicator.setOrigin(new vec2(this.origin.x + 40, this.origin.y + 10));
    }
    mouseMove(mousePos) {
        this.frog.mouseMove(mousePos);
        this.readyToPlayButton.mouseMove(mousePos);
    }
    mouseDown(mousePos) {
        if (this.isPlayer) {
            const oldActiveState = this.readyToPlayButton.isActive();
            this.frog.mouseDown(mousePos);
            this.readyToPlayButton.mouseDown(mousePos);
            if (this.readyToPlayButton.isActive() && !oldActiveState) {
                this.socket.emit('sfcPlayerReady');
            }
            else if (!this.readyToPlayButton.isActive() && oldActiveState) {
                this.socket.emit('sfcPlayerNotReady');
            }
        }
    }
    readyPlayer() {
        this.readyIndicator.setImage('../../res/images/ui/frogplayerready.png');
    }
    unreadyPlayer() {
        this.readyIndicator.setImage('../../res/images/ui/frogplayernotready.png');
    }
    isReady() {
        return this.readyToPlayButton.isActive();
    }
    update(dt) {
    }
    render() {
        this.frog.render();
        this.readyIndicator.render();
        this.readyToPlayButton.render();
        this.playerIndicator.render();
    }
    hide() {
        this.frog.hide();
        this.readyIndicator.hide();
        this.readyToPlayButton.hide();
        this.playerIndicator.hide();
    }
    show() {
        this.frog.show();
        this.readyIndicator.show();
        this.readyToPlayButton.show();
        this.playerIndicator.show();
    }
    disableLobbyButton() {
        this.readyToPlayButton.hide();
        this.readyIndicator.hide();
        this.readyToPlayButton.setSize(new vec2(0, 0));
    }
}
export function getFrogPlayerByNumber(num, players) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].getfPlayerNumber() == num) {
            return players[i];
        }
    }
    //(3/27/22) gremlin is the 'player not found' player
    return new FrogPlayer('gremlin', '', 0, new vec2(0, 0), false, null);
}
export function getFrogPlayerByID(id, frogPlayers) {
    for (let i = 0; i < frogPlayers.length; i++) {
        if (frogPlayers[i].getID() == id) {
            return frogPlayers[i];
        }
    }
    //(4/18/22) gremlin is the 'player not found' player
    return new FrogPlayer('gremlin', '', 0, new vec2(0, 0), false, null);
}
