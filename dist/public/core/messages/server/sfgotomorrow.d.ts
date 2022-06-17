import sfMessage from '../sfmessage.js';
import sfDate from '../../utils/sfdate.js';
import GameTileInfo from '../../tiles/gametileinfo.js';
import Tile from '../../tiles/tile.js';
export default class sfGoTomorrow extends sfMessage {
    gameDate: sfDate;
    gameTileInfo: GameTileInfo;
    constructor(gameDate: sfDate);
    populate(merc: Tile[], venus: Tile[], earth: Tile[], moon: Tile[], mars: Tile[]): void;
}
