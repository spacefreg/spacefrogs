import vec2 from '../math/vec2.js';
import sfuiElement from '../ui/sfuielement.js';

export default class Planet {
    public name: string;
    public parent: string;
    public theta: number;
    public distanceFromParent: number;


    public planetElement: sfuiElement;

    
    constructor(name: string, parent: string, theta: number, distanceFromParent: number) {
        this.name = name;
        this.parent = parent;
        this.theta = theta;
        this.distanceFromParent = distanceFromParent;
        this.planetElement = new sfuiElement(new vec2(0, 0), this.name);
    }

    public render() {
        this.planetElement.render();
    }
}