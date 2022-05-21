import vec2 from '../utils/vec2.js';
import sfuiElement from '../ui/sfuielement.js';

export default class Planet {
    public name: string;
    public parentName: string;
    public parentCenter: vec2;
    public theta: number;
    public distanceFromParent: number;
    public orbitalPeriod: number;

    public planetElement: sfuiElement;

    protected initialized: boolean = false;

    
    constructor(name: string, parentName: string, theta: number, distanceFromParent: number, orbitalPeriod: number) {
        this.name = name;
        this.parentName = parentName;
        this.theta = theta;
        this.distanceFromParent = distanceFromParent;
        this.planetElement = new sfuiElement(new vec2(0, 0), this.name);
        this.parentCenter = new vec2(0, 0);
        this.orbitalPeriod = orbitalPeriod;
    }

    public update(dt: number) {
        //(4/6/22) bootleg init function at the beginning of update
        if (!this.initialized && this.planetElement.getImageSize().x > 0) {
            this.initLocation();
        }

        this.planetElement.update(dt);
    }


    public receiveParentCenter(center: vec2) {
        this.parentCenter = center;
    }

    private initLocation() {
        if (this.planetElement.getImageSize().x > 0) {
            const oldOrigin: vec2 = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
            this.planetElement.setOrigin(new vec2(oldOrigin.x - (this.planetElement.getImageSize().x / 2), oldOrigin.y - (this.planetElement.getImageSize().y / 2)));
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
        const pos: vec2 = new vec2(this.parentCenter.x + this.distanceFromParent * Math.cos((this.theta * (Math.PI/180))), this.parentCenter.y + this.distanceFromParent * Math.sin((this.theta * (Math.PI/180))));
        pos.x -= this.planetElement.getImageSize().x / 2;
        pos.y -= this.planetElement.getImageSize().y / 2;
        this.planetElement.setOrigin(pos);
    }

    public render() {
        this.planetElement.ctx.beginPath();
        this.planetElement.ctx.arc(this.parentCenter.x, this.parentCenter.y, this.distanceFromParent, 0, 2 * Math.PI);
        this.planetElement.ctx.stroke();

        this.planetElement.render();
    }
}