import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';

import Sun from '../planets/sun.js';
import Earth from '../planets/earth.js';

export default class GameWindow extends sfuiElement {

    private sun: Sun;
    private earth: Earth;

    constructor(origin: vec2, size: vec2) {
        super(origin, 'Game Window');
        this.setSize(size);
        this.setOutline(true);
        this.backgroundColor = '';

        let systemOrigin: vec2 = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        this.sun = new Sun(systemOrigin);
        this.earth = new Earth('Earth', 'Sun', 0, 230);
    }

    public update(dt: number): void {
        this.sun.update(dt);
        let systemOrigin: vec2 = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);

        this.earth.receiveParentCenter(systemOrigin);
        this.earth.update(dt);
    }

    public render(): void {
        super.render();

        this.ctx.strokeStyle = '#5f4c73';
        this.ctx.strokeRect(this.origin.x, this.origin.y, 800, 600);

        this.sun.render();
        this.earth.render();
    }

    public getCenter(): vec2 {
        const center: vec2 = new vec2(this.origin.x + this.size.x / 2, this.origin.y + this.size.y / 2);
        return center;
    }
}