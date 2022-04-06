import vec2 from '../math/vec2.js';
import sfuiElement from '../ui/sfuielement.js';
export default class Planet {
    constructor(name, parent, theta, distanceFromParent) {
        this.initialized = false;
        this.name = name;
        this.parent = parent;
        this.theta = theta;
        this.distanceFromParent = distanceFromParent;
        this.planetElement = new sfuiElement(new vec2(0, 0), this.name);
    }
    update(dt) {
        if (!this.initialized && this.planetElement.getImageSize().x > 0) {
            this.initLocation();
        }
        this.planetElement.update(dt);
    }
    render() {
        this.planetElement.render();
    }
    initLocation() {
        if (this.planetElement.getImageSize().x > 0) {
            const oldOrigin = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
            this.planetElement.setOrigin(new vec2(oldOrigin.x - (this.planetElement.getImageSize().x / 2), oldOrigin.y - (this.planetElement.getImageSize().y / 2)));
            this.initialized = true;
        }
    }
}
