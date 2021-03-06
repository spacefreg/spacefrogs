import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';
import Sun from '../planets/sun.js';
export default class GameWindow extends sfuiElement {
    constructor(origin, size) {
        super(origin, 'Game Window');
        this.setSize(size);
        this.setOutline(true);
        this.backgroundColor = '';
        let systemOrigin = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        this.sun = new Sun(systemOrigin);
    }
    update(dt) {
        this.sun.update(dt);
    }
    render() {
        super.render();
        this.ctx.strokeStyle = '#5f4c73';
        this.ctx.strokeRect(this.origin.x, this.origin.y, 800, 600);
        this.sun.render();
    }
    getCenter() {
        const center = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        return center;
    }
}
