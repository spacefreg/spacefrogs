import vec2 from '../../math/vec2.js';
import sfuiPanel from '../sfuipanel.js';

export default class RightPanel extends sfuiPanel {
    constructor(origin: vec2, title: string) {
        super(origin, title);
        this.setSize(new vec2(315, 748));
        this.setBackgroundColor('#74a653');
        this.setOutline(true);
        this.setBackgroundOpacity(0.13);
    }

    public update(dt: number): void {
        super.update(dt);
    }
    
    public render(): void {
        super.render();
    }
}