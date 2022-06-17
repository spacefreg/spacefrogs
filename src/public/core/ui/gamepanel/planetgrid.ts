import Planet from '../../planets/planet.js';
import Tile, { getTileTypeIndex } from '../../tiles/tile.js';
import { ctx } from '../../utils/ctx.js';

export default class PlanetGrid {
    private currentPlanet: Planet | null;
    private tiles: Array<Tile>;
    private tileAtlas: HTMLImageElement;

    constructor() {
        this.currentPlanet = new Planet('','', 0, 0, 0);
        this.tiles = new Array<Tile>();

        this.tileAtlas = new Image();
    }

    public setPlanet(planet: Planet | null) {
        this.currentPlanet = planet;

        if (this.currentPlanet) {
            console.log(`planet grid set to planet ${this.currentPlanet.name}`);
            this.tiles = this.currentPlanet.getTileMap();

            this.tileAtlas.src = this.currentPlanet.tileAtlasSrc;
        }
        else {
            console.log('planet grid set to null');
        }

    }

    public render(): void {
        if (this.currentPlanet) {
            for (let i = 0; i < this.currentPlanet.tileDimensions.y; i++) {
                for (let j = 0; j < this.currentPlanet.tileDimensions.x; j++) {

                    let currentTile = this.currentPlanet.getTileFromCoord(i, j);

                    if (currentTile) {
                        let textureAtlasOffset = getTileTypeIndex(currentTile);
                        ctx.drawImage(this.tileAtlas, textureAtlasOffset * 16, 0, 16, 16, j * 16, i * 16, 16, 16);
                    }
                }
            }
        }
    }


}