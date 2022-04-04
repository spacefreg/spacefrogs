import sfuiElement from './sfuielement.js';
export default class SystemWindow extends sfuiElement {
    constructor(origin, size) {
        super(origin, 'System Window');
        this.setSize(size);
        this.setOutline(true);
    }
    render() {
        this.ctx.fillText(this.title, this.origin.x, this.origin.y);
        this.ctx.strokeStyle = '#5f4c73';
        this.ctx.strokeRect(this.origin.x, this.origin.y, 800, 600);
    }
}
