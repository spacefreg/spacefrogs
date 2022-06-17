import Tile from '../../../public/core/tiles/tile.js';

export default class GameTiles {


    public mercuryTiles: Tile[];
    public venusTiles: Tile[];
    public earthTiles: Tile[];
    public moonTiles: Tile[];
    public marsTiles: Tile[];

    constructor() {
        this.mercuryTiles = new Array<Tile>();
        this.venusTiles = new Array<Tile>();
        this.earthTiles = new Array<Tile>();
        this.moonTiles = new Array<Tile>();
        this.marsTiles = new Array<Tile>();

        this.initEarthTiles();
        this.initMarsTiles();

    }

    private initEarthTiles() {
        for (let i = 0; i < 18; i++) {
            for (let j = 0; j < 11; j++) {
                let tile = new Tile(j, i, 'Earth');
                this.earthTiles.push(tile);
                if (j % 2 == 0) {
                    this.earthTiles[this.earthTiles.length - 1].setTileType(0);
                }
                else {
                    this.earthTiles[this.earthTiles.length - 1].setTileType(1);
                }
            }
        }
    }

    private initMarsTiles() {
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 6; j++) {
                let tile = new Tile(j, i, 'Mars');
                this.marsTiles.push(tile);
                if (j % 2 == 0) {
                    this.marsTiles[this.marsTiles.length - 1].setTileType(0);
                }
                else {
                    this.marsTiles[this.marsTiles.length - 1].setTileType(1);
                }
            }
        }
    }
}