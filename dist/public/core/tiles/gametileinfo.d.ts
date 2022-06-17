import Tile from './tile.js';
export default class GameTileInfo {
    mercuryTiles: Array<Tile>;
    venusTiles: Array<Tile>;
    earthTiles: Array<Tile>;
    moonTiles: Array<Tile>;
    marsTiles: Array<Tile>;
    constructor();
    populate(merc: Tile[], venus: Tile[], earth: Tile[], moon: Tile[], mars: Tile[]): void;
}
