export default class Tile {
    public x: number;
    public y: number;
    public planet: string;
    public owner: TileOwner;
    public tileType: string;


    constructor(x: number, y: number, planet: string) {
        this.x = x;
        this.y = y;
        this.planet = planet;
        this.owner = TileOwner.Unclaimed;

        this.tileType = '';
        //this.setTileType(2);;
        //console.log(`${this.planet} tile created at ${this.x}, ${this.y}`);
    }


    public setTileType(type: number) {
        switch (this.planet) {
            case 'Earth':
                this.tileType = Object.keys(TileTypeEarth)[type];
                break;
            case 'Mars':
                this.tileType = Object.keys(TileTypeMars)[type];
                break;
        }
    }

    public setTileOwner(owner: TileOwner) {
        this.owner = owner;
    }


    public getTileTypeIndex(): number {
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

export function getTileTypeIndex(tile: Tile): number {
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
}

const TileTypeMars = {
    ICE: 'ice',
    LOWLANDS: 'lowlands',
    HIGHLANDS: 'highlands',
    MOUNTAINS: 'mountains'
}

export enum TileOwner {
    
    Unclaimed,

    US,
    China,
    Russia,
    India,
    Japan
}