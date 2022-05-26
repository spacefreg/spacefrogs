export default class Tile {
    x: number;
    y: number;
    planet: string;
    owner: TileOwner;
    private tileType;
    constructor(x: number, y: number, planet: string);
    setTileType(type: number): void;
    setTileOwner(owner: TileOwner): void;
    getTileType(): string;
    getTileTypeIndex(): number;
}
export declare enum TileOwner {
    Unclaimed = 0,
    US = 1,
    China = 2,
    Russia = 3,
    India = 4,
    Japan = 5
}
