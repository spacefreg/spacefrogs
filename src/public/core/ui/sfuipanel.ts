import vec2 from '../math/vec2.js';
import sfuiElement from './sfuielement.js';

export default class sfuiPanel extends sfuiElement {
    private isMouseHovering: boolean = false;
    private elements: Array<sfuiElement>;

    public constructor(origin: vec2, title: string) {
        super(origin, title);
        this.elements = new Array<sfuiElement>();
        this.setSize(new vec2(210, 500));
        //this.setBackgroundColor('#74a653');
    }

    public adduiElement(origin: vec2, title: string): void {
        const element: sfuiElement = new sfuiElement(origin, title);
        this.elements.push(element);
    }

    public update(dt: number): void {
        super.update(dt);
    }

    public render(): void {
        super.render();
        for (let i: number = 0; i < this.elements.length; i++) {
            this.elements[i].render();
        }
    }
}