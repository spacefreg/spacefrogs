class Tilemap {
    tiles = [];

    constructor(canv) {
        this.canv = canv;
    }

    init(planet, xCount, yCount) {
        this.planet = planet;
        this.xCount = xCount;
        this.yCount = yCount;

        this.tileAtlas = new Image(96, 32);
        this.tileAtlas.src = '/res/mapdata/earth/biomes/tileset.png';

        for (let i = 0; i < this.yCount; i++) {
            for (let j = 0; j < this.xCount; j++) {
                let tile = new Tile();
                tile.init(j, i, planet, 'US', tileBiomesEarth.OCEAN);
                if (planet == 'Mars') {
                    tile.setAllegiance('China');
                }
                this.tiles.push(tile);
                console.log(this.tiles[this.tiles.length - 1]);
            }
        }
    }

    draw() {
        for (let i = 0; i < this.yCount; i++) {
            for (let j = 0; j < this.xCount; j++) {
                this.canv.drawImage(this.tileAtlas, 
                    32,
                    0,
                    32,
                    32,
                    j*32,
                    i*32,
                    32,
                    32);
            }
        }
    }
    getIndexFromTile(tile) {
        return (tile.xIndex + (tile.yIndex * this.xCount));
    }

    getTileFromCoord(x, y) {
        return this.tiles[(this.xCount * y) + x];
    }
    
}


//CREATE OBJECTS WITH NEW BEFORE PASSING THEM 
//wtf I hate constructors now