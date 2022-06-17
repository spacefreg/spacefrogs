export default class Tile {
    constructor(x, y, planet) {
        this.x = x;
        this.y = y;
        this.planet = planet;
        this.owner = TileOwner.Unclaimed;
        this.tileType = '';
        //this.setTileType(2);;
        //console.log(`${this.planet} tile created at ${this.x}, ${this.y}`);
    }
    setTileType(type) {
        switch (this.planet) {
            case 'Earth':
                this.tileType = Object.keys(TileTypeEarth)[type];
                break;
            case 'Mars':
                this.tileType = Object.keys(TileTypeMars)[type];
                break;
        }
    }
    setTileOwner(owner) {
        this.owner = owner;
    }
    getTileTypeIndex() {
        //console.log(`${this.planet} tile type index for ${this.tileType}`);
        switch (this.planet) {
            case 'Earth':
                console.log('returning index ' + Object.keys(TileTypeEarth).indexOf(this.tileType));
                return Object.keys(TileTypeEarth).indexOf(this.tileType);
                break;
            case 'Mars':
                //console.log(Object.keys(TileTypeMars).indexOf(this.tileType));
                return 1;
                return Object.keys(TileTypeMars).indexOf(this.tileType);
                break;
            default:
                return 1;
        }
    }
}
export function getTileTypeIndex(tile) {
    switch (tile.planet) {
        case 'Earth':
            return Object.keys(TileTypeEarth).indexOf(tile.tileType);
        case 'Mars':
            return Object.keys(TileTypeMars).indexOf(tile.tileType);
        default:
            return 1;
    }
}
const TileTypeEarth = {
    FOREST: 'forest',
    WATER: 'water',
    DESERT: 'desert'
};
const TileTypeMars = {
    ICE: 'ice',
    LOWLANDS: 'lowlands',
    HIGHLANDS: 'highlands',
    MOUNTAINS: 'mountains'
};
export var TileOwner;
(function (TileOwner) {
    TileOwner[TileOwner["Unclaimed"] = 0] = "Unclaimed";
    TileOwner[TileOwner["US"] = 1] = "US";
    TileOwner[TileOwner["China"] = 2] = "China";
    TileOwner[TileOwner["Russia"] = 3] = "Russia";
    TileOwner[TileOwner["India"] = 4] = "India";
    TileOwner[TileOwner["Japan"] = 5] = "Japan";
})(TileOwner || (TileOwner = {}));
