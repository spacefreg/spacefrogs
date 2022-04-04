import vec2 from '../../core/math/vec2.js';
import sfuiElement from './sfuielement.js';

export default class SystemWindow extends sfuiElement {

    constructor(origin: vec2, size: vec2) {
        super(origin, 'System Window');
        this.setSize(size);
        this.setOutline(true);
    }

    public render(): void {
        this.ctx.fillText(this.title, this.origin.x, this.origin.y);

        this.ctx.strokeStyle = '#5f4c73';
        this.ctx.strokeRect(this.origin.x, this.origin.y, 800, 600);


    }
}