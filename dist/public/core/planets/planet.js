import vec2 from '../math/vec2.js';
import sfuiElement from '../ui/sfuielement.js';
export default class Planet {
    constructor(name, parentName, theta, distanceFromParent) {
        this.initialized = false;
        this.name = name;
        this.parentName = parentName;
        this.theta = theta;
        this.distanceFromParent = distanceFromParent;
        this.planetElement = new sfuiElement(new vec2(0, 0), this.name);
        this.parentCenter = new vec2(0, 0);
    }
    update(dt) {
        //(4/6/22) bootleg init function at the beginning of update
        if (!this.initialized && this.planetElement.getImageSize().x > 0) {
            this.initLocation();
        }
        this.planetElement.update(dt);
    }
    render() {
        this.planetElement.ctx.beginPath();
        this.planetElement.ctx.arc(this.parentCenter.x, this.parentCenter.y, this.distanceFromParent, 0, 2 * Math.PI);
        this.planetElement.ctx.stroke();
        this.planetElement.render();
    }
    receiveParentCenter(center) {
        this.parentCenter = center;
    }
    initLocation() {
        if (this.planetElement.getImageSize().x > 0) {
            const oldOrigin = new vec2(this.planetElement.getOrigin().x, this.planetElement.getOrigin().y);
            this.planetElement.setOrigin(new vec2(oldOrigin.x - (this.planetElement.getImageSize().x / 2), oldOrigin.y - (this.planetElement.getImageSize().y / 2)));
            this.initialized = true;
        }
    }
    mouseMove(mousePos) {
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
}
