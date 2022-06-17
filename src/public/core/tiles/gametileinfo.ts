import Tile from './tile.js';

export default class GameTileInfo {
    public mercuryTiles: Array<Tile>;
    public venusTiles: Array<Tile>;
    public earthTiles: Array<Tile>;
    public moonTiles: Array<Tile>;
    public marsTiles: Array<Tile>;

    constructor() {
        this.mercuryTiles = new Array<Tile>();
        this.venusTiles = new Array<Tile>();
        this.earthTiles = new Array<Tile>();
        this.moonTiles = new Array<Tile>();
        this.marsTiles = new Array<Tile>();
    }

    public populate(merc: Tile[], venus: Tile[], earth: Tile[], moon: Tile[], mars: Tile[]) {
        this.mercuryTiles = merc;
        this.venusTiles = venus;
        this.earthTiles = earth;
        this.moonTiles = moon;
        this.marsTiles = mars;
    }
}