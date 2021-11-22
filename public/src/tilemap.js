class Tilemap {
    tiles = [];



    init(canv, planet, xCount, yCount, rootPosition) {
        this.canv = canv;
        this.planet = planet;
        this.xCount = xCount;
        this.yCount = yCount;

        this.rootPosition = rootPosition;

        this.tileAtlas = new Image(96, 32);
        this.tileAtlas.src = '/res/mapdata/' + planet + '/biomes/tileset.png';

        console.log('creating planet ' + planet + ' with rootPosition ' + this.rootPosition.x + ', ' + this.rootPosition.y);

        for (let i = 0; i < this.yCount; i++) {
            for (let j = 0; j < this.xCount; j++) {
                let tile = new Tile();
                tile.init(j, i, planet, 'US', tileBiomesEarth.OCEAN, this.rootPosition);
                if (planet == 'Mars') {
                    tile.setAllegiance('China');
                }
                this.tiles.push(tile);
                //console.log(this.tiles[this.tiles.length - 1]);
            }
        }
    }

    draw() {
        for (let i = 0; i < this.yCount; i++) {
            for (let j = 0; j < this.xCount; j++) {
                let currentTile = this.getTileFromCoord(i, j);
                //console.log('current tile - ' + currentTile.planet + ', point: ' + currentTile.point.x + ', ' + currentTile.point.y);
                this.canv.drawImage(this.tileAtlas, //image -- s = source img, d = destination img
                    32, //sX
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
        return this.tiles[(this.xCount * x) + y];
    }
    
}


//CREATE OBJECTS WITH NEW BEFORE PASSING THEM 
//wtf I hate constructors now