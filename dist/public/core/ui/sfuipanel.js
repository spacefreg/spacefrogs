import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';
export default class sfuiPanel extends sfuiElement {
    constructor(origin, title) {
        super(origin, title);
        this.elements = new Array();
        this.setSize(new vec2(210, 500));
        //this.setBackgroundColor('#74a653');
    }
    adduiElement(origin, title) {
        const element = new sfuiElement(origin, title);
        this.elements.push(element);
    }
    mouseMove(mousePos) {
        super.mouseMove(mousePos);
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].mouseMove(mousePos);
        }
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].render();
        }
    }
}
