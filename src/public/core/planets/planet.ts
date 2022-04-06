import vec2 from '../math/vec2.js';
import sfuiElement from '../ui/sfuielement.js';

export default class Planet {
    public name: string;
    public parent: string;
    public theta: number;
    public distanceFromParent: number;

    public planetElement: sfuiElement;

    protected initialized: boolean = false;

    
    constructor(name: string, parent: string, theta: number, distanceFromParent: number) {
        this.name = name;
        this.parent = parent;
        this.theta = theta;
        this.distanceFromParent = distanceFromParent;
        this.planetElement = new sfuiElement(new vec2(0, 0), this.name);
    }

    public update(dt: number) {
        if (!this.initialized && this.planetElement.getImageSize().x > 0) {
            this.initLocation();
        }

        this.planetElement.update(dt);
    }

    public render() {
        this.planetElement.render();
    }

    private initLocation() {
        if (this.planetElement.getImageSize().x > 0) {
            const oldOrigin: vec2 = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
            this.planetElement.setOrigin(new vec2(oldOrigin.x - (this.planetElement.getImageSize().x / 2), oldOrigin.y - (this.planetElement.getImageSize().y / 2)));
            this.initialized = true;
        }
    }
}