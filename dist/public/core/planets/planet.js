import vec2 from '../math/vec2.js';
import sfuiElement from '../ui/sfuielement.js';
export default class Planet {
    constructor(name, parent, theta, distanceFromParent) {
        this.name = name;
        this.parent = parent;
        this.theta = theta;
        this.distanceFromParent = distanceFromParent;
        this.planetElement = new sfuiElement(new vec2(0, 0), this.name);
    }
    render() {
        this.planetElement.render();
    }
}
