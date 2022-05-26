import vec2 from '../utils/vec2.js';
import sfuiElement from '../ui/sfuielement.js';
import Tile from '../tiles/tile.js';
export default class Planet {
    name: string;
    parentName: string;
    parentCenter: vec2;
    theta: number;
    distanceFromParent: number;
    orbitalPeriod: number;
    planetElement: sfuiElement;
    tileDimensions: vec2;
    tileAtlasSrc: string;
    protected initialized: boolean;
    private targetPos;
    protected tiles: Array<Tile>;
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number);
    update(dt: number): void;
    receiveParentCenter(center: vec2): void;
    private initLocation;
    mouseMove(mousePos: vec2): string;
    containsPoint(point: vec2): boolean;
    orbitTick(): void;
    initTileMap(x: number, y: number): void;
    private createTile;
    getTileMap(): Array<Tile>;
    getTileFromCoord(x: number, y: number): Tile;
    render(): void;
}
