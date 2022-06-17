import sfMessage from '../sfmessage.js';

import sfDate from '../../utils/sfdate.js';
import GameTileInfo from '../../tiles/gametileinfo.js';
import Tile from '../../tiles/tile.js';

export default class sfGoTomorrow extends sfMessage {
    public gameDate: sfDate;
    public gameTileInfo: GameTileInfo;

    constructor(gameDate: sfDate) {
        super('server', 'sfGoTomorrow', Date.now());
        this.gameDate = gameDate;

        this.gameTileInfo = new GameTileInfo();
    }

    public populate(merc: Tile[], venus: Tile[], earth: Tile[], moon: Tile[], mars: Tile[]) {
        this.gameTileInfo.populate(merc, venus, earth, moon, mars);
    }
}