import Tile from '../../../public/core/tiles/tile.js';
export default class GameTiles {
    constructor() {
        this.mercuryTiles = new Array();
        this.venusTiles = new Array();
        this.earthTiles = new Array();
        this.moonTiles = new Array();
        this.marsTiles = new Array();
        this.initEarthTiles();
        this.initMarsTiles();
    }
    initEarthTiles() {
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
    initMarsTiles() {
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
