class Tilemap {
    tiles = [];



    init(canv, planet, xCount, yCount, rootPosition) {
        this.canv = canv;
        this.planet = planet;
        this.xCount = xCount;
        this.yCount = yCount;

        this.rootPosition = rootPosition;

        this.tileAtlas = new Image(96, 32);
        this.tileAtlas.src = '/res/mapdata/' + this.planet + '/biomes/tileset.png';

        console.log('creating planet ' + this.planet + ' with rootPosition ' + this.rootPosition.x + ', ' + this.rootPosition.y);

        //tile init code here, 
        for (let i = 0; i < this.yCount; i++) {
            for (let j = 0; j < this.xCount; j++) {
                let tile = new Tile();
                tile.init(j, i, this.planet, 'US', this.rootPosition);

                switch (this.planet) {
                    case 'mars':
                        tile.setBiome(2);
                        break;
                    case 'earth':
                        tile.setBiome(0);
                        break;
                    default:
                        break;
                }
                this.tiles.push(tile);
                //console.log(this.tiles[this.tiles.length - 1]);
            }
        }

        //this.tiles[this.getIndexFromCoord(5, 5)].setBiome(1);
        //let dummyTile = this.getTileFromCoord(4, 2);
        //console.log('biome at ' + dummyTile.xIndex + ', ' + dummyTile.yIndex + ' on planet ' + dummyTile.planet + ' is ' + dummyTile.getBiome());
        //console.log(dummyTile.getBiomeIndex());
    }

    draw() {
        for (let i = 0; i < this.yCount; i++) {
            for (let j = 0; j < this.xCount; j++) {
                let currentTile = this.getTileFromCoord(i, j);
                let textureAtlasOffset = currentTile.getBiomeIndex() * 32; 
                //console.log('texture offset ' + textureAtlasOffset);
                this.canv.drawImage(this.tileAtlas, //image -- s = source img, d = destination img
                    textureAtlasOffset, //sX
                    0, //sY
                    32, //sWidth
                    32, //sHeight
                    currentTile.point.x, //j*32, //dX
                    currentTile.point.y, //i*32, //dY
                    32, //dWidth
                    32); //dHeight
            }
        }
    }
    getIndexFromTile(tile) {
        return (tile.xIndex + (tile.yIndex * this.xCount));
    }

    getTileFromCoord(x, y) {
        //currently params must be received y,x format. will look into fixing soon (11/23/21)
        return this.tiles[(this.xCount * x) + y];
    }
    
    getIndexFromCoord(x, y) {
        let tile = this.getTileFromCoord(y, x);
        return this.getIndexFromTile(tile);
    }

    setBiomeAtCoord(planet, x, y, biome) {
        console.log(this.planet);
        if (this.planet == planet) {
            console.log('setting biome at ' + planet + ': ' + x + ', ' + y + ' to ' + biome);
            this.tiles[this.getIndexFromCoord(x, y)].setBiome(biome);
        }
    }
}


//CREATE OBJECTS WITH NEW BEFORE PASSING THEM 
//wtf I hate constructors now