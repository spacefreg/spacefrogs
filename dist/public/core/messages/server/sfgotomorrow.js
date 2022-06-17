import sfMessage from '../sfmessage.js';
import GameTileInfo from '../../tiles/gametileinfo.js';
export default class sfGoTomorrow extends sfMessage {
    constructor(gameDate) {
        super('server', 'sfGoTomorrow', Date.now());
        this.gameDate = gameDate;
        this.gameTileInfo = new GameTileInfo();
    }
    populate(merc, venus, earth, moon, mars) {
        this.gameTileInfo.populate(merc, venus, earth, moon, mars);
    }
}
