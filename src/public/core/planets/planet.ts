import vec2 from '../utils/vec2.js';
import sfuiElement from '../ui/sfuielement.js';
import { lerp } from '../utils/lerp.js';


import Tile from '../tiles/tile.js';

export default class Planet {
    public name: string;
    public parentName: string;
    public parentCenter: vec2;
    public theta: number;
    public distanceFromParent: number;
    public orbitalPeriod: number;

    public planetElement: sfuiElement;

    public tileDimensions: vec2;
    public tileAtlasSrc: string;

    protected initialized: boolean = false;

    private targetPos: vec2;

    protected tiles: Array<Tile>;

    
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number) {
        this.name = name;
        this.parentName = parentName;
        this.theta = theta;
        this.distanceFromParent = distanceFromParent;
        this.planetElement = new sfuiElement(new vec2(0, 0), this.name);
        this.parentCenter = new vec2(0, 0);
        this.orbitalPeriod = orbitalPeriod;

        this.targetPos = new vec2(0, 0);

        this.tiles = new Array<Tile>();
        this.tileDimensions = new vec2(0, 0);

        switch (this.name) {
            case 'Mercury':
                this.tileAtlasSrc = '../../res/images/planets/tiles/mercury.png';
                break;
            case 'Venus':
                this.tileAtlasSrc = '../../res/images/planets/tiles/venus.png';
                break;
            case 'Earth':
                this.tileAtlasSrc = '../../res/images/planets/tiles/earth.png';
                break;
            case 'Moon':
                this.tileAtlasSrc = '../../res/images/planets/tiles/moon.png';
                break;
            case 'Mars':
                this.tileAtlasSrc = '../../res/images/planets/tiles/mars.png';
                break;
            default:
                this.tileAtlasSrc = '';
                break;
        }
    }

    public update(dt: number) {
        //(4/6/22) bootleg init function at the beginning of update
        if (!this.initialized && this.planetElement.getImageSize().x > 0) {
            this.initLocation();
        }

        this.planetElement.update(dt);

        if (this.targetPos.x != 0 && this.targetPos.y != 0) {
            this.planetElement.setOrigin(new vec2(lerp(this.planetElement.getOrigin().x, this.targetPos.x, (dt) / 50), lerp(this.planetElement.getOrigin().y, this.targetPos.y, (dt) / 50)));
        }
    }


    public receiveParentCenter(center: vec2) {
        this.parentCenter = center;
    }

    private initLocation() {
        if (this.planetElement.getImageSize().x > 0) {

            if (this.name != 'Sun') {
                let pos: vec2 = new vec2(0, 0);


                pos = new vec2(this.parentCenter.x + this.distanceFromParent * Math.cos((this.theta * (Math.PI/180))), this.parentCenter.y + this.distanceFromParent * Math.sin((this.theta * (Math.PI/180))));
                
                pos.x -= this.planetElement.getImageSize().x / 2;
                pos.y -= this.planetElement.getImageSize().y / 2;
                this.planetElement.setOrigin(pos);
            }
            else {
                this.planetElement.setOrigin(new vec2(this.planetElement.getOrigin().x -this.planetElement.getImageSize().x / 2, this.planetElement.getOrigin().y - this.planetElement.getImageSize().y / 2));
            }
            this.initialized = true;
        }
    }

    public mouseMove(mousePos: vec2): string {
        if (mousePos.x >= this.planetElement.getOrigin().x && mousePos.x <= this.planetElement.getOrigin().x + this.planetElement.getImageSize().x &&
            mousePos.y >= this.planetElement.getOrigin().y && mousePos.y <= this.planetElement.getOrigin().y + this.planetElement.getImageSize().y) {
            this.planetElement.setHovering(true);
            return this.name;
        }
        else {
            this.planetElement.setHovering(false);
            return '';
        }
    }

    public containsPoint(point: vec2): boolean {
        if (point.x >= this.planetElement.getOrigin().x && point.x <= this.planetElement.getOrigin().x + this.planetElement.getImageSize().x &&
            point.y >= this.planetElement.getOrigin().y && point.y <= this.planetElement.getOrigin().y + this.planetElement.getImageSize().y) {
                this.planetElement.setHovering(true);
                return true;
            }
            else { 
                return false;
            }
    }

    public orbitTick(): void {
        this.theta += 360 / this.orbitalPeriod;

        this.targetPos = new vec2(this.parentCenter.x + this.distanceFromParent * Math.cos((this.theta * (Math.PI/180))), this.parentCenter.y + this.distanceFromParent * Math.sin((this.theta * (Math.PI/180))));
        this.targetPos.x -= this.planetElement.getImageSize().x / 2;
        this.targetPos.y -= this.planetElement.getImageSize().y / 2;
    }

    public initTileMap(x: number, y: number): void {
        this.tileDimensions.x = x;
        this.tileDimensions.y = y;

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                this.createTile(i, j);
            }
            if (this.tiles.length > 0) {
                //this.tiles[0].setTileType(2);
            }
        }

        console.log(`${this.name} tile map: ${x}, ${y}: ${this.tiles.length} tiles`);
    }

    private createTile(x: number, y: number): void {
        this.tiles.push(new Tile(x, y, this.name));
    }

    public getTileMap(): Array<Tile> {
        return this.tiles;
    }

    public getTileFromCoord(x: number, y: number): Tile {
        return this.tiles[(this.tileDimensions.x * x) + y];
    }

    public render() {
        this.planetElement.ctx.beginPath();
        this.planetElement.ctx.arc(this.parentCenter.x, this.parentCenter.y, this.distanceFromParent, 0, 2 * Math.PI);
        this.planetElement.ctx.stroke();

        this.planetElement.render();
    }
}